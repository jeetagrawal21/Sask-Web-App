import { ParticipantID } from './entity/ParticipantID';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import { Users } from './entity/Users';
import path from 'path';
import { Client, Pool } from 'pg';
import dotenv from 'dotenv';

import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import logger from 'jet-logger';
// import EnvVars from '@src/declarations/major/EnvVars';
// import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
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
// app.use(cookieParser(EnvVars.cookieProps.secret));

// Show routes called in console during development
// if (EnvVars.nodeEnv === NodeEnvs.Dev) {
//   app.use(morgan('dev'));
// }

// // Security
// if (EnvVars.nodeEnv === NodeEnvs.Production) {
//   app.use(helmet());
// }

//**** Database Query Functions ***//
export const credentials = {
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password:
    'ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3',
  port: 5432,
};

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query('SELECT * FROM users');
  console.log(now.rows);
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query('SELECT NOW()');
  await client.end();

  return now;
}

/**
 * Check if the table exists in the database
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating if the table exists or not
 */
async function checkiftable() {
  // create a new pool using the credentials for the database
  const pool = new Pool(credentials);

  const tablename = 'users';

  // use the pool to query the database for the existence of the table with the given name
  const { rows } = await pool.query(
    'SELECT EXISTS(SELECT FROM pg_catalog.pg_tables WHERE tablename  = $1)',
    [tablename]
  );

  // get the boolean value indicating if the table exists or not
  const exists = rows[0].exists;

  // close the connection pool
  pool.end();

  return Boolean(exists);
}

//function to creates table under current database
async function createtable() {
  const pool = new Pool(credentials);
  await pool.query(
    'CREATE TABLE users(id serial NOT NULL, surname character varying(80) NOT NULL, givenname2 character varying(80) NOT NULL, givenname3 character varying(80) NOT NULL, pass character varying(40) NOT NULL, email character varying(100) NOT NULL, privilege integer NOT NULL DEFAULT 0, securityQuestion1 character(40) NOT NULL, securityAnswer1 character(40) NOT NULL, securityQuestion2 character(40) NOT NULL, securityAnswer2 character(40) NOT NULL, securityQuestion3 character(40) NOT NULL, securityAnswer3 character(40) NOT NULL, CONSTRAINT utilisateur_pkey PRIMARY KEY (id))',
    (err, res) => {
      //console.log(err, res);
      pool.end();
    }
  );
}

//Checks if user exists (using email) return true if 1 user is found and felse otherwise
export async function checkifuser(email: string) {
  const pool = new Pool(credentials);
  const now = await pool.query(
    //query looks for all users with email and password
    `SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)`,
    [email]
  );
  pool.end();
  return Boolean(now['rows'][0]['exists']); // typecast the return value to bool. Came back in array sorta thing thus all the nonsense
}

/**
 * Check if the user with the given email is an admin
 * @param {string} email - The email of the user to check
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating if the user is an admin or not
 */
export async function checkifadmin(email: string) {
  // create a new pool using the credentials for the database
  const pool = new Pool(credentials);

  // use the pool to query the database for the existence of a user with the given email
  const result = await pool.query(
    `SELECT privilege FROM users WHERE email=$1`,
    [email]
  );

  // close the connection pool
  pool.end();

  // check if the query returned any rows
  if (result.rows.length > 0) {
    // if the user is an admin (privilege level of 1), return true
    if (result.rows[0].privilege === 1) {
      return true;
    }
  }

  // if the user is not an admin or does not exist, return false
  return false;
}

//Gets user and return user info.
export async function getuser(email: string, pass: string) {
  const pool = new Pool(credentials);
  const result = await pool.query(
    //query looks for all users with email
    `SELECT 1 FROM users WHERE email = $1`,
    [email]
  );
  await pool.end();
  return result;
}

//Checks password for the associated email. Returns true for correct combo, false otherswise
export async function checkpass(email: string, pass: string) {
  const pool = new Pool(credentials);
  const result = await pool.query(
    //query looks for all users with email and password
    `SELECT EXISTS(SELECT 1 FROM users WHERE email=$1 AND pass=$2)`,
    [email, pass]
  );
  pool.end();
  return Boolean(result['rows'][0]['exists']); // typecast the return value to bool. Came back in array sorta thing thus all the nonsense
}

