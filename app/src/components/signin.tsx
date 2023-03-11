import "../stylings/signin.css";
import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import log from "loglevel";

function SignIn() {
  const navigate = useNavigate();

  function authenticateLogin() {
    log.error("This is an error");
    log.warn("This is a warning");
    log.info("This is an info");
    log.debug("This is a debug");
    log.trace("This is a trace");
    const participantInfo = {
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };

    axios
      .post("http://localhost:3000/login", participantInfo)
      .then((response) => {
        if (response.data.exist) {
          console.log(response.data.exist);
          navigate("Dashboard");
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
          <button
            type="button"
            className="signin-button"
            onClick={authenticateLogin}
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
