/**
 * Check if the format of a given email is valid.
 * @param email email string entered by the user
 * @returns true if the email provided by the user matches the description provided in the function
*/
function checkEmail(email: string) {
  //Email should not have any spaces before or after you type and it should have a single "@" character and it can end in any domain (protonmail.com, protonmail.de, gmail.com, gmail.in) but it cannot have more than 3 letters after the '.'
  const emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]{2,3}\s*$/;
  return emailRegex.test(email);
}

/**
 * Checks if the format of a given password is valid. 
 * @param password password string entered by the user
 * @returns true if the password provided by the user matches the description provided in the function
 */
function checkPassword(password: string): boolean {
  let count = 0;

  if (password.length >= 8 && password.length <= 32) {
    if (/\d/.test(password)) count++;
    if (/[a-z]/.test(password)) count++;
    if (/[A-Z]/.test(password)) count++;
    if (/[*.!@#$%^&(){}\[\]:;"'<>,.?\/~`_+\-=|\\]/.test(password)) count++;
  }

  return count >= 3;
}

/**
  * Checks if the email and password are valid and returns the opposite of that.
  * @param email email string entered by the user
  * @param password password string entered by the user
  * @returns true if the email and password are valid, false otherwise
  */
function handleDisable(email: string, password: string): boolean {
  let result = checkEmail(email) && checkPassword(password);
  return !result;
}

export { checkEmail, checkPassword, handleDisable };