//Creates account for admins (admins have a privilege of 1 as opposed to 0)
export async function accountcreationadmin(
  surname: string,
  givenname2: string,
  givenname3: string,
  pass: string,
  email: string,
  securityQuestion1: string,
  securityAnswer1: string,
  securityQuestion2: string,
  securityAnswer2: string,
  securityQuestion3: string,
  securityAnswer3: string
) {
  const pool = new Pool(credentials);
  if (await checkifuser(email)) {
    //calls check if user exist (using email) if returns true he exist account not created else account created
    console.log('account not created');
  } else {
    const result = await pool.query(
      //account created
      `INSERT INTO users (surname, givenname2, givenname3, pass, email, privilege, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3)  
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        surname,
        givenname2,
        givenname3,
        pass,
        email,
        1,
        securityQuestion1,
        securityAnswer1,
        securityQuestion2,
        securityAnswer2,
        securityQuestion3,
        securityAnswer3,
      ]
    );
    console.log('Account created');
  }
  await pool.end();
}

//Creates account for users (users dont need a privilige variable because it is 0 by default)
export async function accountcreationuser(
  ID: number,
  surname: string,
  givenname2: string,
  givenname3: string,
  pass: string,
  email: string,
  securityQuestion1: string,
  securityAnswer1: string,
  securityQuestion2: string,
  securityAnswer2: string,
  securityQuestion3: string,
  securityAnswer3: string
) {
  const pool = new Pool(credentials);
  if (await checkifuser(email)) {
    //calls check if user exist (using email) if returns true he exist account not created else account created
    console.log('account not created');
  } else {
    const result = await pool.query(
      //account created
      `INSERT INTO users (id, surname, givenname2, givenname3, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3)  
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        ID,
        surname,
        givenname2,
        givenname3,
        pass,
        email,
        securityQuestion1,
        securityAnswer1,
        securityQuestion2,
        securityAnswer2,
        securityQuestion3,
        securityAnswer3,
      ]
    );
    console.log('Account created');
  }
  await pool.end();
}

/**
 * Delete a user from the "users" table with the given email
 * @param {string} email - The email of the user to delete
 * @returns {Promise<void>} - A promise that resolves when the user is deleted or rejects when an error occurs
 */
