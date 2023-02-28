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

//**** Database Query Functions ***//
const credentials= {
  user: "postgres",
  host: "postgres",
  database: "postgres",
  password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
  port: 5432,
};

//createtable();

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT * FROM users");
  console.log(now.rows);
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

//function to create database and table 
async function createtable(){
  const pool = new Pool(credentials);
  pool.query("CREATE TABLE users(id serial NOT NULL, username character varying(80) NOT NULL, pass character(40) NOT NULL, email character varying(100) NOT NULL, privilege integer NOT NULL DEFAULT 0, securityQuestion1 character(40) NOT NULL, securityAnswer1 character(40) NOT NULL, securityQuestion2 character(40) NOT NULL, securityAnswer2 character(40) NOT NULL, securityQuestion3 character(40) NOT NULL, securityAnswer3 character(40) NOT NULL, CONSTRAINT utilisateur_pkey PRIMARY KEY (id))", (err, res) => {
    //console.log(err, res);
    pool.end();
});
}

//Checks if user exists (using email) return true if 1 user is found and felse otherwise
async function checkifuser(email:string){
  const pool = new Pool(credentials);
  const now = await pool.query(                    //query looks for all users with email
    `SELECT * FROM users WHERE email = $1`, 
        [email]);
  pool.end();
  if(now.rows.length == 1){          //if more then 1 user is returned from query, returns false for user not found (there should only be 1 user with the info)
    return (true);
  }else{
    return false;
  }
}

//Gets user and return user info. Returmns user info if 1 user is found, false otherwise
async function getuser (email:string, pass:string){
  const pool = new Pool(credentials);
  const now = await pool.query(               //query looks for all users with email
    `SELECT * FROM users WHERE email = $1`, 
        [email]);
  await pool.end();
  if(now.rows.length == 1){         //if more then 1 user is returned from query, returns false for user not found (there should only be 1 user with the info)
    return now;                    //user data returned 
  }else{
    return false;
  }
} 

//Checks password for the associated email. Returns true for correct combo, false otherswise
async function checkpass(email:string, pass:string){
  const pool = new Pool(credentials);
  const now = await pool.query(                   //query looks for all users with email
    `SELECT * FROM users WHERE email = $1`, 
        [email]);
  pool.end();
  if(now.rows.length == 1){     //if more then 1 user is returned from query, returns false for user not found (there should only be 1 user with the info)
    console.log(now);
    return (true);
  }else{
    return false;
  }
}

//Creates account for admins (admins have a privilege of 1 as opposed to 0)
async function accountcreationadmin(username:string, pass:string, email:string, securityQuestion1:string, securityAnswer1:string, securityQuestion2:string, securityAnswer2:string, securityQuestion3:string, securityAnswer3:string){
  const pool = new Pool(credentials);
  if (await checkifuser(email)){                     //calls check if user exist (using email) if returns true he exist account not created else account created
    console.log('account not created');
  }else{
    const now = await pool.query(               //account created
      `INSERT INTO users (username, pass, email, privilege, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3  )  
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [username, pass, email, 1, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3]);
  }
  await pool.end();
}

//Creates account for users (users dont need a privilige variable because it is 0 by default)
async function accountcreationuser(ID:number, username:string, pass:string, email:string, securityQuestion1:string, securityAnswer1:string, securityQuestion2:string, securityAnswer2:string, securityQuestion3:string, securityAnswer3:string){
  const pool = new Pool(credentials);
  if (await checkifuser(email)){              //calls check if user exist (using email) if returns true he exist account not created else account created
    console.log("account not created");
  }else{
    const now = await pool.query(            //account created         
      `INSERT INTO users (id, username, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3  )  
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 $10)`, [ID, username, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3]);
    console.log("Account not created");
  }
  await pool.end();
} 


//changes password, returns true if succesful 
async function changepass(email:string, pass:string){
  const pool = new Pool(credentials);
  if (await checkifuser(email)){             //calls check if user exist (using email) if returns true he exist account not created else account created
    const now = await pool.query(           //
      `INSERT INTO users (pass)  
       VALUES ($1)`, [pass]);
  }else{
    console.log("user not found");
  }
  await pool.end();
}


// //Sending query to the server
// poolDemo();

//accountcreationuser('testuser8', 'testpass8', 'testuser2@email.com', "hello who?", "World!", "Whats my name", "Testuser8", "Whats my purpose", "Testing");
//account('testuser8', 'testpass8', 'testuser2@email.com', "hello who?", "World!", "Whats my name", "Testuser8", "Whats my purpose", "Testing");

//console.log(checkifuser('testuser2@email.com'));


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

/**
 * for now this would not really do any work on the backend other than store participant id with the rest of particiapnt info on the registration page
 * in the future we plan for it to send this participnat id to the admin who then verifies and send a unique link to the participant for registration
 */
 var partIDnum:number;
 app.post('/requestAccount', (req, res) => {
   const particpantId = req.body;
   partIDnum = 12345; //Number(particpantId['participantId']);
   console.log(partIDnum);
 });


// post request to post registration data to database
app.post('/postregistrationinfo', (req, res) => {
  const data = req.body;
  //console.log(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
  //accountcreationuser(partIDnum, data['surname'] + data['givenName1'], data['password'], data['email'], data['question1'], data['answer1'], data['question2'], data['answer2'], data['question3'], data['answer3'])
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
  const data = JSON.stringify(req.body);
  console.log(data);

  // send data as JSON object to the function that aunthenticates login
  // send response if login was successful or not( we might not actually need the get request below)
});

app.get('/login', (req, res) => {
  // this function communicates with the login authentication function to check if login info is correct and return a response if it is found in the DB
  // res.send(req);
});


// **** Export default **** //

export default app;
