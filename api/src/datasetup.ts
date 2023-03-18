import fs from 'fs';
import { Client } from 'pg';
import path from 'path';
import { credentials } from './database';

const cred= {
    user: "postgres",
    host: "postgres",
    database: "postgres",
    password: "ThisIsASuperLongAndCoolPassword4DevelopmentToKeepOutHackersSoIfYoureAHackerPleaseLeave>:3",
    port: 5432,
  };
  

const client = new Client(cred);

/**

    Executes an SQL script file on the PostgreSQL database using the provided file path

    @param {string} filepath - The file path of the SQL script file to be executed

    @returns {Promise<void>} - A Promise that resolves when the script has been executed successfully
    */
export default async function runSqlFile(filepath: string): Promise<void> {
    // Resolves the absolute path of the current working directory
    const __dirname = path.resolve();
    // Reads the contents of the SQL script file and converts it to a string
    const sql = fs.readFileSync(path.join(__dirname, 'src', filepath)).toString();
    // Establishes a connection to the PostgreSQL database using the configured credentials
    await client.connect();
    // Executes the SQL script on the connected database
    await client.query(sql);
    // Closes the database connection
    await client.end();
}

