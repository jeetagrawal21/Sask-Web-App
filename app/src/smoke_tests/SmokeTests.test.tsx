import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../components/SignIn';
import RequestAccount from '../pages/RequestAccountPage';
import DashboardPage from '../pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/RegisterPage';

/**
 * Test cases to make sure the signin page renders properly
 */
describe('SignIn component', () => {
  it('should render the component without crashing', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  it('should should have the Email label in the component', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Email*')).toBeInTheDocument();
  });

  it('should should have the Password label in the component', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Password*')).toBeInTheDocument();
  });

  it('should should have the SIGN IN button in the component', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });
  it('should have a Request account link', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const requestAccountButton = screen.getByText('Request one.');

    // assertions to verify that the "REQUEST ACCOUNT" button exists
    expect(requestAccountButton).toBeInTheDocument();
  });
});

/**
 * Test that the request account page renders properly
 */
describe('Request Account page', () => {
  it('should render the component without crashing', () => {
    render(
      <BrowserRouter>
        <RequestAccount />
      </BrowserRouter>
    );
  });

  it('should should have the Participant ID label in the component', () => {
    render(
      <BrowserRouter>
        <RequestAccount />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Participant ID*')).toBeInTheDocument();
  });
  it('should have a Request button', () => {
    render(
      <BrowserRouter>
        <RequestAccount />
      </BrowserRouter>
    );
    const requestAccountButton = screen.getByText('Request');

    // assertions to verify that the "REQUEST ACCOUNT" button exists
    expect(requestAccountButton).toBeInTheDocument();
  });
});


/**
 * Test that the Register page renders properly
 */
describe('Register page', () => {
  it('should render the component without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
  it('should have unauthorized acess text', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Unauthorized access')).toBeInTheDocument();

  });

});