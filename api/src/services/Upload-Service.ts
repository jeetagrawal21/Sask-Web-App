// Import the Pool class from the pg module to create a connection pool
import { Pool } from 'pg';

// Import the database credentials from a separate file
import { credentials } from '../declarations/Database_Credentials';

// Import the logger from the Server module
import { logger } from '@src/Server';

/**
 * Inserts a new row into the "userdata" table in the database using the provided row object.
 * 
 * @param row An object representing the row to be inserted into the database. Each key in the object
 * corresponds to a column in the "userdata" table, and each value is the value to be inserted into that column.
 * If a value is an empty string, it will be inserted as NULL in the database.
 * 
 * @returns A Promise that resolves with no value when the row has been successfully inserted, or rejects with
 * an error if the insertion fails.
 */
async function insertRow(row: Record<string, string>): Promise<void> {

    // Create a new connection pool with the provided database credentials
    const pool = new Pool(credentials);

    // Get the keys of the row object and join them into a comma-separated string
    const keys = Object.keys(row).map((key: String) => `"${key}"`).join(', ');

    // Get the values of the row object, replace empty string with NULL and escape single quotes
    const values = Object.values(row)
        .map((value) => {
            if (value === '') {
                return "NULL";
            }
            const escapedValue = (value as string).replace(/'/g, "''");
            return `'${escapedValue}'`;
        })
        .join(', ');

    // Construct the SQL query to insert the row into the userdata table
    const query = `INSERT INTO userdata (${keys}) VALUES (${values});`;

    // Try to execute the query using the connection pool
    try {
        await pool.query(query);
    } catch (error) {
        logger.error(`Error inserting row: ${error}`);
    }
}

// Export an object containing the insertRow function
export default {
    insertRow
}
