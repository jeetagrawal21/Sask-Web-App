// <<<<<<< HEAD
import '../stylings/signin.css';
import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//Used React useState to check if the Email and password are valid. It is set to false and it will change once the desired input is given.
function SignIn() {
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Checks if the given email is valid. It takes the parameter and compares it with emailRegex to see if it fits the description.
  //Email should not have any spaces before or after you type and it should have a single "@" character and it can end in any domain (protonmail.com, protonmail.de, gmail.com, gmail.in) but it cannot have more than 3 letters after the '.'
  function checkEmail(e:any){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(e.target.value);
    setIsValidEmail(emailRegex.test(
      e.target.value
    ));
  }

  //Checks if the given password is valid. It takes the parameter and compares it with passwordRegex to see if it fits the description.
  //Password should be a minimum of 8 characters with at least one lowercase letter, one uppercase letter, one number and one special character
  function checkPassword(e:any){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(e.target.value);
    setIsValidPassword(passwordRegex.test(
      e.target.value
    ));
  }

  function authenticateLogin() {
    const participantInfo = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement)
        .value,
    };

    //Kept one more navigate to dashboard outside so that it will redirect the user to dashboard once they enter the correct input and makes sure it does not redirect in case if they don't give the correct input
    // navigate("/Dashboard");
    
    axios
      .post("http://localhost:3000/login", participantInfo)
      .then((response) => {
        // alert("I AM RESPONDING");
        if (response.data.exist) {
          console.log(response.data.exist);
          if(response.data.isadmin){
            navigate("AdminPage");
          }else{
            navigate("Dashboard");
          }
        }else {
          alert("User/Password Doesn't exist");
        }
      });
  }

  //This function handles the disabling and enabling the sign in button in regards to the input given in email and password fields.
  function handleDisable():boolean{
    let result=!isValidEmail || !isValidPassword;
    return result;
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
            onChange={(e) => {checkEmail(e)}}
          ></input>
        </div>
        
        {/* If the given email is not valid, this will display an error message. */}
        {!isValidEmail && email!=="" ?<>
        <p>Please enter a valid email</p></>:<></>}

        <div className="password">
          <input
            type="password"
            className="input-fields"
            placeholder="Password*"
            id="password"
            value={password}
            onChange={(e) => {checkPassword(e)}}
          ></input>
        </div>
        
        {/* If the typed password does not meet the criteria, this will display an error message. */}
        {!isValidPassword && password!=="" &&<>
        <p>Please enter valid password. It must not be less than 8 characters and must include a special character</p></>}

        {/* The sign in button is disabled by default so that the user cannot be redirected or go to the dashboard if they give the wrong details */}
        <div className="button-div">
          <button disabled={handleDisable()}
            type="button"
            className="signin-button" 
            onClick={authenticateLogin}>
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
