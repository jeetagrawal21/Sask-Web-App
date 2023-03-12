import '../../stylings/RegisterPageStyles/Text.css';
import axios from 'axios';
import React from 'react';


// post request using axios to post user registration data
function Text() {
  function postRegistrationData() {
    // checks if the passwords put in password and confirm password fields are exactly the same
    // if (
    //   (document.getElementById('password') as HTMLInputElement).value ===
    //   (document.getElementById('confirm') as HTMLInputElement).value
    // ) {
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
    // } else {
    //   alert('Error, password is not consistent in both fields');
    // }
  }
  return (
    <div className="register">
      <form>
        {/* Textfield to enter surname */}
        <div>
          <input placeholder="Enter your surname" id="surname"></input>
        </div>

        {/* Textfield to enter Given name 1 */}
        <div>
          <input placeholder="Enter your Given Name 1" id="givenName1"></input>
        </div>

        {/* Textfield to enter Given name 2 */}
        <div>
          <input placeholder="Enter your Given Name 2" id="givenName2"></input>
        </div>

        {/* Textfield to enter email */}
        <div>
          <input placeholder="Enter your email" id="email" type="text"></input>
        </div>

        {/* Textfield to enter password */}
        <div>
          <input placeholder="Enter your password" id="password"></input>
        </div>

        {/* Textfield to confirm password */}
        <div>
          <input
            placeholder="Confirm your password"
            id="confirm-password"
          ></input>
        </div>

        <div className="security-questions">
          {/* Textfield to enter First security question */}
          <div>
            <input
              placeholder="Enter security question 1"
              id="securityQuestion1"
            ></input>
          </div>

          {/* Textfield to enter First security answer */}
          <div>
            <input
              placeholder="Enter security answer 1"
              id="securityAnswer1"
            ></input>
          </div>

          {/* Textfield to enter second security question */}
          <div>
            <input
              placeholder="Enter security question 2"
              id="securityQuestion2"
            ></input>
          </div>

          {/* Textfield to enter second security answer */}
          <div>
            <input
              placeholder="Enter security answer 2"
              id="securityAnswer2"
            ></input>
          </div>

          {/* Textfield to enter third security question */}
          <div>
            <input
              placeholder="Enter security question 3"
              id="securityQuestion3"
            ></input>
          </div>

          {/* Textfield to enter third security answer */}
          <div>
            <input
              placeholder="Enter security answer 3"
              id="securityAnswer3"
            ></input>
          </div>
        </div>

        <div className="register-page-button-div">
          <button className="signin-button" onClick={postRegistrationData}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Text;
