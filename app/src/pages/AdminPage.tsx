import React, { useState, useEffect } from "react";
import "../stylings/AdminPage.css";

/*
Represents a user in the list of all users
*/
export interface User {
  id: number;
  name: string;
  email: string;
}

/*
Represents a user request to be added to the list of all users
*/
export interface UserRequest {
  id: number;
  name: string;
  email: string;
  requestDate: Date;
}

const AdminPage: React.FC = () => {
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // useEffect hook that runs on component mount to simulate fetching user requests and all users from server
  useEffect(() => {
    const initUserRequests: UserRequest[] = [
      {
        id: 2735,
        name: "Jack Black",
        email: "jack.black@example.com",
        requestDate: new Date(),
      },
      {
        id: 1892,
        name: "Mary White",
        email: "mary.white@example.com",
        requestDate: new Date(),
      },
    ];
    setUserRequests(initUserRequests);

    // initialize sample data for all users
    const initUsers: User[] = [
      { id: 3921, name: "John Doe", email: "john.doe@example.com" },
      { id: 2012, name: "Jane Smith", email: "jane.smith@example.com" },
      { id: 3289, name: "Bob Johnson", email: "bob.johnson@example.com" },
    ];
    setAllUsers(initUsers);
  }, []);

  /**
  Handles approving a user request and adding the user to the list of all users
  @param userId - The id of the user request to approve
  @precondition userRequest with the given userId exists in the userRequests array
  @postcondition userRequest with the given userId is removed from the userRequests array,
  and a new user object is added to the allUsers array
  @assertion userRequest with the given userId is not null
  */
  const handleApproveUserRequest = (userId: number) => {
    const userRequest = userRequests.find((req) => req.id === userId);
    if (userRequest) {
      setUserRequests(userRequests.filter((req) => req.id !== userId));
      setAllUsers([
        ...allUsers,
        {
          id: userRequest.id,
          name: userRequest.name,
          email: userRequest.email,
        },
      ]);
    }
  };

  /**
  Handles rejecting a user request
  @param userId - The id of the user request to reject
  @precondition userRequest with the given userId exists in the userRequests array
  @postcondition userRequest with the given userId is removed from the userRequests array
  @assertion userRequest with the given userId is not null
  */
  const handleRejectUserRequest = (userId: number) => {
    setUserRequests(userRequests.filter((req) => req.id !== userId));
  };

  /**
  Handles removing a user from the list of all users
  @param userId - The id of the user to remove
  @precondition user with the given userId exists in the allUsers array
  @postcondition user with the given userId is removed from the allUsers array
  @assertion user with the given userId is not null
  */
  const handleRemoveUser = (userId: number) => {
    setAllUsers(allUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1>User Requests</h1>
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
                  onClick={() => handleApproveUserRequest(userRequest.id)}
                  data-testid={`approve-user-${userRequest.id}`}
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleRejectUserRequest(userRequest.id)}
                  data-testid={`reject-user-${userRequest.id}`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleRemoveUser(user.id)}
                  data-testid={`remove-user-${user.id}`}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
