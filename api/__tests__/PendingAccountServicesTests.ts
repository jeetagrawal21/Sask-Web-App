import { insertPendingUser, isParticipantIdPending, getUsersAndPendingStatus, deleteApprovedUser, insertApprovedUser, deletePendingUser, getAllAprovedUsers} from '../src/services/PendingAccount-Service'
import { Client, Pool } from 'pg';
import { credentials} from '../src/declarations/Database_Credentials';
import expect from 'expect';



describe('deletePendingUser', () => {
  it('deletes a user from the "pendingUser" table', async () => {
    const id = 1;

    // Connect to the database.
    const pool = new Pool(credentials);

    // Insert a user into the "pendingUser" table.
    const insertQuery = `
      INSERT INTO pendingUser (id, isPending)
      VALUES ($1, true);
    `;
    await pool.query(insertQuery, [id]);

    // Expect the user to be in the "pendingUser" table.
    const selectQuery = `
      SELECT id, isPending
      FROM pendingUser
      WHERE id = $1;
    `;
    const result = await pool.query(selectQuery, [id]);
    expect(result.rows).toHaveLength(1);

    // Call the function we want to test.
    await deletePendingUser(id);

    // Expect the user to no longer be in the "pendingUser" table.
    const newResult = await pool.query(selectQuery, [id]);
    expect(newResult.rows).toHaveLength(0);

    // End the pool connection.
    await pool.end();
  });

  it('returns an error if the user does not exist in the "pendingUser" table', async () => {
    const id = 999;

    // Connect to the database.
    const pool = new Pool(credentials);

    // Call the function we want to test with a non-existing user ID.
    await expect(deletePendingUser(id)).rejects.toThrowError();

    // End the pool connection.
    await pool.end();
  });

});

describe('insertPendingUser', () => {
  it('inserts a new user into the "pendingUser" table', async () => {
    const id = 1;

    // Call the function we want to test.
    await insertPendingUser(id);

    // Connect to the database.
    const pool = new Pool(credentials);

    // Expect the user to be in the "pendingUser" table.
    const selectQuery = `
      SELECT id, isPending
      FROM pendingUser
      WHERE id = $1;
    `;
    const result = await pool.query(selectQuery, [id]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].id).toEqual(id);


    await deletePendingUser(id);

    // End the pool connection.
    await pool.end();
  });


});
