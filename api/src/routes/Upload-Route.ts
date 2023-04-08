import { logger } from '@src/Server';
import express from 'express';
import multer from 'multer';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import service from '@src/services/Upload-Service';
import moment from 'moment-timezone';

const router = express.Router();
const upload = multer({ dest: '/uploads' });

router.post('/', upload.single('file'), (req, res) => {
  logger.info("Before file check");
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  logger.info("After file null check");
  const fileStream = fs.createReadStream(req.file.path);
  logger.info("before filestream starts");
  fileStream
    .pipe(csvParser())
    .on('data', async (row) => {
      // Replace "Name" with "ID" and "Device ID" with "Device"
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
      logger.info("before insertRow(newRow);");
      await service.insertRow(newRow);
    })
    .on('end', () => {
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
      res.status(500).send(`Error processing CSV file: ${error}`);
    });
  logger.info("Completed processing csv");
});

export default router;