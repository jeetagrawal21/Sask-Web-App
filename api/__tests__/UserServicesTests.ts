import { Client, Pool } from 'pg';
import { checkIfUser, checkIfAdmin, getUser, checkPass, accountCreationAdmin, accountCreationUser, deleteUser, changePass } from '../src/services/User-Services';
import { credentials} from '../src/declarations/Database_Credentials';





//Check if User Testing 

describe("checkIfUser function", () => {
  it("returns true for an existing user", async () => {
    const email = "testuser1@email.com";
    // Add an existing user to the database first
    // then call the checkIfUser function with the same email
    // and assert that it returns true
    const result = await checkIfUser(email);
    expect(result).toBe(true);
    console.log("checkIfUser function: existing user - PASSED");
  });

  test("returns false for a non-existing user", async () => {
    const email = "nonexistinguser@example.com";
    // Call the checkIfUser function with a non-existing email
    // and assert that it returns false
    const result = await checkIfUser(email);
    expect(result).toBe(false);
    console.log("checkIfUser function: non-existing user - PASSED");
  });
});

describe("checkIfAdmin function", () => {
  it("returns true for an admin user", async () => {
    const email = "testadmin1@email.com";
    // Add an admin user to the database first
    // then call the checkIfAdmin function with the same email
    // and assert that it returns true
    const result = await checkIfAdmin(email);
    expect(result).toBe(true);
    console.log("checkIfAdmin function: admin user - PASSED");
  });

  it("returns false for a non-admin user", async () => {
    const email = "testuser1@email.com";
    // Add a non-admin user to the database first
    // then call the checkIfAdmin function with the same email
    // and assert that it returns false
    const result = await checkIfAdmin(email);
    expect(result).toBe(false);
    console.log("checkIfAdmin function: non-admin user - PASSED");
  });

  it("returns false for a non-existing user", async () => {
    const email = "nonexistinguser@email.com";
    // Call the checkIfAdmin function with a non-existing email
    // and assert that it returns false
    const result = await checkIfAdmin(email);
    expect(result).toBe(false);
    console.log("checkIfAdmin function: non-existing user - PASSED");
  });
});

//Testing GetUser Function

describe("getUser function", () => {
  it("returns user info for an existing user", async () => {
    const email = "testuser1@email.com";
    // Add an existing user to the database first
    // then call the getUser function with the same email
    // and assert that it returns the correct user info
    const result = await getUser(email, "testpasslonger1!");
    expect(result.rows.length).toBeGreaterThan(0);
    console.log("getUser function: existing user - PASSED");
  });

  it("returns no user info for a non-existing user", async () => {
    const email = "nonexistinguser@example.com";
    // Call the getUser function with a non-existing email
    // and assert that it returns no user info
    const result = await getUser(email, "testpasslonger2!");
    expect(result.rows.length).toBe(0);
    console.log("getUser function: non-existing user - PASSED");
  });
});

// Testing CheckPass function
describe("checkPass function", () => {
  it("returns true for correct email and password combination", async () => {
    const email = "testuser1@email.com";
    const password = "Testpasslonger1!";
    // Add a user to the database with the email and password above
    // then call the checkPass function with the same email and password
    // and assert that it returns true
    const result = await checkPass(email, password);
    expect(result).toBe(true);
    console.log("checkPass function: correct email and password combination - PASSED");
  });

  it("returns false for incorrect email and password combination", async () => {
    const email = "testuser1@email.com";
    const password = "wrongpassword";
    // Add a user to the database with the email above, but a different password
    // then call the checkPass function with the same email and the wrong password
    // and assert that it returns false
    const result = await checkPass(email, password);
    expect(result).toBe(false);
    console.log("checkPass function: incorrect email and password combination - PASSED");
  });

  it("returns false for non-existing user", async () => {
    const email = "nonexistinguser@example.com";
    const password = "password123";
    // Call the checkPass function with a non-existing email and password
    // and assert that it returns false
    const result = await checkPass(email, password);
    expect(result).toBe(false);
    console.log("checkPass function: non-existing user - PASSED");
  });
});
describe("checkPass function", () => {

  it("returns true for correct password", async () => {
    const email = "testuser1@email.com";
    const pass = "Testpasslonger1!";
    // Call the checkPass function with the correct email and password
    // and assert that it returns true
    const result = await checkPass(email, pass);
    expect(result).toBe(true);
    console.log("checkPass function: correct password - PASSED");
  });

  it("returns false for incorrect password", async () => {
    const email = "testuser1@email.com";
    const pass = "wrongpassword";
    // Call the checkPass function with the correct email but an incorrect password
    // and assert that it returns false
    const result = await checkPass(email, pass);
    expect(result).toBe(false);
    console.log("checkPass function: incorrect password - PASSED");
  });

  it("returns false for non-existing user", async () => {
    const email = "nonexistinguser@example.com";
    const pass = "password123";
    // Call the checkPass function with a non-existing email and any password
    // and assert that it returns false
    const result = await checkPass(email, pass);
    expect(result).toBe(false);
    console.log("checkPass function: non-existing user - PASSED");
  });
});


