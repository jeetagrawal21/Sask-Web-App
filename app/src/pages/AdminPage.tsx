import React, { useState, useEffect, useContext } from "react";
import "../stylings/AdminPage.css";
import {
  User,
  UserRequest,
} from "../components/AdminPageComponents/interfaces";
import UserRequestsTable from "../components/AdminPageComponents/UserRequestsTable";
import AllUsersTable from "../components/AdminPageComponents/AllUsersTable";
import SignOut from "../components/SignOut";
import { AuthContext } from "../AuthContext";
import ReturnToHome from "../components/ReturnToHome";

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

  const { isAuthenticated } = useContext(AuthContext); // Get the authentication status from the context
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return (
      <div>
        <h1>Unauthorized access</h1>
        <ReturnToHome />
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          AdminPage
          <div style={{ float: "right", marginRight: "55px" }}>
            <SignOut />
          </div>
        </h1>
        <UserRequestsTable
          userRequests={userRequests}
          onApproveUserRequest={handleApproveUserRequest}
          onRejectUserRequest={handleRejectUserRequest}
        />
        <AllUsersTable allUsers={allUsers} onRemoveUser={handleRemoveUser} />
      </div>
    );
  }
};

export default AdminPage;
