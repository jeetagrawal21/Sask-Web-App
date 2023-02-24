import { ParticipantID } from './entity/ParticipantID';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import { Users } from './entity/Users';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

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
import userService from './services/user-service';
// const fs = require('fs');

// **** Init express **** //

const app = express();
const cors = require('cors');

// **** Set basic express settings **** //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.err(err, true);
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);
// test get function
app.get('/TestPage', function (req, res) {
  res.send('This is a test');
});

// post request to post registration data to database
app.post('/postregistrationinfo', (req, res) => {
  const data = req.body;
  console.log(data);

  // call function to post data to the database

  res.send('success');
});
/**
 * Gets login data from the user
 * req: login data as a string array containing email and password
 * res: success or error message
 */
app.post('/login', (req, res) => {
  const data = JSON.parse(req.body);

  // send data as JSON object to the function that aunthenticates login
  // send response if login was successful or not( we might not actually need the get request below)
});

app.get('/login', (req, res) => {
  // this function communicates with the login authentication function to check if login info is correct and return a response if it is found in the DB
  res.send(req);
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

AppDataSource.initialize()
  .then(async () => {
    // const participantId = new ParticipantID();
    // participantId.participantid = 1234;
    // const id = await AppDataSource.manager.find(ParticipantID);
    // if (id.length != 0) {
    //   console.log("already have an id");
    // } else {
    //   console.log("Inserting a new participant_id into the database...");
    //   await AppDataSource.manager.save(participantId);
    // }
    // console.log(" paticipantID is ", id);
    // const user = new Users();
    // user.email = "sean.maxwell@gmail.com";
    // user.participant_id = 1234;
    // user.pwdHash = "$2b$12$1mE2OI9hMS/rgH9Mi0s85OM2V5gzm7aF3gJIWH1y0S1MqVBueyjsy";
    // const users = await AppDataSource.manager.find(Users);
    // if (users.length != 0) {
    //   console.log("already has a user: ");
    // } else {
    //   console.log("Inserting a new user into the database...");
    //   await AppDataSource.manager.save(user);
    // }
    // console.log(" User is ", await AppDataSource.manager.find(Users));
    // const user = new User();
    // user.email = "Timber@usask.ca";
    // user.surname = '';
    // user.givename1 = '';
    // user.givename2 = '';
    // user.participant_id = 1234;
    // user.pwdHash = "1234";
    // await AppDataSource.manager.save(user);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);
  })
  .catch((error) => console.log(error));

// **** Export default **** //

export default app;
