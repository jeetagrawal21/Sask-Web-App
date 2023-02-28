//import express from 'express';
import { Client, Pool } from "pg";
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import EnvVars from '@src/declarations/major/EnvVars';
import logger from 'jet-logger';






const PORT = 3000;
const HOST = 'localhost';
const app = express();


// const credentials = {
//   user: "postgres",
//   host: "postgres",
//   database: "users",
//   password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
//   port: 5432,
// };

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.cookieProps.secret));

// Connect with a connection pool.

// async function poolDemo() {
//   const pool = new Pool(credentials);
//   const now = await pool.query("SELECT email FROM login");
//   console.log(now.rows);
//   await pool.end();

//   return now;
// }

// // Connect with a client.

// async function clientDemo() {
//   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT NOW()");
//   await client.end();

//   return now;
// }

// //Sending query to the server
// poolDemo();

// Test get function 
app.get('/', (_: Request, res: Response) => {
  res.send("Hellow World");
});
 
const msg = ('Express server started on port: ' + EnvVars.port.toString());
app.listen(EnvVars.port, () => logger.info(msg));
