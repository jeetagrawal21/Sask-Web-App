import "../../stylings/RegisterPageStyles/Text.css";
import axios from "axios";
import React, { Component, useState } from "react";
import {
  checkName,
  checkSecurityField,
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

  function handleSubmit() {
    const participantInfo = {
      surname,
      email,
      givenName1,
      givenName2,
      question1: securityQuestion1,
      question2: securityQuestion2,
      question3: securityQuestion3,
      answer1: securityAnswer1,
      answer2: securityAnswer2,
      answer3: securityAnswer3,
      password,
    };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/Register', participantInfo)
      .then((response) => {
      })
      .catch((error) => {
      });
  }
  

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        {/* Textfield to enter surname */}
        <div>
          <input
            placeholder="Surname *"
            id="surname"
            type="text"
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
                const value = e.target.value;
                if (value && !value.endsWith("?")) {
                  setSecurityQuestion1(value + "?");
                } else {
                  setSecurityQuestion1(value);
                }
              }}
            ></input>
          </div>

          {!checkSecurityField(securityQuestion1) &&
            securityQuestion1 !== "" && (
              <>
                <p>Please enter a valid security question.</p>
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
          {!checkSecurityField(securityAnswer1) && securityAnswer1 !== "" && (
            <>
              <p>Please enter a valid security answer.</p>
            </>
          )}

          <div>
            <input
              placeholder="Security Question 2 *"
              id="securityQuestion2"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !value.endsWith("?")) {
                  setSecurityQuestion2(value + "?");
                } else {
                  setSecurityQuestion2(value);
                }
              }}
            ></input>
          </div>

          {!checkSecurityField(securityQuestion2) &&
            securityQuestion2 !== "" && (
              <>
                <p>Please enter a valid security question.</p>
              </>
            )}

          <div>
            <input
              placeholder="Security Answer 2 *"
              id="securityAnswer2"
              onChange={(e) => {
                setSecurityAnswer2(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
          {!checkSecurityField(securityAnswer2) && securityAnswer2 !== "" && (
            <>
              <p>Please enter a valid security answer.</p>
            </>
          )}

          <div>
            <input
              placeholder="Security Question 3 *"
              id="securityQuestion3"
              onChange={(e) => {
                const value = e.target.value;
                if (value && !value.endsWith("?")) {
                  setSecurityQuestion3(value + "?");
                } else {
                  setSecurityQuestion3(value);
                }
              }}
            ></input>
          </div>

          {!checkSecurityField(securityQuestion3) &&
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

        {!checkSecurityField(securityAnswer3) && securityAnswer3 !== "" && (
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
            onClick={handleSubmit}
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPageBody;
