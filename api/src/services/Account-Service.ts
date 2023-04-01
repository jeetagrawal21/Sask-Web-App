import { Client, Pool } from 'pg';
import { credentials} from '../declarations/Database_Credentials';
import { Logger } from "tslog";
import { appendFileSync } from "fs";


//setting up logging 
export const logger = new Logger(); 

logger.attachTransport((logObj) => {
  appendFileSync("BackendLog.txt", JSON.stringify(logObj) + "\n");
});


/**
 * Inserts a new row into the "pendingUser" table with the given ID and "isPending" value.
 * @param id The ID value for the new row.
 * @param isPending The "isPending" value for the new row.
 * @returns A Promise that resolves when the insertion is complete.
 */
export async function insertPendingUser(id: number): Promise<void> {

    try {
      // Connect to the database.
      const pool = new Pool(credentials);
  
      // Define the SQL query to insert a new row into the "pendingUser" table.
      const query = `
        INSERT INTO pendingUser (id, isPending)
        VALUES ($1, $2);
      `;
  
      // Execute the query to insert the new row.
      await pool.query(query, [id, true]);
  
      // Log a success message to the console.
      logger.info(`New row with ID ${id} inserted into "pendingUser" table!`);
  
      await pool.end();
  
    } catch (error) {
      // Log an error message to the console if something goes wrong.
      logger.error('Error inserting row:', error);
    } 
  }
  

  /**
 * Checks if the given participant ID already exists in the "pendingUser" table.
 * @param participantId The participant ID to check for.
 * @returns A Promise that resolves with a boolean indicating whether the participant ID exists in the table.
 */
export async function isParticipantIdPending(participantId: number): Promise<boolean> {
    const pool = new Pool(credentials);
  
    try {
      const result = await pool.query('SELECT id FROM pendingUser WHERE id = $1', [participantId]);
      if (result.rowCount > 0){       // if thhere is a reply (response is not equal 0)
        const returnval = Number(result.rows[0].id) === Number(participantId)  // stores 'does id provided match id in table' result 
        logger.info('Is participant ID ' + String(participantId) + ' Located in table: ' + String(returnval)); 
        return returnval;    //returns stored results 
      }else{
        logger.info('Is participant ID ' + String(participantId) + ' Located in table: false') 
        return false;   //if we never get a reply assume its false 
      }
    } catch (error) {
      logger.error('Error checking participant ID:', error);
      return false;
    } finally {
      await pool.end();
    }
  }

  export default {
    insertPendingUser,
    isParticipantIdPending
  } 