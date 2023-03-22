
import { Client, Pool } from 'pg';
import { credentials} from '../declarations/database_credentials';



// DEMO CODE ON HOW TO CONNECT WITH POOL CONNECTION (NEVER CALLED)

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query('SELECT * FROM users');
  console.log(now.rows);
  await pool.end();

  return now;
}

// DEMO CODE ON HOW TO CONNECT WITH CLIENT CONNECTION (NEVER CALLED)

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query('SELECT NOW()');
  await client.end();

  return now;
}





/**
    Function Name: checkIfUser
    Description: Verifies if a user with the provided email exists in the database.
    @param {string} email - The email address of the user to check for.
    @returns {Promise<boolean>} - Returns true if a user with the provided email exists in the database, false otherwise.
    */
   export async function checkIfUser(email: string) {
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
export async function checkIfAdmin(email:string) {
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


/**

    Function Name: getUser
    Description: Retrieves user information based on the email and password provided.
    @param {string} email - The email address of the user to retrieve information for.
    @param {string} pass - The password of the user.
    @returns {Promise<object>} - Returns an object containing user information if found, otherwise returns null.
    */
   export async function getUser(email: string, pass: string) {
  const pool = new Pool(credentials);
  const result = await pool.query(
    //query looks for all users with email
    `SELECT 1 FROM users WHERE email = $1`,
    [email]
  );
  await pool.end();
  return result;
}


/**

    Function Name: checkPass
    Description: Verifies if the provided email and password combination is correct for a user in the database.
    @param {string} email - The email address of the user to check the password for.
    @param {string} pass - The password of the user to verify.
    @returns {Promise<boolean>} - Returns true if the email and password combination is correct, false otherwise.
    */
   export async function checkPass(email: string, pass: string) {
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
export async function accountCreationAdmin(
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
  if (await checkIfUser(email)) {
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
export async function accountCreationUser(
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
  if (await checkIfUser(email)) {
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
 * @returns {Promise<boolean>} - A promise that resolves with a boolean value indicating whether the user was deleted or not, or rejects when an error occurs
 */
export async function deleteUser(email: string): Promise<boolean> {
  const pool = new Pool(credentials);

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE email=$1 RETURNING *`, // Delete the user from the "users" table
      [email]
    );

    if (result.rowCount === 0) {
      // If the user was not found
      console.log("User not found");
      return false;
    } else {
      console.log("User deleted");
      return true;
    }
  } catch (error) {
    // If an error occurred
    console.error(error);
    return false;
  } finally {
    pool.end();
  }
}


/**
 * Changes the password of the user with the specified email address
 * @param email - Email address of the user whose password is to be changed
 * @param newpass - New password to be set for the user
 * @returns true if password is changed successfully, false otherwise
 */
export async function changePass(
  email: string,
  newpass: string
): Promise<boolean> {
  const pool = new Pool(credentials);

  // Check if the user with the specified email address exists
  if (await checkIfUser(email)) {
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

export default {
  checkIfUser,
  checkIfAdmin,
  getUser,
  checkPass,
  accountCreationAdmin,
  accountCreationUser,
  deleteUser,
  changePass
} 
