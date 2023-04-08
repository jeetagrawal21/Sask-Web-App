import cookieParser from "cookie-parser";
import morgan from "morgan";
import { Client, Pool } from "pg";
//import runSqlFile from 'src/datasetup'
import path from "path";

import helmet from "helmet";
import express, { Request, Response, NextFunction, Router } from "express";

import "express-async-errors";

import { Logger } from "tslog";
import { appendFileSync } from "fs";

import { credentials } from "./declarations/Database_Credentials";

import {
  setupDataDB,
  initiateDB,
  createPendingTable,
} from "@src/services/Internal-Services";

// const fs = require('fs');

// **** Init express **** //

export const app = express();
const cors = require("cors");

// **** Set basic express settings **** //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser(EnvVars.cookieProps.secret));

export const logger = new Logger();

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});

const router = Router();

initiateDB(); //initiates the db
setupDataDB(); // initeates the data db with the data
createPendingTable(); //creates pending users table

//Setting up routes
const requestAccountRoute = require("@src/routes/requestAccount-route");
const dataRoute = require("@src/routes/data-route");
const loginRoute = require("@src/routes/login-route");
const postregistrationinfoRoute = require("@src/routes/postregistrationinfo-route");

app.use("/requestAccount", requestAccountRoute);
app.use("/data", dataRoute);
app.use("/login", loginRoute);
app.use("/postregistrationinfo", postregistrationinfoRoute);

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
app.post("/logs", async (req, res) => {
  // Create a client object with your credentials
  const client = new Client(credentials);
  try {
    // Get the log objects from the request body
    const logs: Log[] = req.body.logs;

    // Validate each log object
    for (const log of logs) {
      if (!log.message || !log.level || !log.timestamp) {
        return res.status(400).send("Invalid log object");
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
        "INSERT INTO logs (message, level, logger, timestamp, stacktrace) VALUES ($1, $2, $3, $4, $5)",
        value
      );
    }

    // Send a success response
    return res.status(200).send("Logs added successfully");
  } catch (error) {
    // Handle any database or server errors
    console.error(error);
    return res.status(500).send("Something went wrong");
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
  const tablename = "logs";

  try {
    // Execute a SQL query to create a table named "users" if it doesn't already exist.
    await pool.query(
      "CREATE TABLE IF NOT EXISTS logs ( \
                        id serial PRIMARY KEY, \
                        message text, \
                        level varchar(10), \
                        logger varchar(255), \
                        timestamp timestamp, \
                        stacktrace text \
                      );"
    );

    logger.info("initiatelogdb: Table was created successfully.");
    // Call the "accountcreationuser" function with some parameters.
  } catch (error) {
    // If an error occurs, log it to the console.
    logger.error("initiatelogdb: " + String(error));
  } finally {
    pool.end();
  }
}

// **** Export default **** //

export default app;
