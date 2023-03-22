import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { Client, Pool } from 'pg';
//import runSqlFile from 'src/datasetup'
import path from 'path';

import helmet from 'helmet';
import express, { Request, Response, NextFunction, Router} from 'express';

import 'express-async-errors';

import logger from 'jet-logger';
// import EnvVars from '@src/declarations/major/EnvVars';
// import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import { NodeEnvs } from '@src/declarations/enums';
import { RouteError } from '@src/declarations/Classes';
import { createConnection } from 'net';
import userService from './services/User-Services';


import { credentials} from './declarations/Database_Credentials';
import {accountcreationuser, accountcreationadmin, changepass, checkifuser, checkifadmin, getuser, checkpass, deleteUser} from './services/User-Services'
import {getdata, formatDataForLineChart} from './services/Data-Services'
import {setupdatadb, initiatedb} from './services/Internal-Services'
import requestAccountRouter from './routes/RequestAccount-Route';
import dataRouter from './routes/Data-Route';
import loginRouter from './routes/Login-Route';
import postregistrationinfoRouter from './routes/Postregistrationinfo-Route';





// const fs = require('fs');

// **** Init express **** //

export const app = express();
const cors = require('cors');

// **** Set basic express settings **** //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser(EnvVars.cookieProps.secret));

// Show routes called in console during development
// if (EnvVars.nodeEnv === NodeEnvs.Dev) {
//   app.use(morgan('dev'));
// }

// // Security
// if (EnvVars.nodeEnv === NodeEnvs.Production) {
//   app.use(helmet());
// }

const router = Router();



initiatedb(); //initiates the db
setupdatadb(); // initeates the data db with the data




app.use('/requestAccount', requestAccountRouter);
app.use('/data', dataRouter);
app.use('/login', loginRouter);
app.use('/postregistrationinfo', postregistrationinfoRouter);





// test get function
app.get('/TestPage', function (req, res) {
  res.send('This is a test');
});

// /**
//  * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
//  * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
//  */
// var partIDnum: number;
// app.post('/requestAccount', (req, res) => {
//   const particpantId = req.body;
//   partIDnum = Number(particpantId['participantId']);
//   console.log('PRINTED HERE');
//   console.log(partIDnum);
// });



// post request to post registration data to database
// app.post('/postregistrationinfo', (req, res) => {
//   const data = req.body;
//   //console.log(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
//   accountcreationuser(
//     partIDnum,
//     data['surname'],
//     data['givenName1'],
//     data['givenName2'],
//     data['password'],
//     data['email'],
//     data['question1'],
//     data['answer1'],
//     data['question2'],
//     data['answer2'],
//     data['question3'],
//     data['answer3']
//   );
//   console.log(data);

//   // call function to post data to the database

//   res.send(true); // needs failure handling
// });




// // post request to post registration data to database
// app.post('/data', (req, res) => {
//   //const data = req.body;
//   //getdata(42176)
//   //console.log(data);

//   // call function to post data to the database

//   async function dataGetFormat () {
//     const data = await getdata(42176)
//     console.log("data :", data); //print the result of the query 
//     res.send(data);   // needs failure handling

//   }
//   dataGetFormat();

// });




// /**
//  * Gets login data from the user
//  * req: login data as a string array containing email and password
//  * res: success or error message
//  */
// app.post('/login', (req, res) => {
//   const data = JSON.stringify(req.body);
//   async function checking () {  
//     var result:boolean = await checkpass(req.body.email, req.body.password);    //async function is required to make it wait for reply (await used below to specific what we wait for)
//     if (result){     //calls check password to see if pass and email match a database entry
//       console.log("login success!");
//       const isadminresult = await checkifadmin(req.body.email)
//       const userdata = {
//         exist: result,
//         isadmin: isadminresult
//       }
//       res.send(userdata);
//     } else {
//       const userdata = {
//         exist: false,
//         isadmin: false,
//       };
//       console.log('login failed');
//       res.send(userdata);
//     }
//   }
//   checking(); //Calling above function with data from page

//   // send data as JSON object to the function that aunthenticates login
//   // send response if login was successful or not( we might not actually need the get request below)
// });


// Define the log interface
interface Log {
  message: string;
  level: string;
  logger?: string;
  timestamp: Date;
  stacktrace?: string;
}

// Define a route for accepting log reports
// Define the post route handler
app.post('/logs', async (req, res) => {
  // Create a client object with your credentials
  const client = new Client(credentials);
  try {
    // Get the log objects from the request body
    const logs: Log[] = req.body.logs;

    // Validate each log object
    for (const log of logs) {
      if (!log.message || !log.level || !log.timestamp) {
        return res.status(400).send('Invalid log object');
      }
    }

    // Connect to the database
    await client.connect();

    // Insert the log objects into the database table
    const values = logs.map((log) => [
      log.message,
      log.level,
      log.logger,
      new Date(log.timestamp).toISOString(),
      log.stacktrace,
    ]);
    for (const value of values) {
      await client.query(
        'INSERT INTO logs (message, level, logger, timestamp, stacktrace) VALUES ($1, $2, $3, $4, $5)',
        value
      );
    }

    // Send a success response
    return res.status(200).send('Logs added successfully');
  } catch (error) {
    // Handle any database or server errors
    console.error(error);
    return res.status(500).send('Something went wrong');
  } finally {
    // Close the database connection
    await client.end();
  }
});

initiatelogdb();

/**
 * This is an async function that checks if the "logs" table exists in the database.
 * If the table does not exist, it creates the table.
 * @returns {Promise<void>} Nothing is returned from this function.
 */
// This is an async function named "test".
async function initiatelogdb() {
  const pool = new Pool(credentials);
  const tablename = 'logs';

  try {
    console.log('here');
    // Execute a SQL query to create a table named "users" if it doesn't already exist.
    await pool.query(
      'CREATE TABLE IF NOT EXISTS logs ( \
                        id serial PRIMARY KEY, \
                        message text, \
                        level varchar(10), \
                        logger varchar(255), \
                        timestamp timestamp, \
                        stacktrace text \
                      );'
    );

    console.log('Table was created successfully.');
    // Call the "accountcreationuser" function with some parameters.
  } catch (error) {
    // If an error occurs, log it to the console.
    console.error(error);
  } finally {
    pool.end();
  }
}

// **** Export default **** //

export default app;