describe("accountCreationAdmin function", () => {
  it("creates an admin account when user does not exist", async () => {
    const email = "newadmin@example.com";
    const result = await accountCreationAdmin("Doe", "John", "", "password", email, "question1", "answer1", "question2", "answer2", "question3", "answer3");
    expect(result).toBe(undefined); // the function does not return anything
    // Check that the user was added to the database with privilege level of 1
    const pool = new Pool(credentials);
    const queryResult = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    expect(queryResult.rows[0].privilege).toBe(1);
    console.log("accountCreationAdmin function: creates an admin account when user does not exist - PASSED");
    await pool.query(`
    DELETE FROM users
    WHERE email = $1
    `, [email]);
    await pool.end();
  });

  it("does not create an admin account when user already exists", async () => {
    const email = "existinguser@example.com";
    const result = await accountCreationAdmin("Doe", "John", "", "password", email, "question1", "answer1", "question2", "answer2", "question3", "answer3");
    expect(result).toBe(undefined); // the function does not return anything
    // Check that the user was not added to the database
    const pool = new Pool(credentials);
    const queryResult = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    expect(queryResult.rows.length).toBe(1);
    console.log("accountCreationAdmin function: does not create an admin account when user already exists - PASSED");
    await pool.query(`
    DELETE FROM users
    WHERE email = $1
    `, [email]);
    await pool.end();
  });
});

describe("accountCreationUser function", () => {
  it("creates a new account for a non-existing user", async () => {
    const ID = 123;
    const surname = "TestCREAAATION";
    const givenname2 = "User";
    const givenname3 = "";
    const pass = "testpassword";
    const email = "testuserCREAAATION@example.com";
    const securityQuestion1 = "What is your favorite color?";
    const securityAnswer1 = "Blue";
    const securityQuestion2 = "What is your favorite food?";
    const securityAnswer2 = "Pizza";
    const securityQuestion3 = "What is your favorite movie?";
    const securityAnswer3 = "The Godfather";
    // Call the accountCreationUser function with the above inputs
    // and assert that it creates a new account for the user
    await accountCreationUser(ID, surname, givenname2, givenname3, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3);
    const result = await checkIfUser(email);
    expect(result).toBe(true);
    const pool = new Pool(credentials);
    await pool.query(`
    DELETE FROM users
    WHERE email = $1
    `, [email]);
    await pool.end();

    console.log("accountCreationUser function: creates a new account for a non-existing user - PASSED");
  });

  it("does not create a new account for an existing user", async () => {
    const ID = 2;
    const surname = "Test";
    const givenname2 = "User";
    const givenname3 = "";
    const pass = "testpassword";
    const email = "testuser1@email.com"; // An existing email
    const securityQuestion1 = "What is your favorite color?";
    const securityAnswer1 = "Green";
    const securityQuestion2 = "What is your favorite food?";
    const securityAnswer2 = "Burgers";
    const securityQuestion3 = "What is your favorite movie?";
    const securityAnswer3 = "The Shawshank Redemption";
    // Call the accountCreationUser function with the above inputs
    // and assert that it does not create a new account for the user
    await accountCreationUser(ID, surname, givenname2, givenname3, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3);
    const result = await checkIfUser(email);
    expect(result).toBe(true);
    console.log("accountCreationUser function: does not create a new account for an existing user - PASSED");
  });
});

describe("deleteUser function", () => {

  it("deletes an existing user", async () => {
    // Add a user to the database before the tests start
    const ID = 2;
    const surname = "Test";
    const givenname2 = "User";
    const givenname3 = "g3";
    const pass = "testpassword";
    const email = "testuserdelete@email.com"; // An existing email
    const securityQuestion1 = "What is your favorite color?";
    const securityAnswer1 = "Green";
    const securityQuestion2 = "What is your favorite food?";
    const securityAnswer2 = "Burgers";
    const securityQuestion3 = "What is your favorite movie?";
    const securityAnswer3 = "The Shawshank Redemption";
    // Call the accountCreationUser function with the above inputs
    // and assert that it does not create a new account for the user
    await accountCreationUser(ID, surname, givenname2, givenname3, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3);

    // Call the deleteUser function with an existing user's email
    // and assert that it deletes the user
    await deleteUser(email);
    const userExists = await checkIfUser(email);
    expect(userExists).toBe(false);
    console.log("deleteUser function: existing user - PASSED");
  });

  it("does not delete a non-existing user", async () => {
    const email = "nonexistinguser@example.com";
    // Call the deleteUser function with a non-existing user's email
    // and assert that it does not delete any user
    await deleteUser(email);
    console.log("deleteUser function: non-existing user - PASSED");
  });

});

describe("changePass function", () => {
  it("returns true for a successful password change", async () => {
    
    // Add a user to the database before the tests start
    const ID = 2;
    const surname = "Test";
    const givenname2 = "User";
    const givenname3 = "g3";
    const pass = "testpassword";
    const email = "testuserchangePass@email.com"; // An existing email
    const securityQuestion1 = "What is your favorite color?";
    const securityAnswer1 = "Green";
    const securityQuestion2 = "What is your favorite food?";
    const securityAnswer2 = "Burgers";
    const securityQuestion3 = "What is your favorite movie?";
    const securityAnswer3 = "The Shawshank Redemption";
    // Call the accountCreationUser function with the above inputs
    // Add an existing user to the database first with the old password
    await accountCreationUser(ID, surname, givenname2, givenname3, pass, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3);

    const newpass = "newpassword";
    // Add an existing user to the database first with the old password
    // then call the changePass function with the same email and new password
    // and assert that it returns true
    const result = await changePass(email, newpass);
    expect(result).toBe(true);
    await deleteUser(email);
    console.log("changePass function: successful password change - PASSED");
  });

  it("returns false for a non-existing user", async () => {
    const email = "nonexistinguser@email.com";
    const newpass = "newpassword";
    // Call the changePass function with a non-existing email
    // and assert that it returns false
    const result = await changePass(email, newpass);
    expect(result).toBe(false);
    console.log("changePass function: non-existing user - PASSED");
  });
});



