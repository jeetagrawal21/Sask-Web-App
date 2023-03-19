import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/**
   Checks if the given email is valid. It takes the parameter and compares it with emailRegex to see if it fits the description.
   Email should not have any spaces before or after you type and it should have a single "@" character and it can end in any domain (protonmail.com, protonmail.de, gmail.com, gmail.in) but it cannot have more than 3 letters after the '.'
*/
function checkEmail(email: string) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

/**
 Checks if the given password is valid. It takes the parameter and compares it with passwordRegex to see if it fits the description.
 Password should be a minimum of 8 characters with at least one lowercase letter, one uppercase letter, one number and one special character
*/
function checkPassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
/**
This function handles the disabling and enabling the sign in button in regards to the input given in email and password fields.
if all the fields are correct and validated, it should return false, meaning that the button should not be disabled
*/
function handleDisable(email: string, password: string): boolean {
  let result = checkEmail(email) && checkPassword(password);
  return !result;
}

export { checkEmail, checkPassword, handleDisable };
