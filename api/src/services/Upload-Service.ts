import { Pool } from 'pg';
import { credentials } from '../declarations/Database_Credentials';
import { logger } from '@src/Server';

// Function to insert a row into the database
async function insertRow(row: Record<string, string>): Promise<void> {
    const pool = new Pool(credentials);
    const keys = Object.keys(row).map((key: any) => `"${key}"`).join(', ');
    const values = Object.values(row)
        .map((value) => {
            if (value === '') {
                return "NULL";
            }
            const escapedValue = (value as string).replace(/'/g, "''");
            return `'${escapedValue}'`;
        })
        .join(', ');

    const query = `INSERT INTO userdata (${keys}) VALUES (${values});`;
    //logger.info(query)
    try {
        await pool.query(query);
        logger.info("Success inserting row");
    } catch (error) {
        logger.error(`Error inserting row: ${error}`);
    }
}

export default {
    insertRow
}