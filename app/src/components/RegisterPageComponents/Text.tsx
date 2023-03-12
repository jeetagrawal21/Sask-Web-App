import '../../stylings/RegisterPageStyles/Text.css';
import axios from 'axios';
import React, { Component, useState } from 'react';


// post request using axios to post user registration data
function Text() {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidSecurityQuestion1, setIsValidSecurityQuestion1] = useState(false);
  const [isValidSecurityQuestion2, setIsValidSecurityQuestion2] = useState(false);
  const [isValidSecurityQuestion3, setIsValidSecurityQuestion3] = useState(false);
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityQuestion3, setSecurityQuestion3] = useState("");

  const [isValidSecurityAnswer1, setIsValidSecurityAnswer1] = useState(false);
  const [isValidSecurityAnswer2, setIsValidSecurityAnswer2] = useState(false);
  const [isValidSecurityAnswer3, setIsValidSecurityAnswer3] = useState(false);
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [securityAnswer3, setSecurityAnswer3] = useState("");

  const [isValidSurname, setIsValidSurname] = useState(false);
  const [isValidGivenName1, setIsValidGivenName1] = useState(false);
  const [isValidGivenName2, setIsValidGivenName2] = useState(false);

  const [surname, setSurname] = useState("");
  const [givenName1, setGivenName1] = useState("");
  const [givenName2, setGivenName2] = useState("");

  function checkEmail(e:any){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(e.target.value);
    setIsValidEmail(emailRegex.test(e.target.value));
  }

  function checkPassword(e:any){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(e.target.value);
    setIsValidPassword(passwordRegex.test(e.target.value));
  }

  function checkSurname(e:any) {
    const SurnameRegex=/^[a-zA-Z\s]{1,}$/;
    setSurname(e.target.value);
    setIsValidSurname(SurnameRegex.test(e.target.value));
  }

  function checkName(e:any){
    const nameRegex=/^[a-zA-Z\s]{1,}$/;
    setGivenName1(e.target.value);
    setGivenName2(e.target.value);
    setIsValidGivenName1(nameRegex.test(e.target.value));
    setIsValidGivenName2(nameRegex.test(e.target.value));
  }

  function checkSecurityQuestion1(e:any){
    const securityQuestionRegex=/^.+\?$/;
    setSecurityQuestion1(e.target.value);
    setIsValidSecurityQuestion1(securityQuestionRegex.test(e.target.value));
  }

  function checkSecurityAnswer1(e:any){
    const securityAnswerRegex=/^[a-zA-Z0-9\s]{1,20}$/;
    setSecurityAnswer1(e.target.value);
    setIsValidSecurityAnswer1(securityAnswerRegex.test(e.target.value));
  }
  
  function checkSecurityQuestion2(e:any){
    const securityQuestionRegex=/^.+\?$/;
    setSecurityQuestion2(e.target.value);
    setIsValidSecurityQuestion2(securityQuestionRegex.test(e.target.value));
  }

  function checkSecurityAnswer2(e:any){
    const securityAnswerRegex=/^[a-zA-Z0-9\s]{1,20}$/;
    setSecurityAnswer2(e.target.value);
    setIsValidSecurityAnswer2(securityAnswerRegex.test(e.target.value));
  }

  function checkSecurityQuestion3(e:any){
    const securityQuestionRegex=/^.+\?$/;
    setSecurityQuestion3(e.target.value);
    setIsValidSecurityQuestion3(securityQuestionRegex.test(e.target.value));
  }
  
  function checkSecurityAnswer3(e:any){
    const securityAnswerRegex=/^[a-zA-Z0-9\s]{1,20}$/;
    setSecurityAnswer3(e.target.value);
    setIsValidSecurityAnswer3(securityAnswerRegex.test(e.target.value));
  }

  function handleDisable():boolean{
    let result=!isValidEmail || !isValidPassword || !isValidGivenName1 || !isValidGivenName2 || !isValidSurname || !isValidSecurityQuestion1 || !isValidSecurityQuestion2 || !isValidSecurityQuestion3 || !isValidSecurityAnswer1 || !isValidSecurityAnswer2 || !isValidSecurityAnswer3;
    return result;
  }

  function postRegistrationData() {
    // checks if the passwords put in password and confirm password fields are exactly the same
    if (
      (document.getElementById('password') as HTMLInputElement).value ===
      (document.getElementById('confirm') as HTMLInputElement).value
    ) {
    const participantInfo = {
      surname: (document.getElementById('surname') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      givenName1: (document.getElementById('givenName1') as HTMLInputElement)
        .value,
      givenName2: (document.getElementById('givenName2') as HTMLInputElement)
        .value,
      question1: (
        document.getElementById('securityQuestion1') as HTMLInputElement
      ).value,
      question2: (
        document.getElementById('securityQuestion2') as HTMLInputElement
      ).value,
      question3: (
        document.getElementById('securityQuestion3') as HTMLInputElement
      ).value,
      answer1: (document.getElementById('securityAnswer1') as HTMLInputElement)
        .value,
      answer2: (document.getElementById('securityAnswer2') as HTMLInputElement)
        .value,
      answer3: (document.getElementById('securityAnswer3') as HTMLInputElement)
        .value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };
    // send the participant data to the backend using an axios post request
    axios
      .post('http://localhost:3000/postregistrationinfo', participantInfo)
      .then((response) => {});
    } else {
      alert('Error, password is not consistent in both fields');
    }
  }
  return (
    <div className="register">
      <form>
        {/* Textfield to enter surname */}
        <div>
          <input placeholder="Enter your surname*" id="surname" type="text" value={surname} onChange={(e) => {checkSurname(e)}}>  
          </input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!isValidSurname && surname!=="" &&<>
        <p>Please enter a valid surname. It must not be less than 1 characters and cannot include numbers or special characters</p></>}

        {/* Textfield to enter Given name 1 */}
        <div>
          <input placeholder="Enter your Given Name 1*" id="givenName1" type="text" value={givenName1} onChange={(e) => {checkName(e)}}></input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!isValidGivenName1 && givenName1!=="" &&<>
        <p>Please enter a Name. It must not be less than 1 characters and cannot include numbers or special characters</p></>}

        {/* Textfield to enter Given name 2 */}
        <div>
          <input placeholder="Enter your Given Name 2*" id="givenName2"></input>
        </div>

        {/* If the given name is not valid, this will display an error message. */}
        {!isValidGivenName2 && givenName2!=="" &&<>
        <p>Please enter a Name. It must not be less than 1 characters and cannot include numbers or special characters</p></>}

        {/* Textfield to enter email */}
        <div className="Email">
          <input placeholder="Enter your email*" 
          // className="input-fields" 
          id="email" 
          value={email} 
          onChange={(e) => {checkEmail(e)}}></input>
        </div>

        {/* If the given email is not valid, this will display an error message. */}
        {!isValidEmail && email!=="" ?<>
        <p>Please enter a valid email</p></>:<></>}

        {/* Textfield to enter password */}
        <div>
          <input placeholder="Enter your password*" id="password" value={password} onChange={(e) => {checkPassword(e)}}></input>
        </div>

        {/* If the typed password does not meet the criteria, this will display an error message. */}
        {!isValidPassword && password!=="" &&<>
        <p>Please enter valid password. It must not be less than 8 characters and must include a special character</p></>}

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
              value={securityQuestion1} 
              onChange={(e) => {checkSecurityQuestion1(e)}}
            ></input>
          </div>

        {/* If the given Security question is not valid, this will display an error message. */}
        {!isValidSecurityQuestion1 && securityQuestion1!=="" &&<>
        <p>Please enter a security question. It cannot be blank and it should have a question mark at the end!</p></>}

          {/* Textfield to enter First security answer */}
          <div>
            <input
              placeholder="Enter security answer 1*"
              id="securityAnswer1"
              value={securityAnswer1} 
              onChange={(e) => {checkSecurityAnswer1(e)}}
            ></input>
          </div>

        {/* If the given security answer is not valid, this will display an error message. */}
        {!isValidSecurityAnswer1 && securityAnswer1!=="" &&<>
        <p>Please enter a valid security answer. It cannot be blank and it should only be upto 20 characters!</p></>}

          {/* Textfield to enter second security question */}
          <div>
            <input
              placeholder="Enter security question 2*"
              id="securityQuestion2"
              value={securityQuestion2} 
              onChange={(e) => {checkSecurityQuestion2(e)}}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
        {!isValidSecurityQuestion2 && securityQuestion2!=="" &&<>
        <p>Please enter a security question. It cannot be blank and it should have a question mark at the end!</p></>}

          {/* Textfield to enter second security answer */}
          <div>
            <input
              placeholder="Enter security answer 2*"
              id="securityAnswer2"
              value={securityAnswer2} 
              onChange={(e) => {checkSecurityAnswer2(e)}}
            ></input>
          </div>

          {/* If the given security answer is not valid, this will display an error message. */}
        {!isValidSecurityAnswer2 && securityAnswer2!=="" &&<>
        <p>Please enter a valid security answer. It cannot be blank and it should only be upto 20 characters!</p></>}

          {/* Textfield to enter third security question */}
          <div>
            <input
              placeholder="Enter security question 3*"
              id="securityQuestion3"
              value={securityQuestion3} 
              onChange={(e) => {checkSecurityQuestion3(e)}}
            ></input>
          </div>

          {/* If the given name is not valid, this will display an error message. */}
        {!isValidSecurityQuestion3 && securityQuestion3!=="" &&<>
        <p>Please enter a security question. It cannot be blank and it should have a question mark at the end!</p></>}

          {/* Textfield to enter third security answer */}
          <div>
            <input
              placeholder="Enter security answer 3*"
              id="securityAnswer3"
              value={securityAnswer3} 
              onChange={(e) => {checkSecurityAnswer3(e)}}
            ></input>
          </div>
        </div>

        {/* If the given security answer is not valid, this will display an error message. */}
        {!isValidSecurityAnswer3 && securityAnswer3!=="" &&<>
        <p>Please enter a valid security answer. It cannot be blank and it should only be upto 20 characters!</p></>}

        <div className="register-page-button-div">
          <button disabled={handleDisable()} className="signin-button" onClick={postRegistrationData}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
  
}

export default Text;
