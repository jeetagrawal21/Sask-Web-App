import { Request, Response } from 'express';
import session from 'express-session';
import express from 'express';

interface SessionData {
  partIDnum: number;
}

declare module 'express-session' {
  interface SessionData {
    partIDnum: number;
  }
}

const router = express.Router();

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

router.get('/requestAccount', (req: Request, res: Response) => {
  const particpantId = req.body;
  req.session.partIDnum = Number(particpantId['participantId']);
  console.log('PRINTED HERE');
  console.log(req.session.partIDnum);
});

export default router;
