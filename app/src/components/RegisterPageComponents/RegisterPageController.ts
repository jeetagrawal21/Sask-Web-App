/**
 * Check if the format of a given email is valid.
 * @param email email string entered by the user
 * @returns true if the email provided by the user matches the description provided in the function
*/
function checkEmail(email: string) {
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
   Purpose: Checks if the format of a given name is valid.
   Precondition: name: string entered by the user
   PostCondition: None
   Return: true if the name provided by the user matches the description provided in the function  
*/
function checkName(name: string) {
  const nameRegex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{1,}$/;
  return nameRegex.test(name);
}

/**
   Purpose: Checks if the format of a given question is valid.
   Precondition: question: string entered by the user
   PostCondition: None
   Return: true if the question provided by the user matches the description provided in the function  
*/
function checkSecurityQuestion(question: string) {
  const securityQuestionRegex = /^.+\?$/;
  return securityQuestionRegex.test(question);
}

/**
   Purpose: Checks if the format of a given answer is valid.
   Precondition: answer: string entered by the user
   PostCondition: None
   Return: true if the answer provided by the user matches the description provided in the function  
*/
function checkSecurityAnswer(answer: string) {
  const securityAnswerRegex = /^[a-zA-Z0-9\s]{1,30}$/;
  return securityAnswerRegex.test(answer);
}

/**
   Purpose: Disables a button if the requirements specified are not fulfilled
   Precondition: names: List of names,  email: email string entered by the user, password: password string entered by the user,
                  securityQuestions: List of security questions, securityAnswers: List of security answers from the user
   PostCondition: None
   Return: true if any of the inputs do not meet the requirement   
*/
function handleDisable(
  names: string[],
  password: string,
  email: string,
  securityQuestions: string[],
  securityAnswers: string[]
) {
  let result =
    checkEmail(email) &&
    checkPassword(password) &&
    checkName(names[0]) &&
    checkName(names[1]) &&
    checkName(names[2]) &&
    checkSecurityQuestion(securityQuestions[0]) &&
    checkSecurityQuestion(securityQuestions[1]) &&
    checkSecurityQuestion(securityQuestions[2]) &&
    checkSecurityAnswer(securityAnswers[0]) &&
    checkSecurityAnswer(securityAnswers[1]) &&
    checkSecurityAnswer(securityAnswers[2]);

  return !result;
}

export { checkName, checkSecurityQuestion, checkSecurityAnswer, handleDisable, checkEmail, checkPassword };
