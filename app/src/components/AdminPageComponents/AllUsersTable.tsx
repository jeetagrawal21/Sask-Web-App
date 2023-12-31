import React from "react";
import { AllUsersTableProps } from "./interfaces";

/**
 * AllUsersTable component that displays a table of all users
 * @param allUsers - array of all users
 * @param onRemoveUser - callback function to remove a user
 * @returns AllUsersTable component
 */
const AllUsersTable: React.FC<AllUsersTableProps> = ({
  allUsers,
  onRemoveUser,
}) => {
  return (
    <div>
      <h2>Approved Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Actions</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <button
                  onClick={() => onRemoveUser(user.id)}
                  data-testid={`remove-user-${user.id}`}
                >
                  Remove
                </button>
              </td>
              <td>{user.link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersTable;