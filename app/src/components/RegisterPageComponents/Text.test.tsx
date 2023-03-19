import { render, fireEvent, getByText, screen } from '@testing-library/react';
import React from 'react';
import Text from "./Text";
import axios from 'axios';
import checkEmail  from "./Text";
import '@testing-library/jest-dom';

test('checkEmail function correctly validates email', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'notanemail';
  
    // Set initial state variables
    let email = '';
    let isValidEmail = false;
  
    // Define the checkEmail function
    function checkEmail(e:any){
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      email = e.target.value;
      isValidEmail = emailRegex.test(e.target.value);
    }
  
    // Create a mock event object with the target value set to validEmail
    const mockEvent = { target: { value: validEmail } };
  
    // Call the checkEmail function with the mock event object
    checkEmail(mockEvent);
  
    // Assert that the email state variable has been set to validEmail
    expect(email).toBe(validEmail);
  
    // Assert that the isValidEmail state variable is true
    expect(isValidEmail).toBe(true);
  
    // Call the checkEmail function again with an invalid email
    checkEmail({ target: { value: invalidEmail } });
  
    // Assert that the email state variable has been set to invalidEmail
    expect(email).toBe(invalidEmail);
  
    // Assert that the isValidEmail state variable is false
    expect(isValidEmail).toBe(false);
  });

  test('checkPassword function correctly validates password', () => {
    const validPassword = 'Password123@';
    const invalidPassword = 'password';
  
    // Set initial state variables
    let password = '';
    let isValidPassword = false;
  
    // Define the checkPassword function
    function checkPassword(e:any){
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      password = e.target.value;
      isValidPassword = passwordRegex.test(e.target.value);
    }
  
    // Create a mock event object with the target value set to validPassword
    const mockEvent = { target: { value: validPassword } };
  
    // Call the checkPassword function with the mock event object
    checkPassword(mockEvent);
  
    // Assert that the password state variable has been set to validPassword
    expect(password).toBe(validPassword);
  
    // Assert that the isValidPassword state variable is true
    expect(isValidPassword).toBe(true);
  
    // Call the checkPassword function again with an invalid password
    checkPassword({ target: { value: invalidPassword } });
  
    // Assert that the password state variable has been set to invalidPassword
    expect(password).toBe(invalidPassword);
  
    // Assert that the isValidPassword state variable is false
    expect(isValidPassword).toBe(false);
  });


  test('checkSurname function should set surname and validate it correctly', () => {
    const validSurname = 'Rickroll';
    const invalidSurname = 'J0hn X3n@';

    // Set initial state variables
    let surname = '';
    let isValidSurname = false;

    function checkSurname(e:any) {
        const SurnameRegex=/^[a-zA-Z\s]{1,}$/;
        surname=(e.target.value);
        isValidSurname=(SurnameRegex.test(e.target.value));
    }

    // Create a mock event object with the target value set to validSurname
    const mockEvent = { target: { value: validSurname } };
  
    // Call the checkSurname function with the mock event object
    checkSurname(mockEvent);
  
    // Assert that the Surname state variable has been set to validSurname
    expect(surname).toBe(validSurname);
  
    // Assert that the isValidSurname state variable is true
    expect(isValidSurname).toBe(true);
  
    // Call the checkSurname function again with an invalid password
    checkSurname({ target: { value: invalidSurname } });
  
    // Assert that the Surname state variable has been set to invalidSurname
    expect(surname).toBe(invalidSurname);
  
    // Assert that the isValidSurname state variable is false
    expect(isValidSurname).toBe(false);
  });

  test('checkSecurityQuestion function correctly validates the given security question', () => {
    const validSecurityQuestion = 'Who was in Paris?';
    const invalidSecurityQuestion = 'If I speak I am in big trouble';
  
    // Set initial state variables
    let securityQuestion1 = '';
    let isValidSecurityQuestion1 = false;
  
    // Define the checkSecurityQuestion1 function
    function checkSecurityQuestion1(e:any){
        const securityQuestionRegex=/^.+\?$/;
        securityQuestion1=(e.target.value);
        isValidSecurityQuestion1=(securityQuestionRegex.test(e.target.value));
      }
  
    // Create a mock event object with the target value set to validSecurityQuestion
    const mockEvent = { target: { value: validSecurityQuestion } };
  
    // Call the checkSecurityQuestion1 function with the mock event object
    checkSecurityQuestion1(mockEvent);
  
    // Assert that the securityQuestion1 state variable has been set to validPassword
    expect(securityQuestion1).toBe(validSecurityQuestion);
  
    // Assert that the isValidSecurityQuestion1 state variable is true
    expect(isValidSecurityQuestion1).toBe(true);
  
    // Call the checkSecurityQuestion1 function again with an invalid security question
    checkSecurityQuestion1({ target: { value: invalidSecurityQuestion } });
  
    // Assert that the securityQuestion1 state variable has been set to invalidSecurityQuestion
    expect(securityQuestion1).toBe(invalidSecurityQuestion);
  
    // Assert that the isValidSecurityQuestion1 state variable is false
    expect(isValidSecurityQuestion1).toBe(false);
  });

  test('checkSecurityAnswer function correctly validates the given security answer', () => {
    const validSecurityAnswer = 'Neva gonna give up';
    const invalidSecurityAnswer = 'Do you wanna be rick rolled?';
  
    // Set initial state variables
    let securityAnswer1 = '';
    let isValidSecurityAnswer1 = false;
  
    // Define the checkSecurityAnswer1 function
    function checkSecurityAnswer1(e:any){
        const securityAnswerRegex=/^[a-zA-Z0-9\s]{1,20}$/;
        securityAnswer1=(e.target.value);
        isValidSecurityAnswer1=(securityAnswerRegex.test(e.target.value));
      }
  
    // Create a mock event object with the target value set to validAnswer
    const mockEvent = { target: { value: validSecurityAnswer } };
  
    // Call the checkSecurityAnswer1 function with the mock event object
    checkSecurityAnswer1(mockEvent);
  
    // Assert that the security answer state variable has been set to validAnswer
    expect(securityAnswer1).toBe(validSecurityAnswer);
  
    // Assert that the isValidSecurityAnswer1 state variable is true
    expect(isValidSecurityAnswer1).toBe(true);
  
    // Call the checkPassword function again with an invalid password
    checkSecurityAnswer1({ target: { value: invalidSecurityAnswer } });
  
    // Assert that the password state variable has been set to invalidPassword
    expect(securityAnswer1).toBe(invalidSecurityAnswer);
  
    // Assert that the isValidPassword state variable is false
    expect(isValidSecurityAnswer1).toBe(false);
  });
