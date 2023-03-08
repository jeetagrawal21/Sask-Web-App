import '../stylings/signin.css';
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const navigate = useNavigate();

  function authenticateLogin() {
    const participantInfo = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement)
        .value,
    };

    axios
      .post('http://localhost:3000/login', participantInfo)
      .then((response) => {
        if (response.data == true) {
          navigate('/Dashboard');
        }
      });
  }

  return (
    <div className="signin">
      <form className="Auth-form">
        <h3>Sign In!</h3>
        <div className="participantId">
          <input
            type="id"
            className="input-fields"
            placeholder="Email"
            id="email"
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            className="input-fields"
            placeholder="Password"
            id="password"
          ></input>
        </div>
        <div className="button-div">
          <button type="button" className="signin-button" onClick={authenticateLogin}>
            SIGN IN
          </button>

          <p>Do not have an account?</p>
          <Link to="Dashbaords">
            <button className="signin-button">REQUEST AN ACCOUNT</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
