
import express from 'express';
import {getData} from '@src/services/Data-Services'

const router = express.Router();


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
      console.log("data :", data); //print the result of the query 
      res.send(data);   // needs failure handling

    }
    dataGetFormat();

  });

  module.exports = router;