export async function deleteUser(email: String) {
  const pool = new Pool(credentials);

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE email=$1 RETURNING *`, // Delete the user from the "users" table
      [email]
    );

    if (result.rowCount === 0) {
      // If the user was not found
      console.log('User not found');
    } else {
      console.log('User deleted');
    }
  } catch (error) {
    // If an error occurred
    console.error(error);
  }

  pool.end();
}

/**
 * Changes the password of the user with the specified email address
 * @param email - Email address of the user whose password is to be changed
 * @param newpass - New password to be set for the user
 * @returns true if password is changed successfully, false otherwise
 */
export async function changepass(
  email: string,
  newpass: string
): Promise<boolean> {
  const pool = new Pool(credentials);

  // Check if the user with the specified email address exists
  if (await checkifuser(email)) {
    try {
      // Update the user's password in the database
      await pool.query(`UPDATE users SET pass=$2 WHERE email=$1`, [
        email,
        newpass,
      ]);
      await pool.end();
      console.log('Password changed successfully!');
      return true;
    } catch (err) {
      // If there was an error updating the password, log the error and return false
      console.error('Error changing password: ', err);
      await pool.end();
      return false;
    }
  } else {
    // If the user with the specified email address doesn't exist, log an error and return false
    console.log('User not found.');
    await pool.end();
    return false;
  }
}

/**
 * This is an async function that checks if the "users" table exists in the database.
 * If the table does not exist, it creates the table and inserts a new user.
 * @returns {Promise<void>} Nothing is returned from this function.
 */
// This is an async function named "test".
async function initiatedb() {
  const pool = new Pool(credentials);
  const tablename = 'users';
  if (await checkiftable()) {
    if (await checkifuser('testuser1@email.com'))
      changepass('testuser1@email.com', 'testpasslonger1!');
    changepass('testadmin1@email.com', 'testpasslonger2!');
  }
  // Call "checkiftable" function and wait for it to complete, storing the result in "tablecheck" variable.
  const tablecheck = await checkiftable();
  if (!tablecheck) {
    try {
      // Execute a SQL query to create a table named "users" if it doesn't already exist.
      await pool.query(
        'CREATE TABLE IF NOT EXISTS users (id serial NOT NULL, surname character varying(80) NOT NULL, givenname2 character varying(80) NOT NULL, givenname3 character varying(80) NOT NULL, pass character varying(40) NOT NULL, email character varying(100) NOT NULL, privilege integer NOT NULL DEFAULT 0, securityQuestion1 character(40) NOT NULL, securityAnswer1 character(40) NOT NULL, securityQuestion2 character(40) NOT NULL, securityAnswer2 character(40) NOT NULL, securityQuestion3 character(40) NOT NULL, securityAnswer3 character(40) NOT NULL, CONSTRAINT utilisateur_pkey PRIMARY KEY (id));'
      );
      // Execute a SQL query to check if the "users" table exists, and store the result in "res".
      const res = await pool.query(
        `SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_name='${tablename}')`
      );
      // Log the value of the "exists" column in the first row of the "res" result.
      console.log(res.rows[0].exists);
      console.log('Table was created successfully.');
      // Call the "accountcreationuser" function with some parameters.
      await accountcreationuser(
        12345678,
        'testuser1',
        'testusergiven1-1',
        'testusergiven2-1',
        'testpasslonger1!',
        'testuser1@email.com',
        'hello who?',
        'World!',
        'Whats my name',
        'Testuser1',
        'Whats my purpose',
        'Testing'
      );
      await accountcreationadmin(
        'testadmin1',
        'testadmingiven1-1',
        'testadmingiven2-1',
        'testpasslonger2!',
        'testadmin1@email.com',
        'With great power comes what?',
        'Great responsability',
        'Who died?',
        'Uncle Ben',
        'Whats my purpose',
        'Freindly Neighbourhood admin'
      );
    } catch (error) {
      // If an error occurs, log it to the console.
      console.error(error);
    } finally {
      pool.end();
    }
  }
}

initiatedb(); //initiates the db

// async function runCheckifadmin() {
//   try {
//     const isAdmin = await checkifadmin('testuser1@email.com');
//     console.log('Is admin:', isAdmin);
//   } catch (error) {
//     console.error('Error checking if admin:', error);
//   }
// }

// runCheckifadmin();

// **** Add API routes **** //

// Add APIs
//app.use('/api', BaseRouter);

// Setup error handler
// app.use(
//   (
//     err: Error,
//     _: Request,
//     res: Response,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     next: NextFunction
//   ) => {
//     logger.err(err, true);
//     let status = HttpStatusCodes.BAD_REQUEST;
//     if (err instanceof RouteError) {
//       status = err.status;
//     }
//     return res.status(status).json({ error: err.message });
//   }
// );
// test get function
app.get('/TestPage', function (req, res) {
  res.send('This is a test');
});

/**
 * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
 * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
 */
var partIDnum: number;
app.post('/requestAccount', (req, res) => {
  const particpantId = req.body;
  partIDnum = Number(particpantId['participantId']);
  console.log('PRINTED HERE');
  console.log(partIDnum);
});

// post request to post registration data to database
app.post('/postregistrationinfo', (req, res) => {
  const data = req.body;
  //console.log(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
  accountcreationuser(
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
  console.log(data);

  // call function to post data to the database

  res.send(true); // needs failure handling
});

/**
 * Gets login data from the user (sign in page)
 * req: login data as a string array containing email and password
 * res: success or error message
 */
app.post('/login', (req, res) => {
  const data = JSON.stringify(req.body);
  async function checking() {
    var result: boolean = await checkpass(req.body.email, req.body.password); //calls check password to see if pass and email match a database entry
    if (result) {
      // if passed
      console.log('login success!');
      const isadminresult = await checkifadmin(req.body.email); //checks if the user is an admin
      const userdata = {
        //returns all the information as data pair
        exist: result,
        isadmin: isadminresult,
      };
      console.log('Is he admin?  ' + isadminresult);
      res.send(userdata);
    } else {
      const userdata = {
        exist: false,
        isadmin: false,
      };
      console.log('login failed');
      res.send(userdata);
    }
  }
  checking(); //Calling above function with data from page

  // send data as JSON object to the function that aunthenticates login
  // send response if login was successful or not( we might not actually need the get request below)
});

app.get('/login', (req, res) => {
  // this function communicates with the login authentication function to check if login info is correct and return a response if it is found in the DB
  // res.send(req);
});

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
