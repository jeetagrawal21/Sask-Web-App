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
 * Deletes the row with the given ID from the "pendingUser" table.
 * @param id The ID of the row to delete.
 * @returns A Promise that resolves when the deletion is complete.
 */
export async function deletePendingUser(id: number): Promise<void> {
  try {
    // Connect to the database.
    const pool = new Pool(credentials);

    // Define the SQL query to delete a row from the "pendingUser" table.
    const query = `
      DELETE FROM pendingUser
      WHERE id = $1;
    `;

    // Execute the query to delete the row.
    await pool.query(query, [id]);

    // Log a success message to the console.
    logger.info(`Row with ID ${id} deleted from "pendingUser" table!`);

    await pool.end();

  } catch (error) {
    // Log an error message to the console if something goes wrong.
    logger.error('Error deleting row:', error);
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

  /**
 * Retrieves all users from the "approvedUsers" table.
 * @returns A Promise that resolves with an array of user objects.
 */
interface User {
  id: number;
  link: string;
  approvedTime: Date;
}

export async function getAllAprovedUsers(): Promise<User[]> {
  try {
    // Connect to the database.
    const pool = new Pool(credentials);

    // Define the SQL query to select all rows from the "approvedUsers" table.
    const query = `
      SELECT id, link, approvedTime FROM approvedUsers;
    `;

    // Execute the query to retrieve all rows from the "approvedUsers" table.
    const result = await pool.query(query);

    // Close the connection pool.
    await pool.end();

    // Map the rows to an array of user objects.
    return result.rows.map((row: any) => ({
      id: row.id,
      link: row.link,
      approvedTime: row.approvedTime,
    }));
  } catch (error) {
    // Log an error message to the console if something goes wrong.
    console.error('Error getting all users:', error);
    // Return an empty array if there was an error retrieving the users.
    return [];
  }
}


  interface UserRequest {
    id: number;
    isPending: boolean;
  }
  
  export async function getUsersAndPendingStatus(): Promise<UserRequest[]> {
    const pool = new Pool(credentials);
  
    try {
      const query = 'SELECT id, isPending FROM pendingUser;';
      const result = await pool.query(query);
      const users = result.rows;
      return users;
    } catch (error) {
      logger.error('Error fetching users:', error);
      return [];
    } finally {
      pool.end();
    }
  }

  /**
 * Inserts a new row into the "approvedUsers" table with the given link and approval time.
 * @param link The link value for the new row.
 * @param approvedTime The approval time value for the new row.
 * @returns A Promise that resolves when the insertion is complete.
 */
export async function insertApprovedUser(id: Number, approvedTime: Date): Promise<void> {
  try {
    // Connect to the database.
    const pool = new Pool(credentials);
    const link = 'linktest.com'


    // Define the SQL query to insert a new row into the "approvedUsers" table.
    const query = `
      INSERT INTO approvedUsers (id, link, approvedTime)
      VALUES ($1, $2, $3);
    `;

    // Execute the query to insert the new row.
    await pool.query(query, [id, link, approvedTime]);

    // Log a success message to the console.
    logger.info(`New row with id "${id}" and approval time "${approvedTime}" inserted into "approvedUsers" table!`);

    await pool.end();

  } catch (error) {
    // Log an error message to the console if something goes wrong.
    logger.error('Error inserting row:', error);
  }
}

/**
 * Deletes a row from the "approvedUsers" table with the given ID.
 * @param id The ID value of the row to delete.
 * @returns A Promise that resolves when the deletion is complete.
 */
 export async function deleteApprovedUser(id: number): Promise<void> {
  try {
    // Connect to the database.
    const pool = new Pool(credentials);

    // Define the SQL query to delete a row from the "approvedUsers" table.
    const query = `
      DELETE FROM approvedUsers
      WHERE id = $1;
    `;

    // Execute the query to delete the row.
    await pool.query(query, [id]);

    // Log a success message to the console.
    logger.info(`Row with ID ${id} deleted from "approvedUsers" table!`);

    await pool.end();

  } catch (error) {
    // Log an error message to the console if something goes wrong.
    logger.error('Error deleting row:', error);
  }
}


/**
 * Deletes a row from the "approvedUsers" table with the given ID.
 * @param id The ID value of the row to delete.
 * @returns A Promise that resolves when the deletion is complete.
 */
 export async function linkgen(id: number): Promise<void> {
  try {
    // Connect to the database.
    const pool = new Pool(credentials);

    // Define the SQL query to delete a row from the "approvedUsers" table.
    const query = `
      DELETE FROM approvedUsers
      WHERE id = $1;
    `;

    // Execute the query to delete the row.
    await pool.query(query, [id]);

    // Log a success message to the console.
    logger.info(`Row with ID ${id} deleted from "approvedUsers" table!`);

    await pool.end();

  } catch (error) {
    // Log an error message to the console if something goes wrong.
    logger.error('Error deleting row:', error);
  }
}



  
  

  export default {
    insertPendingUser,
    isParticipantIdPending,
    getUsersAndPendingStatus,
    deletePendingUser,
    insertApprovedUser,
    deleteApprovedUser,
    getAllAprovedUsers
  } 