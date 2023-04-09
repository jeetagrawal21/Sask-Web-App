import "../stylings/SignIn.css";
import React, { Component, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

/**
 * Check user credentials and redirect to dashboard or admin page
 * @returns {JSX.Element} - Sign in page
 */
function SignIn() {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Send post request with login data to backend and receives a response on if the user is valid,
   * then takes them to the appropriate page
   */
  function handleSignIn() {
    const participantInfo = {
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };

    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/login", participantInfo)
      .then((response) => {
        if (response.data.exist) {
          console.log(response.data.exist);
          setAuthenticated(true); // Set the authentication status to true
          if (response.data.isadmin) {
            navigate("AdminPage");
          } else {
            navigate("Dashboard");
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

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
          />
        </div>

        <div className="button-div">
          <button
            type="button"
            className="signin-button"
            onClick={handleSignIn}
          >
            SIGN IN
          </button>

          <p>
            {" "}
            Do not have an account?
            <a
              onClick={() => navigate("RequestAccount")}
              className="request-account-link"
            >
              {" "}
              Request one.{" "}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
