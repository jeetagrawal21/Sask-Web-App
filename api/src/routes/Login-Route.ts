import express from 'express';
import { checkPass, checkIfAdmin } from '@src/services/User-Services';
import { Logger } from "tslog";
import { appendFileSync } from "fs";

const router = express.Router();




//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});




/**
 * Gets login data from the user
 * req: login data as a string array containing email and password
 * res: success or error message
 */
router
  .route("")
  .post((req, res) => {
    const data = JSON.stringify(req.body);
    async function checking () {  
      var result:boolean = await checkPass(req.body.email, req.body.password);    //async function is required to make it wait for reply (await used below to specific what we wait for)
      if (result){     //calls check password to see if pass and email match a database entry
        logger.info(req.body.email + " login attempt was succesful")
        const isadminresult = await checkIfAdmin(req.body.email)
        const userdata = {
          exist: result,
          isadmin: isadminresult
        }
        res.send(userdata);
      } else {
        const userdata = {
          exist: false,
          isadmin: false,
        };
        logger.info(req.body.email + " login attempt was failed")
        res.send(userdata);
      }
    }
  checking(); //Calling above function with data from page

  // send data as JSON object to the function that aunthenticates login
  // send response if login was successful or not( we might not actually need the get request below)
});

module.exports = router;