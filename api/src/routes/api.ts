import express, { Request, Response, NextFunction } from 'express';
import userService from '../services/user-services';

const router = express.Router();

router.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.getUserData(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
