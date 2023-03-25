import "../../stylings/RegisterPageStyles/Text.css";
import axios from "axios";
import React, { Component, useState } from "react";
import {
  checkName,
  checkSecurityQuestion,
  checkSecurityAnswer,
  handleDisable,
  checkEmail,
  checkPassword,
} from "./RegisterPageController";

/**
 * Send the registration data to the backend after validation
 * @returns {JSX.Element} - Register page body
 */
function RegisterPageBody() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityQuestion3, setSecurityQuestion3] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [securityAnswer3, setSecurityAnswer3] = useState("");
  const [surname, setSurname] = useState("");
  const [givenName1, setGivenName1] = useState("");
  const [givenName2, setGivenName2] = useState("");

  /**
   * Send post request with registration data to backend and receives a response on if the user is valid,
   * then takes them to the appropriate page
   */
  function postRegistrationData() {
    // checks if the passwords put in password and confirm password fields are exactly the same
    const participantInfo = {
      surname: (document.getElementById("surname") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      givenName1: (document.getElementById("givenName1") as HTMLInputElement)
        .value,
      givenName2: (document.getElementById("givenName2") as HTMLInputElement)
        .value,
      question1: (
        document.getElementById("securityQuestion1") as HTMLInputElement
      ).value,
      question2: (
        document.getElementById("securityQuestion2") as HTMLInputElement
      ).value,
      question3: (
        document.getElementById("securityQuestion3") as HTMLInputElement
      ).value,
      answer1: (document.getElementById("securityAnswer1") as HTMLInputElement)
        .value,
      answer2: (document.getElementById("securityAnswer2") as HTMLInputElement)
        .value,
      answer3: (document.getElementById("securityAnswer3") as HTMLInputElement)
        .value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };
    // send the participant data to the backend using an axios post request
    axios
      .post("http://localhost:3000/postregistrationinfo", participantInfo)
      .then((response) => {});
  }

  return (
    <div className="register">
      <form>
        <div>
          <input
            placeholder="Surname *"
            id="surname"
            type="text"
            // value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          ></input>
        </div>

        {/* Validate surname */}
        {!checkName(surname) && surname !== "" ? (
          <>
            <p>Please enter a valid name.</p>
          </>
        ) : (
          <></>
        )}

        <div>
          <input
            placeholder="Given Name 1"
            id="givenName1"
            type="text"
            onChange={(e) => {
              setGivenName1(e.target.value);
            }}
          ></input>
        </div>

        {/* Validate given name 1 */}
        {!checkName(givenName1) && givenName1 !== "" ? (
          <>
            <p>Please enter a valid name.</p>
          </>
        ) : (
          <></>
        )}

        <div>
          <input
            placeholder="Given Name 2"
            id="givenName2"
            type="text"
            // value={name}
            onChange={(e) => {
              setGivenName2(e.target.value);
            }}
          ></input>
        </div>

        {/* Validate given name 2 */}
        {!checkName(givenName2) && givenName2 !== "" ? (
          <>
            <p>Please enter a valid name.</p>
          </>
        ) : (
          <></>
        )}

        <div className="Email">
          <input
            placeholder="Email *"
            // className="input-fields"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        {/* If the given email is not valid, this will display an error message. */}
        {!checkEmail(email) && email !== "" ? (
          <>
            <p>Please enter a valid email.</p>
          </>
        ) : (
          <></>
        )}

        <div>
          <input
            placeholder="Password *"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        {/* Validate password */}
        {!checkPassword(password) && password !== "" ? (
          <>
            <p>Please enter a valid password.</p>
          </>
        ) : (
          <></>
        )}

        <div>
          <input
            placeholder="Confirm Password *"
            id="confirm-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
        </div>

        {/* Ensure password and confirmPassword matches */}
        {password !== confirmPassword && confirmPassword !== "" ? (
          <>
            <p>Passwords do not match.</p>
          </>
        ) : (
          <></>
        )}

        <div className="security-questions">
          <div>
            <input
              placeholder="Security Question 1 *"
              id="securityQuestion1"
              onChange={(e) => {
                setSecurityQuestion1(e.target.value);
              }}
            ></input>
          </div>

          {!checkSecurityQuestion(securityQuestion1) &&
            securityQuestion1 !== "" && (
              <>
                <p>Please enter a security question.</p>
              </>
            )}

          <div>
            <input
              placeholder="Security Answer 1 *"
              id="securityAnswer1"
              onChange={(e) => {
                setSecurityAnswer1(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
          {!checkSecurityAnswer(securityAnswer1) && securityAnswer1 !== "" && (
            <>
              <p>Please enter a valid security answer.</p>
            </>
          )}

          <div>
            <input
              placeholder="Security Question 2 *"
              id="securityQuestion2"
              // value={securityQuestion}
              onChange={(e) => {
                setSecurityQuestion2(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
          {!checkSecurityQuestion(securityQuestion2) &&
            securityQuestion2 !== "" && (
              <>
                <p>Please enter a valid security question.</p>
              </>
            )}

          <div>
            <input
              placeholder="Security Answer 2 *"
              id="securityAnswer2"
              // value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer2(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
          {!checkSecurityAnswer(securityAnswer2) && securityAnswer2 !== "" && (
            <>
              <p>Please enter a valid security answer.</p>
            </>
          )}

          <div>
            <input
              placeholder="Security Question 3 *"
              id="securityQuestion3"
              // value={securityQuestion}
              onChange={(e) => {
                setSecurityQuestion3(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
          {!checkSecurityQuestion(securityQuestion3) &&
            securityQuestion3 !== "" && (
              <>
                <p>Please enter a valid security question.</p>
              </>
            )}

          <div>
            <input
              placeholder="Security Answer 3 *"
              id="securityAnswer3"
              onChange={(e) => {
                setSecurityAnswer3(e.target.value);
              }}
            ></input>
          </div>
        </div>

        {/* If the given security answer is not valid, this will display an error message. */}
        {!checkSecurityAnswer(securityAnswer3) && securityAnswer3 !== "" && (
          <>
            <p>Please enter a valid security answer.</p>
          </>
        )}

        <div className="register-page-button-div">
          <button
            disabled={handleDisable(
              email,
              password,
              [surname, givenName1, givenName2],
              confirmPassword,
              [securityQuestion1, securityQuestion2, securityQuestion3],
              [securityAnswer1, securityAnswer2, securityAnswer3]
            )}
            className="signin-button"
            onClick={postRegistrationData}
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPageBody;
