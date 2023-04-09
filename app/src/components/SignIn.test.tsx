import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import axios from "axios";

//UI SNAPSHOT TESTING

describe("SignIn component", () => {
  it("should render the component without crashing", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  it("should should have the Email label in the component", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Email*")).toBeInTheDocument();
  });

  it("should should have the Password label in the component", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Password*")).toBeInTheDocument();
  });

  it("should should have the SIGN IN label in the component", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText("SIGN IN")).toBeInTheDocument();
  });

  it("should have an email input field", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email*");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "id");
  });

  it("should have a password input field", () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const passwordInput = screen.getByPlaceholderText("Password*");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it('should have a "SIGN IN" button', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const signInButton = screen.getByText("SIGN IN");
    // assertions to verify that the "SIGN IN" button exists
    expect(signInButton).toBeInTheDocument();
  });

  it('should have a "REQUEST ACCOUNT" link', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const requestAccountButton = screen.getByText("Request one.");

    // assertions to verify that the "REQUEST ACCOUNT" link exists
    expect(requestAccountButton).toBeInTheDocument();
  });



  it('should send a POST request to the server when "SIGN IN" button is clicked', () => {
    const axiosMock = jest.spyOn(axios, "post");
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email*");
    const passwordInput = screen.getByPlaceholderText("Password*");
    fireEvent.change(emailInput, { target: { value: "testuser1@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassLonger1!" } });
    const signInButton = screen.getByText("SIGN IN");
    fireEvent.click(signInButton);

    //   // assertions to verify that the POST request is sent to the server
    expect(axiosMock).toHaveBeenCalledWith(
      process.env.REACT_APP_API_BASE_URL + "/login",
      {
        email: "testuser1@email.com",
        password: "TestPassLonger1!",
      }
    );
  });

  
});
