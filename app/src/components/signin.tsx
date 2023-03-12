import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylings/signin.css";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateEmail(email:string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function authenticateLogin() {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const participantInfo = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/login", participantInfo)
      .then((response) => {
        if (response.data.exist) {
          console.log(response.data.exist);
          if(response.data.isadmin){
            navigate("AdminPage");
          }else{
            navigate("Dashboard");
          }
        } else {
          alert("User/Password Doesn't exist");
        }
      });
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="signin">
      <form className="Auth-form">
        <h2 className="signin-heading">Sign In</h2>
        <div className="participantId">
          <input
            type="email"
            className="input-fields"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            className="input-fields"
            placeholder="Password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div className="button-div">
          <button
            type="button"
            className="signin-button"
            onClick={authenticateLogin}
            disabled={!email || !password}
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
