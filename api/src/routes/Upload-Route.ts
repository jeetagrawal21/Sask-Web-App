/*
 * Importing necessary modules
 */
import { logger } from '@src/Server';
import express from 'express';
import multer from 'multer';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import service from '@src/services/Upload-Service';
import moment from 'moment-timezone';

/*
 * Initializing the router
 */
const router = express.Router();

/*
 * Setting up the storage directory for file upload
 */
const upload = multer({ dest: '/uploads' });

/*
 * Defining the POST request route to handle file upload and processing
 */
router.post('/', upload.single('file'), (req, res) => {

  /*
   * Checking if file has been uploaded or not
   * If not, returning a 400 error response
   */
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  /*
   * Creating a read stream from the uploaded file
   */
  const fileStream = fs.createReadStream(req.file.path);

  /*
   * Piping the read stream to the CSV parser
   * and handling data, end and error events
   */
  fileStream
    .pipe(csvParser())
    .on('data', async (row) => {
      /*
       * Processing each row of the CSV file
       * and inserting it into the database
       */
      const newRow: Record<string, any> = {};
      for (const key in row) {
        if (key === 'Name') {
          newRow['id'] = row[key];
        } else if (key === 'Device ID') {
          newRow['Device'] = row[key];
        } else {
          newRow[key.trim()] = row[key];
        }
      }
      await service.insertRow(newRow);
    })
    .on('end', () => {
      /*
       * Sending response after successful completion of processing
       * and deleting the uploaded file from the storage directory
       */
      res.send('CSV file processed and data inserted into the database.');
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            logger.error(`Error deleting temporary file: ${err}`);
          }
        });
      }
    })
    .on('error', (error) => {
      /*
       * Handling error in case of any error while processing the CSV file
       */
      res.status(500).send(`Error processing CSV file: ${error}`);
      logger.error(`Error processing CSV file: ${error}`);
    });

  /*
   * Logging that the CSV processing has been completed
   */
  logger.info("Completed processing csv");
});

/*
 * Exporting the router for use in other modules
 */
export default router;
