import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserRequest {
  id: number;
  name: string;
  email: string;
  requestDate: Date;
}

const users: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com"},
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com"},
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com"},
  ];
  
  const userRequests: UserRequest[] = [
    { id: 1, name: "Jack Black", email: "jack.black@example.com", requestDate: new Date() },
    { id: 2, name: "Mary White", email: "mary.white@example.com", requestDate: new Date() },
  ];

const AdminPage: React.FC = () => {
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUserRequests();
    fetchAllUsers();
  }, []);

  const fetchUserRequests = async () => {
    setUserRequests(userRequests);
  };

  const fetchAllUsers = async () => {
    setAllUsers(users);
  };

  const handleApproveUserRequest = async (userId: number) => {
    
  };

  const handleRejectUserRequest = async (userId: number) => {
    await rejectUserRequest(userId);
    fetchUserRequests();
  };

  const handleRemoveUser = async (userId: number) => {
    await removeUser(userId);
    fetchAllUsers();
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
              <td>{userRequest.requestDate}</td>
              <td>
                <button onClick={() => handleApproveUserRequest(userRequest.id)}>Approve</button>
              </td>
              <td>
                <button onClick={() => handleRejectUserRequest(userRequest.id)}>Reject</button>
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
                <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;