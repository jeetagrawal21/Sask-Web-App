import React from "react";
import { UserRequestsTableProps } from "./interfaces";

/**
 * UserRequestsTable component that displays a table of user requests
 * @param userRequests - array of user requests
 * @param onApproveUserRequest - callback function to approve a user request
 * @param onRejectUserRequest - callback function to reject a user request
 * @returns UserRequestsTable component
 */
const UserRequestsTable: React.FC<UserRequestsTableProps> = ({
  userRequests,
  onApproveUserRequest,
  onRejectUserRequest,
}) => {
  return (
    <div>
      <h2>User Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Request Date</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.map((userRequest) => (
            <tr key={userRequest.id}>
              <td>{userRequest.id}</td>
              <td>{userRequest.name}</td>
              <td>{userRequest.email}</td>
              <td>{userRequest.requestDate.toString()}</td>
              <td>
                <button
                  onClick={() => onApproveUserRequest(userRequest.id)}
                  data-testid={`approve-user-${userRequest.id}`}
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  onClick={() => onRejectUserRequest(userRequest.id)}
                  data-testid={`reject-user-${userRequest.id}`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRequestsTable;
