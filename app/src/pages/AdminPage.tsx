import React, { useState, useEffect, useContext } from 'react';
import '../stylings/AdminPage.css';
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
    const initUserRequests: UserRequest[] = [
      {
        id: 2735,
        name: 'Jack Black',
        email: 'jack.black@example.com',
        requestDate: new Date(),
      },
      {
        id: 1892,
        name: 'Mary White',
        email: 'mary.white@example.com',
        requestDate: new Date(),
      },
    ];
    setUserRequests(initUserRequests);

    // initialize sample data for all users
    const initUsers: User[] = [
      { id: 3921, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2012, name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: 3289, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
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

  /**
   * handleFileChange is an event handler function that is triggered when a file is selected for upload
   * @param {React.ChangeEvent<HTMLInputElement>} event - the event object
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the selected file from the input event
    const file = event.target.files && event.target.files[0];

    // If no file was selected, log an error and return from the function
    if (!file) {
      log.error('No file selected');
      return;
    }

    try {
      // Create a new form data object and append the selected file to it
      const formData = new FormData();
      formData.append('file', file);

      // Send a POST request to the server to upload the file
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Log the response from the server after the file is uploaded successfully
      log.info('File uploaded successfully:', response.data);
    } catch (error) {
      // Log an error if there was a problem uploading the file
      log.error('Error uploading the file:', error);
    }
  };


  return (
    <div>
      <h1>
        AdminPage
        <div style={{ float: 'right', marginRight: '55px' }}>
          {/* <input type="file" name="file" id="file" style={{ display: "none" }} onChange={handleFileChange} /> */}

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
  );
}
// };

export default AdminPage;
