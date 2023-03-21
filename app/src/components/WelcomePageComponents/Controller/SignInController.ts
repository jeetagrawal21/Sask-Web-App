import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
   Purpose: Checks if the format of a given email is valid.
   Precondition: email: email string entered by the user
   PostCondition: None
   Return: true if the email provided by the user matches the description provided in the function  
*/
function checkEmail(email: string) {
  //Email should not have any spaces before or after you type and it should have a single "@" character and it can end in any domain (protonmail.com, protonmail.de, gmail.com, gmail.in) but it cannot have more than 3 letters after the '.'
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

/**
   Purpose: Checks if the format of a given password is valid.
   Precondition: password: password string entered by the user
   PostCondition: None
   Return: true if the password provided by the user matches the description provided in the function  
*/
function checkPassword(password: string) {
  //Password should be a minimum of 8 characters with at least one number and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
   Purpose: Disables a button if the requirements specified are not fulfilled
   Precondition: email: password string entered by the user, password: password string entered by the user
   PostCondition: None
   Return: true if any of the inputs do not meet the requirement   
*/
function handleDisable(email: string, password: string): boolean {
  let result = checkEmail(email) && checkPassword(password);
  return !result;
}

export { checkEmail, checkPassword, handleDisable };
