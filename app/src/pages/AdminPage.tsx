import React, { useState, useEffect } from "react";
import "/app/src/stylings/AdminPage.css";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserRequest {
  id: number;
  name: string;
  email: string;
  requestDate: Date;
}

// initialize sample data
const initUserRequests: UserRequest[] = [
  { id: 2735, name: "Jack Black", email: "jack.black@example.com", requestDate: new Date() },
  { id: 1892, name: "Mary White", email: "mary.white@example.com", requestDate: new Date() },
];

const initUsers: User[] = [
  { id: 3921, name: "John Doe", email: "john.doe@example.com"},
  { id: 2012, name: "Jane Smith", email: "jane.smith@example.com"},
  { id: 3289, name: "Bob Johnson", email: "bob.johnson@example.com"},
];

const AdminPage: React.FC = () => {
  // set up state hooks
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUserRequests();
    fetchAllUsers();
  }, []);

  // load initial data
  const fetchUserRequests = async () => {
    setUserRequests(initUserRequests);
  };

  // simulate fetching user requests from server
  const fetchAllUsers = async () => {
    setAllUsers(initUsers);
  };

  // handle approving a user request
  const handleApproveUserRequest = async (userId: number) => {
    // find the user request by ID and create a new User object with its data
    let newUser: User = {id: 0, name: "null", email: "null"};
    let newUsers = allUsers
    userRequests.map(req => req.id === userId ? (newUser = {id: req.id, name: req.name, email: req.email}) : (null))
    // remove the user request from the state
    setUserRequests(userRequests.filter(req => req.id !== userId))
    // add the new user to the state if it exists
    if (newUser.id !== 0){
      newUsers.push(newUser)
      setAllUsers(newUsers)
    }
  };

  // handle rejecting a user request
  const handleRejectUserRequest = async (userId: number) => {
    // remove the user request from the state
    const newRequests = userRequests.filter(req => req.id !== userId)
    setUserRequests(newRequests)
  };

  // handle removing a user from the list
  const handleRemoveUser = async (userId: number) => {
    // remove the user from the state
    const newUsers = allUsers.filter(u => u.id !== userId)
    setAllUsers(newUsers)
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
              <button onClick={() => handleApproveUserRequest(userRequest.id)} data-testid={`approve-user-${userRequest.id}`}>Approve</button>
              </td>
              <td>
                <button onClick={() => handleRejectUserRequest(userRequest.id)} data-testid={`reject-user-${userRequest.id}`}>Reject</button>
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
                <button onClick={() => handleRemoveUser(user.id)} data-testid={`remove-user-${user.id}`}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
