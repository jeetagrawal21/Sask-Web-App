/**
 * Check if the format of a given email is valid.
 * @param email email string entered by the user
 * @returns true if the email provided by the user matches the description provided in the function
 */
function checkEmail(email: string) {
  const emailRegex =
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]{2,3}\s*$/;
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
 * Check if the format of a given name is valid.
 * @param name name string entered by the user
 * @returns true if the name provided by the user matches the description provided in the function
 */
function checkName(name: string) {
  const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
  return nameRegex.test(name);
}

/**
 * Checks if the format of a given security question is valid.
 * @param question security question string entered by the user
 * @returns true if the security question provided by the user matches the description provided in the function
 */
function checkSecurityQuestion(question: string) {
  const securityQuestionRegex =
    /^(?=.*[a-zA-Z\d])(\w|[\s\.\@\-\?\,\&\/\_\#\+\(\)\"'"\'"']){3,50}$/;
  return securityQuestionRegex.test(question);
}

/**
 * Checks if the format of a given security answer is valid.
 * @param answer security answer string entered by the user
 * @returns true if the security answer provided by the user matches the description provided in the function
 */
function checkSecurityAnswer(answer: string) {
  const securityAnswerRegex =
    /^(?=.*[a-zA-Z\d])(\w|[\s\.\@\-\?\,\&\/\_\#\+\(\)\"'"\'"']){3,50}$/;
  return securityAnswerRegex.test(answer);
}

/**
 * Checks if the email, password, names, security questions, and security answers are valid and returns the opposite of that.
 * @param email email string entered by the user
 * @param password password string entered by the user
 * @param names names string array entered by the user
 * @param confirmPassword confirm password string entered by the user
 * @param securityQuestions security questions string array entered by the user
 * @param securityAnswers security answers string array entered by the user
 * @returns true if the email, password, names, security questions, and security answers are valid, false otherwise
 * @note This function can be used for both the register and sign in pages.
 */
function handleDisable(
  email: string,
  password: string,
  names?: string[],
  confirmPassword?: string,
  securityQuestions?: string[],
  securityAnswers?: string[]
) : boolean {
  let disable = !checkEmail(email) || !checkPassword(password);

  // only check the names that are longer than 0 characters
  if (names && names.some((name) => name.length > 0 && !checkName(name))) {
    disable = true;
  }

  // check if security questions/answers are present and valid
  if (
    securityQuestions &&
    securityAnswers &&
    (securityQuestions.length !== 3 ||
      securityAnswers.length !== 3 ||
      !securityQuestions.every((question) => checkSecurityQuestion(question)) ||
      !securityAnswers.every((answer) => checkSecurityAnswer(answer)))
  ) {
    disable = true;
  }

  // check if the passwords match
  if (confirmPassword && password !== confirmPassword) {
    disable = true;
  }

  return disable;
}

export {
  checkName,
  checkSecurityQuestion,
  checkSecurityAnswer,
  handleDisable,
  checkEmail,
  checkPassword,
};
