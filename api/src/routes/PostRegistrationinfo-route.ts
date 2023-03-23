import express from 'express';
import { accountCreationUser } from '@src/services/User-Services';
import { Logger } from "tslog";
import { appendFileSync } from "fs";
//import {partIDnum} from '@src/routes/requestAccount'
const router = express.Router();
const app = express();


//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});







router
  .route("")
  .post((req, res) => {
      const data = req.body;
      const partIDnum =  753952;
      //console.log(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
      accountCreationUser(
        partIDnum,
        data['surname'],
        data['givenName1'],
        data['givenName2'],
        data['password'],
        data['email'],
        data['question1'],
        data['answer1'],
        data['question2'],
        data['answer2'],
        data['question3'],
        data['answer3']
      );
      logger.info("Account creation request data: \n" + data)
    
      // call function to post data to the database
    
      res.send(true); // needs failure handling
    });

module.exports = router;