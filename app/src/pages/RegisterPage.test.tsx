import { render, fireEvent, getByText, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPageBody from "../components/RegisterPageComponents/RegisterPageBody";
import React from "react";
import RegisterPageTitle from "../components/RegisterPageComponents/RegisterPageTitle";
import axios from "axios";

import {
  checkName,
  checkSecurityField,
  handleDisable,
  checkEmail,
  checkPassword,
} from "../components/RegisterPageComponents/RegisterPageController";
import "@testing-library/jest-dom";

// Unit tests
/**
 * checkEmail tests
 */
describe("checkEmail function validates a correct email", () => {
  it("should return true for an email with the right format", () => {
    const validEmail = "test@example.com";
    // assert that the email validates correctly
    expect(checkEmail(validEmail)).toBe(true);
  });
});
describe("checkEmail function does validate an incorrect email", () => {
  it("should return false for an email with the format text.com rather than text@someemail.com", () => {
    const invalidEmail = "test.com";
    // assert that the email does not validate
    expect(checkEmail(invalidEmail)).toBe(false);
  });
  it("should return false for an email with the format text@someemail rather than text@someemail.com", () => {
    const invalidEmail = "test@example";
    // assert that the email does not validate
    expect(checkEmail(invalidEmail)).toBe(false);
  });
  it("should return false for an email with the format @someemail.com rather than text@someemail.com", () => {
    const invalidEmail = "@example.com";
    // assert that the email does not validate
    expect(checkEmail(invalidEmail)).toBe(false);
  });
});

/**
 *  checkPassword tests
 */

describe("checkPassword function validates a correct password", () => {
  it("should return true for an password with the right format", () => {
    const validPassword = "Password@123";
    // assert that the password validates correctly
    expect(checkPassword(validPassword)).toBe(true);
  });
});
describe("checkPassword function does validate an incorrect password", () => {
  it("should return false for a password less than 8 characters long", () => {
    const invalidPassword = "Pe@1";
    // assert that the password does not validate
    expect(checkPassword(invalidPassword)).toBe(false);
  });
  it("should return false for a password does not have a special character", () => {
    const invalidPassword = "Pessword1";
    // assert that the password does not validate
    expect(checkPassword(invalidPassword)).toBe(false);
  });
  it("should return false for a password does not have a number", () => {
    const invalidPassword = "Pessword@";
    // assert that the password does not validate
    expect(checkPassword(invalidPassword)).toBe(false);
  });
});

/**
 *  checkName tests
 */

describe("checkName function validates a correct name", () => {
  it("should return true for a name with the right format", () => {
    const validName = "Iamthatguy";
    // assert that the name validates correctly
    expect(checkName(validName)).toBe(true);
  });
  it("should return true for a name with the special characters", () => {
    const validName = "Mary-Ann";
    // assert that the name validates correctly
    expect(checkName(validName)).toBe(true);
  });
});
describe("checkName function does validate an incorrect name format", () => {
  it("should return false for a name that is empty", () => {
    const invalidName = "";
    // assert that the name does not validate
    expect(checkName(invalidName)).toBe(false);
  });
});

/**
 *  checkSecurityField tests
 */

describe("checkSecurityField function validates a correct security question", () => {
  it("should return true for a security question with the right format", () => {
    const validSecurityQuestion =
      "What is the name of your favourite car brand?";
    // assert that the security question validates correctly
    expect(checkSecurityField(validSecurityQuestion)).toBe(true);
  });
});
describe("checkSecurityField function does not validate an incorrect security question format", () => {
  it("should return false for a security question that is too short", () => {
    const invalidSecurityQuestion = "How?";
    // assert that the security question does not validate
    expect(checkSecurityField(invalidSecurityQuestion)).toBe(false);
  });
  it("should return false for a security question that is empty", () => {
    const invalidSecurityQuestion = "";
    expect(checkSecurityField(invalidSecurityQuestion)).toBe(false);
  });
});

/**
 *  checkAnswer tests
 */

describe("checkSecurityField function validates a correct security answer", () => {
  it("should return true for a security answer with the right format", () => {
    const validSecurityAnswer = "Mercedes Benz";
    // assert that the security answer validates correctly
    expect(checkSecurityField(validSecurityAnswer)).toBe(true);
  });
});
describe("checkSecurityField function does not validate an incorrect security answer format", () => {
  it("should return false for a security answer that is empty", () => {
    const invalidSecurityAnswer = "";
    // assert that the security answer does not validate
    expect(checkSecurityField(invalidSecurityAnswer)).toBe(false);
  });
  it("should return false for a security question that is more than 30 characters", () => {
    const invalidSecurityAnswer =
      "it all started when I was 16, it was a beautiful thursday morning, then out of nowhere the unexpected happened.";
    expect(checkSecurityField(invalidSecurityAnswer)).toBe(false);
  });
});

//UI tests
describe("RegisterPageTitle component", () => {
  it("should render the component without crashing", () => {
    render(<RegisterPageTitle />);
  });
});

describe("RegisterPageBody component", () => {
  it("should render the component without crashing", () => {
    render(<RegisterPageBody />);
  });
  it("should have an email input field", () => {
    render(<RegisterPageBody />);
    const emailInput = screen.getByPlaceholderText("Email *");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id");
  });
  it("should have a surname input field", () => {
    render(<RegisterPageBody />);
    const surnameInput = screen.getByPlaceholderText("Surname *");
    expect(surnameInput).toBeInTheDocument();
    expect(surnameInput).toHaveAttribute("id");
  });
  it("should have a given name  input field", () => {
    render(<RegisterPageBody />);
    const givenNameInput = screen.getByPlaceholderText("Given Name 1");
    expect(givenNameInput).toBeInTheDocument();
    expect(givenNameInput).toHaveAttribute("id");
  });
  it("should have a password input field", () => {
    render(<RegisterPageBody />);
    const paswordInput = screen.getByPlaceholderText("Password *");
    expect(paswordInput).toBeInTheDocument();
    expect(paswordInput).toHaveAttribute("id");
  });
  it("should have a security question input field", () => {
    render(<RegisterPageBody />);
    const securityQuestionInput = screen.getByPlaceholderText(
      "Security Question 1 *"
    );
    expect(securityQuestionInput).toBeInTheDocument();
    expect(securityQuestionInput).toHaveAttribute("id");
  });
  it("should have a security answer input field", () => {
    render(<RegisterPageBody />);
    const securityAnswerInput = screen.getByPlaceholderText(
      "Security Answer 1 *"
    );
    expect(securityAnswerInput).toBeInTheDocument();
    expect(securityAnswerInput).toHaveAttribute("id");
  });
  it('should have a "REGISTER" button', () => {
    render(<RegisterPageBody />);
    const registerButton = screen.getByText("REGISTER");
    // assertions to verify that the "SIGN IN" button exists
    expect(registerButton).toBeInTheDocument();
  });
});
