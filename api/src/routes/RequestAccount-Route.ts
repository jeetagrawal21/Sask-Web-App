import express from 'express';
import { Request, Response } from 'express';
import { Logger } from "tslog";
import { appendFileSync } from "fs";


const router = express.Router();


//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});





/**
 * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
 * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
 */
router
  .route("")
  .post((req: Request, res: Response) => {
    const particpantId = req.body;
    const partIDnum = 753951
    //req.session.partIDnum = Number(particpantId['participantId']);
    logger.info("Participant ID Number Passed: " + partIDnum)
  });

  module.exports = router;