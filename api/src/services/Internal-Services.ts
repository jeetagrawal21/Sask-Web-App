
import runSqlFile from '../util/DataSetup'
import { Client, Pool } from 'pg';
import { credentials} from '../declarations/Database_Credentials';
import {accountCreationUser, accountCreationAdmin, changePass, checkIfUser} from './User-Services'
import path from 'path';
import { Logger } from "tslog";
import { appendFileSync } from "fs";




//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});





/**
 * Checks if a table exists in the database
 * @param tablename - The name of the table to check
 * @returns A boolean indicating whether the table exists or not
 */
export async function checkIfTable(tablename:string) {
    const pool = new Pool(credentials);
    try {
      const { rows } = await pool.query("SELECT EXISTS(SELECT FROM pg_catalog.pg_tables WHERE tablename = $1)", [tablename]);
      const exists = rows[0].exists;
      return Boolean(exists);
    } catch (error) {
      logger.error("\ncheckIfTable errpr: \n" +String(error));
    } finally {
      pool.end();
    }
  }
  

/**
 * Creates a new "users" table in the database if it does not exist.
 * @returns {Promise<void>} A promise that resolves when the table has been created, or rejects if there was an error.
 */
  async function createTable() {
    const pool = new Pool(credentials);
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id serial NOT NULL,
          surname character varying(80) NOT NULL,
          givenname2 character varying(80) NOT NULL,
          givenname3 character varying(80) NOT NULL,
          pass character varying(40) NOT NULL,
          email character varying(100) NOT NULL,
          privilege integer NOT NULL DEFAULT 0,
          securityQuestion1 character(40) NOT NULL,
          securityAnswer1 character(40) NOT NULL,
          securityQuestion2 character(40) NOT NULL,
          securityAnswer2 character(40) NOT NULL,
          securityQuestion3 character(40) NOT NULL,
          securityAnswer3 character(40) NOT NULL,
          CONSTRAINT utilisateur_pkey PRIMARY KEY (id)
        )
      `);
    } catch (error) {
      logger.error("\ncreateTable errpr: \n" +String(error));
    } finally {
      pool.end();
    }
  }

  /**
This async function sets up the data table in the database by running a SQL file.
@returns {Promise<void>}
*/
export async function setupDataDB() {
    if (!await checkIfTable('userdata')){
      const filePath = 'data/dbdatasqlcode.sql';
      await runSqlFile(filePath)
        .then(() => logger.info('\nSQL file executed successfully'))
        .catch(err => logger.error('\nError executing SQL file:', String(err)));
    }
}


//used to create account  Use webpage instead if needed
//accountCreationUser(12345678, 'testuser8', 'testusergiven1-8', 'testusergiven2-8', 'testpass8', 'testuser2@email.com', "hello who?", "World!", "Whats my name", "Testuser8", "Whats my purpose", "Testing");
/**
 * This is an async function that checks if the "users" table exists in the database.
 * If the table does not exist, it creates the table and inserts a new user.
 * @returns {Promise<void>} Nothing is returned from this function.
 */
export async function initiateDB() {
    const pool = new Pool(credentials);
    //This changes the passwords to match current standards for users who already have a table (instead of deleting and creating a new table)
    const tablename = 'users';
    if(await checkIfTable('users')){
      if(await checkIfUser('testuser1@email.com'))
        changePass('testuser1@email.com', 'TestPassLonger1!');
      changePass('testadmin1@email.com', 'TestPassLonger2!');
    }
    // Call "checkIfTable" to see if the table exists 
    const tablecheck = await checkIfTable('users');
    if (!tablecheck){    //if it doesnt exist
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
        logger.info('\ninitiateDB table exist double check --> ' + String(res.rows[0].exists));
        logger.info('\ninitiateDB --> Table was created successfully.');
        // Call the "accountCreationUser" function with some parameters.
        await accountCreationUser(
          12345678,
          'testuser1',
          'testusergiven1-1',
          'testusergiven2-1',
          'Testpasslonger1!',
          'testuser1@email.com',
          'hello who?',
          'World!',
          'Whats my name',
          'Testuser1',
          'Whats my purpose',
          'Testing'
        );
        await accountCreationAdmin(
          'testadmin1',
          'testadmingiven1-1',
          'testadmingiven2-1',
          'Testpasslonger2!',
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
        logger.error("\ninitiateDB error: \n" +String(error)
        );
      } finally {
        pool.end();
      }
    }
  }



  
/**
 * Creates a new PostgreSQL table named "pendingUser" with a "number" ID column that cannot be left empty,
 * and a "boolean" column that defaults to "false".
 */
  export async function createPendingTable() {
    const tablecheck = await checkIfTable('pendinguser');
    if (! tablecheck){
      try {
        const pool = new Pool(credentials);
        const query = `
          CREATE TABLE pendingUser (
            id SERIAL PRIMARY KEY,
            isPending BOOLEAN DEFAULT false NOT NULL
          );
        `;
        await pool.query(query);
        logger.info('Table "approvedUsers" created successfully!');
        pool.end();
      } catch (error) {
        logger.error('Error creating table approvedUsers:', String(error));
      }
    }
  
  }

  export async function createApprovedTable() {
    const tablecheck = await checkIfTable('approvedusers');
    if (! tablecheck){
      try {
        const pool = new Pool(credentials);
        const query = `
          CREATE TABLE approvedUsers (
            id SERIAL PRIMARY KEY,
            link CHAR(255),
            approvedTime TIMESTAMP
          );
        `;
        await pool.query(query);
        logger.info('Table "approvedUsers" created successfully!');
        pool.end();
      } catch (error) {
        logger.error('Error creating table approvedUsers:', String(error));
      }
    }
  
  }




  export default {
    initiateDB,
    setupDataDB,
    checkIfTable,
    createPendingTable,
    createApprovedTable
  } 



  

