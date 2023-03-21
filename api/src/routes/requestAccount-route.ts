import express from 'express';
import { Request, Response } from 'express';
import session from 'express-session';



const router = express.Router();



// Add express-session middleware
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));



/**
 * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
 * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
 */
router.get('/requestAccount', (req: Request, res: Response) => {
  const particpantId = req.body;
  const partIDnum = 753951
  //req.session.partIDnum = Number(particpantId['participantId']);
  console.log('PRINTED HERE');
  console.log(partIDnum);
});

export default router;
