import React, { useState, useEffect, useContext } from "react";
import "../stylings/AdminPage.css";
import {
  User,
  UserRequest,
} from '../components/AdminPageComponents/interfaces';
import UserRequestsTable from '../components/AdminPageComponents/UserRequestsTable';
import AllUsersTable from '../components/AdminPageComponents/AllUsersTable';
import SignOut from '../components/SignOut';
import UploadUserData from '../components/AdminPageComponents/UploadUserData';
import { AuthContext } from '../AuthContext';
import ReturnToHome from '../components/ReturnToHome';
import axios from 'axios';
import log from 'loglevel'

const AdminPage: React.FC = () => {
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // useEffect hook that runs on component mount to simulate fetching user requests and all users from server
  useEffect(() => {

    axios
    .post(process.env.REACT_APP_API_BASE_URL + "/AdminPage/AdminPagePending")
    .then((response) => {
      const initUserRequests: UserRequest[] = response.data
      setUserRequests(initUserRequests);
    });

    axios
    .post(process.env.REACT_APP_API_BASE_URL + "/AdminPage/AdminPageApproved")
    .then((response) => {
      const initUsers: User[] = response.data
      setAllUsers(initUsers);
    });
    // initialize sample data for all users

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
      axios
      .post(process.env.REACT_APP_API_BASE_URL + "/AdminPage/approve", userRequest)
      .then((response) => {
    
      });
      setUserRequests(userRequests.filter((req) => req.id !== userId));
      setAllUsers([
        ...allUsers,
        {
          id: userRequest.id,
          link: "", // Add link property with an empty string as the default value
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
    axios
    .post(process.env.REACT_APP_API_BASE_URL + "/AdminPage/rejected", { userId })
    .then((response) => {
    });
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
    axios
    .post(process.env.REACT_APP_API_BASE_URL + "/AdminPage/deleteAproved", { userId })
    .then((response) => {
    });
    setAllUsers(allUsers.filter((user) => user.id !== userId));
  };

  const { isAuthenticated } = useContext(AuthContext); // Get the authentication status from the context


  return (
    isAuthenticated ? (
      <div>
        <h1>
          AdminPage
          <div style={{ float: "right", marginRight: "55px" }}>
            <UploadUserData />
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
    ) : (
      <div>
        <h1>Unauthorized access</h1>
        <ReturnToHome />
      </div>
    )
  );
};

export default AdminPage;
