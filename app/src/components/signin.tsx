import '../stylings/signin.css';
import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  checkEmail,
  checkPassword,
  handleDisable,
} from './WelcomePageComponents/Controller/SigninController';

//Used React useState to check if the Email and password are valid. It is set to false and it will change once the desired input is given.
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function authenticateLogin() {
    const participantInfo = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    axios
      .post('http://localhost:3000/login', participantInfo)
      .then((response) => {
        if (response.data.exist) {
          console.log(response.data.exist);
          if (response.data.isadmin) {
            navigate('AdminPage');
          } else {
            navigate('Dashboard');
          }
        } else {
          alert("User/Password Doesn't exist");
        }
      });
  }

  return (
    <div className="signin">
      <form className="Auth-form">
        <h2 className="signin-heading">Sign In</h2>
        <div className="participantId">
          <input
            type="id"
            className="input-fields"
            placeholder="Email*"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        {/* If the given email is not valid, this will display an error message. */}
        {!checkEmail(email) && email !== '' ? (
          <>
            <p>Please enter a valid email</p>
          </>
        ) : (
          <></>
        )}

        <div className="password">
          <input
            type="password"
            className="input-fields"
            placeholder="Password*"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        {/* If the typed password does not meet the criteria, this will display an error message. */}
        {!checkPassword(password) && password !== '' && (
          <>
            <p>
              Please enter valid password. It must not be less than 8 characters
              and must include a special character and a number
            </p>
          </>
        )}

        {/* The sign in button is disabled by default so that the user cannot be redirected or go to the dashboard if they give the wrong details */}
        <div className="button-div">
          <button
            disabled={handleDisable(email, password)}
            type="button"
            className="signin-button"
            onClick={authenticateLogin}
          >
            SIGN IN
          </button>

          <p>
            {' '}
            Do not have an account?
            <a
              onClick={() => navigate('RequestAccount')}
              className="request-account-link"
            >
              {' '}
              Request one.{' '}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
