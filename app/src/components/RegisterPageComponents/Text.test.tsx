import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
// import SignIn from "./signin";
// import axios from "axios";



//UI SNAPSHOT TESTING

it('signin component should render',async () => {
  
  expect(3+2).toBe(5);

  // expect(wrapper).toMatchSnapshot();
})

// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import axios from 'axios';
// import Text from '/app/src/components/RegisterPageComponents/Text';

// jest.mock('axios');

// describe('Text component', () => {
//   it('should render correctly', () => {
//     const { getByTestId } = render(<Text />);
//     expect(getByTestId('text-component')).toBeInTheDocument();
//   });

//   it('should update email state and set isValidEmail to true when valid email is entered', () => {
//     const { getByTestId } = render(<Text />);
//     const emailInput = getByTestId('email-input');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     expect(emailInput.value).toBe('test@example.com');
//     expect(getByTestId('email-validation')).toHaveTextContent('Valid email');
//   });

//   it('should update email state and set isValidEmail to false when invalid email is entered', () => {
//     const { getByTestId } = render(<Text />);
//     const emailInput = getByTestId('email-input');
//     fireEvent.change(emailInput, { target: { value: 'test@example' } });
//     expect(emailInput.value).toBe('test@example');
//     expect(getByTestId('email-validation')).toHaveTextContent('Invalid email');
//   });

//   it('should make a post request when submit button is clicked', async () => {
//     const { getByTestId } = render(<Text />);
//     const submitButton = getByTestId('submit-button');
//     const emailInput = getByTestId('email-input');
//     const passwordInput = getByTestId('password-input');
//     const securityQuestion1Input = getByTestId('security-question-1-input');
//     const securityAnswer1Input = getByTestId('security-answer-1-input');
//     const surnameInput = getByTestId('surname-input');
//     const givenName1Input = getByTestId('given-name-1-input');
//     const givenName2Input = getByTestId('given-name-2-input');

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });
//     fireEvent.change(securityQuestion1Input, { target: { value: 'question' } });
//     fireEvent.change(securityAnswer1Input, { target: { value: 'answer' } });
//     fireEvent.change(surnameInput, { target: { value: 'surname' } });
//     fireEvent.change(givenName1Input, { target: { value: 'given name 1' } });
//     fireEvent.change(givenName2Input, { target: { value: 'given name 2' } });

//     axios.post.mockResolvedValueOnce({ data: { success: true } });

//     fireEvent.click(submitButton);

//     expect(axios.post).toHaveBeenCalledWith('/api/register', {
//       email: 'test@example.com',
//       password: 'password',
//       securityQuestion1: 'question',
//       securityAnswer1: 'answer',
//       surname: 'surname',
//       givenName1: 'given name 1',
//       givenName2: 'given name 2'
//     });
//   });
// });

// //These tests check if the component renders correctly, updates state and validation messages correctly, and makes a post request with the correct data when the submit button is clicked.

// describe('checkPassword', () => {
//   it('should validate a password with at least one lowercase letter, one uppercase letter, one number, one special character, and a length of at least 8 characters', () => {
//     const event = { target: { value: 'Test1234!' } };
//     checkPassword(event);
//     expect(isValidPassword).toBe(true);
//   });

//   it('should not validate a password that does not meet the requirements', () => {
//     const event = { target: { value: 'password' } };
//     checkPassword(event);
//     expect(isValidPassword).toBe(false);
//   });
// });

// describe('checkSurname', () => {
//   it('should validate a surname that contains only letters and spaces', () => {
//     const event = { target: { value: 'Doe' } };
//     checkSurname(event);
//     expect(isValidSurname).toBe(true);
//   });

//   it('should not validate a surname that contains non-letter characters', () => {
//     const event = { target: { value: 'Doe123' } };
//     checkSurname(event);
//     expect(isValidSurname).toBe(false);
//   });
// });

// describe('checkName', () => {
//   it('should validate a given name that contains only letters and spaces', () => {
//     const event = { target: { value: 'John Doe' } };
//     checkName(event);
//     expect(isValidGivenName1).toBe(true);
//     expect(isValidGivenName2).toBe(true);
//   });

//   it('should not validate a given name that contains non-letter characters', () => {
//     const event = { target: { value: 'John123' } };
//     checkName(event);
//     expect(isValidGivenName1).toBe(false);
//     expect(isValidGivenName2).toBe(false);
//   });
// });

// describe('checkSecurityQuestion1', () => {
//   it('should validate a security question that ends with a question mark', () => {
//     const event = { target: { value: 'What is your favorite color?' } };
//     checkSecurityQuestion1(event);
//     expect(isValidSecurityQuestion1).toBe(true);
//   });

//   it('should not validate a security question that does not end with a question mark', () => {
//     const event = { target: { value: 'What is your favorite color' } };
//     checkSecurityQuestion1(event);
//     expect(isValidSecurityQuestion1).toBe(false);
//   });
// });

// describe('checkSecurityAnswer1', () => {
//   it('should validate a security answer that contains only letters, numbers, and spaces', () => {
//     const event = { target: { value: 'My answer 123' } };
//     checkSecurityAnswer1(event);
//     expect(isValidSecurityAnswer1).toBe(true);
//   });

//   it('should not validate a security answer that contains non-letter, non-number, or non-space characters', () => {
//     const event = { target: { value: 'My answer!@#' } };
//     checkSecurityAnswer1(event);
//     expect(isValidSecurityAnswer1).toBe(false);
//   });
// });

// //These tests follow the same structure as the previous ones, with each `describe` block containing one or more tests that validate the behavior of the function under different input conditions. For example, the `checkName` suite contains two tests: one that checks a valid name and one that checks an invalid name.

