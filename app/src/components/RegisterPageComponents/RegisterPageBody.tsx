import '../../stylings/RegisterPageStyles/Text.css';
import axios from 'axios';
import React, { Component, useState } from 'react';
import {
  checkEmail,
  checkPassword,
} from '../WelcomePageComponents/Controller/SignInController';
import {
  checkName,
  checkSecurityQuestion,
  checkSecurityAnswer,
  handleDisable,
} from './RegisterPageController';

/**
 * Purpose: send post request with user registration data to backend and receives a response on if the registration was valid
 * Preconditions: user input fields as strings
 * Postconditions:
 * Return: None
 */
function RegisterPageBody() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion1, setSecurityQuestion1] = useState('');
  const [securityQuestion2, setSecurityQuestion2] = useState('');
  const [securityQuestion3, setSecurityQuestion3] = useState('');
  const [securityAnswer1, setSecurityAnswer1] = useState('');
  const [securityAnswer2, setSecurityAnswer2] = useState('');
  const [securityAnswer3, setSecurityAnswer3] = useState('');
  const [surname, setSurname] = useState('');
  const [givenName1, setGivenName1] = useState('');
  const [givenName2, setGivenName2] = useState('');

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
            placeholder="Enter your surname*"
            id="surname"
            type="text"
            // value={name}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          ></input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!checkName(surname) && surname !== '' && (
          <>
            <p>
              Please enter a valid surname. It must not be less than 1 character
            </p>
          </>
        )}

        {/* Textfield to enter Given name 1 */}
        <div>
          <input
            placeholder="Enter your Given Name 1*"
            id="givenName1"
            type="text"
            // value={name}
            onChange={(e) => {
              setGivenName1(e.target.value);
            }}
          ></input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!checkName(givenName1) && givenName1 !== '' && (
          <>
            <p>Please enter a Name. It must not be less than 1 character</p>
          </>
        )}

        {/* Textfield to enter Given name 2 */}
        <div>
          <input
            placeholder="Enter your Given Name 2*"
            id="givenName2"
            type="text"
            // value={name}
            onChange={(e) => {
              setGivenName2(e.target.value);
            }}
          ></input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!checkName(givenName2) && givenName2 !== '' && (
          <>
            <p>Please enter a Name. It must not be less than 1 character</p>
          </>
        )}

        {/* Textfield to enter email */}
        <div className="Email">
          <input
            placeholder="Enter your email*"
            // className="input-fields"
            id="email"
            value={email}
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

        {/* Textfield to enter password */}
        <div>
          <input
            placeholder="Enter your password*"
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
              and must include a special character
            </p>
          </>
        )}

        {/* Textfield to confirm password */}
        <div>
          <input
            placeholder="Confirm your password*"
            id="confirm-password"
          ></input>
        </div>

        <div className="security-questions">
          {/* Textfield to enter First security question */}
          <div>
            <input
              placeholder="Enter security question 1*"
              id="securityQuestion1"
              // value={securityQuestion}
              onChange={(e) => {
                setSecurityQuestion1(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given Security question is not valid, this will display an error message. */}
          {!checkSecurityQuestion(securityQuestion1) &&
            securityQuestion1 !== '' && (
              <>
                <p>
                  Please enter a security question. It cannot be blank and it
                  should have a question mark at the end!
                </p>
              </>
            )}

          {/* Textfield to enter First security answer */}
          <div>
            <input
              placeholder="Enter security answer 1*"
              id="securityAnswer1"
              // value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer1(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
          {!checkSecurityAnswer(securityAnswer1) && securityAnswer1 !== '' && (
            <>
              <p>
                Please enter a valid security answer. It cannot be blank and it
                should not be more than 30 characters
              </p>
            </>
          )}

          {/* Textfield to enter second security question */}
          <div>
            <input
              placeholder="Enter security question 2*"
              id="securityQuestion2"
              // value={securityQuestion}
              onChange={(e) => {
                setSecurityQuestion2(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
          {!checkSecurityQuestion(securityQuestion2) &&
            securityQuestion2 !== '' && (
              <>
                <p>
                  Please enter a security question. It cannot be blank and it
                  should have a question mark at the end!
                </p>
              </>
            )}

          {/* Textfield to enter second security answer */}
          <div>
            <input
              placeholder="Enter security answer 2*"
              id="securityAnswer2"
              // value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer2(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
          {!checkSecurityAnswer(securityAnswer2) && securityAnswer2 !== '' && (
            <>
              <p>
                Please enter a valid security answer. It cannot be blank and it
                should not be more than 30 characters
              </p>
            </>
          )}

          {/* Textfield to enter third security question */}
          <div>
            <input
              placeholder="Enter security question 3*"
              id="securityQuestion3"
              // value={securityQuestion}
              onChange={(e) => {
                setSecurityQuestion3(e.target.value);
              }}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
          {!checkSecurityQuestion(securityQuestion3) &&
            securityQuestion3 !== '' && (
              <>
                <p>
                  Please enter a security question. It cannot be blank and it
                  should have a question mark at the end!
                </p>
              </>
            )}

          {/* Textfield to enter third security answer */}
          <div>
            <input
              placeholder="Enter security answer 3*"
              id="securityAnswer3"
              // value={securityAnswer}
              onChange={(e) => {
                setSecurityAnswer3(e.target.value);
              }}
            ></input>
          </div>
        </div>

        {/* If the given security answer is not valid, this will display an error message. */}
        {!checkSecurityAnswer(securityAnswer3) && securityAnswer3 !== '' && (
          <>
            <p>
              Please enter a valid security answer. It cannot be blank and it
              should not be more than 30 characters
            </p>
          </>
        )}

        <div className="register-page-button-div">
        <button
          onClick={handleSubmit}
          className="signin-button"
          type="submit"
        >
          REGISTER
        </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPageBody;
