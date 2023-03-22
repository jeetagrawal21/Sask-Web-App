import express from 'express';
import { Request, Response } from 'express';



const router = express.Router();




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
    console.log('PRINTED HERE');
    console.log(partIDnum);
  });

  module.exports = router;