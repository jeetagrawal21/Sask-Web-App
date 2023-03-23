
import express from 'express';
import {getData} from '@src/services/Data-Services'
import { Logger } from "tslog";
import { appendFileSync } from "fs";

const router = express.Router();



//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});



// post request to post registration data to database
router
  .route("")
  .post((req, res) => {
    //const data = req.body;
    //getdata(42176)
    //console.log(data);

    // call function to post data to the database

    async function dataGetFormat () {
      const data = await getData(42176)
      res.send(data);   // needs failure handling

    }
    dataGetFormat();

  });

  module.exports = router;