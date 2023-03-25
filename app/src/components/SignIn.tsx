import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleDisable } from "./WelcomePageComponents/Controller/SignInController";
import {
  checkEmail,
  checkPassword,
} from "../components/RegisterPageComponents/RegisterPageController";
import "../stylings/SignIn.css";

/**
 * Check user credentials and redirect to dashboard or admin page
 * @returns {JSX.Element} - Sign in page
 */
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Send post request with login data to backend and receives a response on if the user is valid,
   * then takes them to the appropriate page
   */
  function handleSignIn() {
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((response) => {
        if (response.data.exist) {
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
          {!checkEmail(email) && email !== "" && (
            <p>Please enter a valid email.</p>
          )}
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
          {!checkPassword(password) && password !== "" && (
            <p>Please enter a valid password.</p>
          )}
        </div>

        <div className="button-div">
          <button
            disabled={handleDisable(email, password)}
            type="button"
            className="signin-button"
            onClick={handleSignIn}
          >
            SIGN IN
          </button>

          <p>
            {" "}
            Do not have an account?{" "}
            <Link to="RequestAccount" className="request-account-link">
              {" "}
              Request one.{" "}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
