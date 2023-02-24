import '../stylings/signin.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
  render() {
    /**
     * Sends the user login data to the backend which authenticates with the database
     * receives a response whether login was suceessful or not
     */
    function authenticateLogin() {
      const participantInfo = {
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement)
          .value,
      };
      // send the participant data to the backend using an axios post request
      axios
        .post('http://localhost:3000/login', participantInfo)
        .then((response) => {
          alert(response);
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
            <Link to="Dashboard">
              <button className="signin-button" onClick={authenticateLogin}>
                SIGN IN
              </button>
            </Link>

            <p>Do not have an account?</p>
            <Link to="RequestAccount">
              <button className="signin-button">REQUEST AN ACCOUNT</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
