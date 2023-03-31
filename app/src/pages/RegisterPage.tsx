import React, { useContext } from 'react';
import '../App.css';
import RegisterPageTitle from '../components/RegisterPageComponents/RegisterPageTitle';
import RegisterPageBody from '../components/RegisterPageComponents/RegisterPageBody';
import { AuthContext } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  /**
   * Purpose: Return the user to the welcome page
   * Preconditions: None
   * Postconditions: None
   * Return: None
   */
  function returnToWelcomePage() {
    navigate('/');
  }

  const { isAllowedToRegister } = useContext(AuthContext); // Get the authentication status from the context
  if (!isAllowedToRegister) {
    return (
      <div>
        <h1>Unauthorized access</h1>
        <button onClick={returnToWelcomePage}>Return to home page</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <RegisterPageTitle />
        <RegisterPageBody />
      </div>
    );
  }
}

export default App;
