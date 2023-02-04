import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import path from 'path';
import { Client } from "pg";
import dotenv from "dotenv";

import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import BaseRouter from './routes/api';
import logger from 'jet-logger';
import EnvVars from '@src/declarations/major/EnvVars';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import { NodeEnvs } from '@src/declarations/enums';
import { RouteError } from '@src/declarations/classes';
import { createConnection } from 'net';


// **** Init express **** //

const app = express();


// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.cookieProps.secret));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}


// **** Add API routes **** //

// Add APIs
app.use('/api', BaseRouter);

// Setup error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.err(err, true);
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// **** Serve front-end content **** //

// // not need(we using react for front-end. this need to be removed)
// // Set views directory (html)
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// // Set static directory (js and css).
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

// Nav to login pg by default
app.get('/', (_: Request, res: Response) => {
  res.send("Hello world");
});

// // Redirect to login if not logged in.
// app.get('/users', (req: Request, res: Response) => {
//   const jwt = req.signedCookies[EnvVars.cookieProps.key];
//   if (!jwt) {
//     res.redirect('/');
//   } else {
//     res.send("having a user");
//   }
// });


// connect db

AppDataSource.initialize().then(async () => {

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.email = "Timber@usask.ca";
  user.name = "Saw";
  await AppDataSource.manager.save(user);
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await AppDataSource.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error));

// **** Export default **** //

export default app;
