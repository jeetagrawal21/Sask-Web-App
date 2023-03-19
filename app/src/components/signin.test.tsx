import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './Signin';
import axios from 'axios';

//UI SNAPSHOT TESTING

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

  it('should should have the SIGN IN label in the component', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

  it('should have an email input field', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email*');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'id');
  });

  it('should have a password input field', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const passwordInput = screen.getByPlaceholderText('Password*');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should have a "SIGN IN" button', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const signInButton = screen.getByText('SIGN IN');
    // assertions to verify that the "SIGN IN" button exists
    expect(signInButton).toBeInTheDocument();
  });

  it('should have a "REQUEST ACCOUNT" link', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const requestAccountButton = screen.getByText('Request one.');

    // assertions to verify that the "REQUEST ACCOUNT" link exists
    expect(requestAccountButton).toBeInTheDocument();
  });

  // it(
  //   'should display an error message when authentication fails',
  //   async () => {
  //     render(
  //       <BrowserRouter>
  //         <SignIn />
  //       </BrowserRouter>
  //     );
  //     const emailInput = screen.getByPlaceholderText('Email');
  //     const passwordInput = screen.getByPlaceholderText('Password');
  //     fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
  //     fireEvent.change(passwordInput, {
  //       target: { value: 'invalid_password' },
  //     });
  //     const signInButton = screen.getByText('SIGN IN');
  //     fireEvent.click(signInButton);
  //     const errorMessage = await screen.findByText(
  //       "User/Password Doesn't exist"
  //     );

  //     // assertions to verify that the error message is displayed
  //     expect(errorMessage).toBeInTheDocument();
  //   }
  // );

  it('should send a POST request to the server when "SIGN IN" button is clicked', () => {
    const axiosMock = jest.spyOn(axios, 'post');
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email*');
    const passwordInput = screen.getByPlaceholderText('Password*');
    fireEvent.change(emailInput, { target: { value: 'testuser1@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpasslonger1!' } });
    const signInButton = screen.getByText('SIGN IN');
    fireEvent.click(signInButton);

    //   // assertions to verify that the POST request is sent to the server
    expect(axiosMock).toHaveBeenCalledWith('http://localhost:3000/login', {
      email: 'testuser1@email.com',
      password: 'testpasslonger1!',
    });
  });

  it.todo(
    'should display a loading indicator when "SIGN IN" button is clicked'
    // () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const emailInput = screen.getByPlaceholderText('Email');
    //   const passwordInput = screen.getByPlaceholderText('Password');
    //   fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //   const signInButton = screen.getByText('SIGN IN');
    //   fireEvent.click(signInButton);
    //   const loadingIndicator = screen.getByTestId('loading-indicator');
    //   // assertions to verify that the loading indicator is displayed
    //   expect(loadingIndicator).toBeInTheDocument();
    // });

    // it('should disable the "SIGN IN" button when it is clicked', () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const emailInput = screen.getByPlaceholderText('Email');
    //   const passwordInput = screen.getByPlaceholderText('Password');
    //   fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //   const signInButton = screen.getByText('SIGN IN');
    //   fireEvent.click(signInButton);

    //   // assertions to verify that the "SIGN IN" button is disabled
    //   expect(signInButton).toBeDisabled();
    // }
  );

  it.todo(
    'should navigate to the dashboard page when authentication is successful'
    // async () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const emailInput = screen.getByPlaceholderText('Email');
    //   const passwordInput = screen.getByPlaceholderText('Password');
    //   fireEvent.change(emailInput, {
    //     target: { value: 'testuser1@email.com' },
    //   });
    //   fireEvent.change(passwordInput, {
    //     target: { value: 'testpasslonger1!' },
    //   });
    //   const signInButton = screen.getByText('SIGN IN');
    //   fireEvent.click(signInButton);

    //   // assertions to verify that the user is redirected to the dashboard page
    //   const dashboardPage = await screen.findByText('Welcome Back ...');
    //   expect(dashboardPage).toBeInTheDocument();
    // }
  );

  // it('should navigate to the request account page when "REQUEST ACCOUNT" button is clicked', () => {
  //   render(
  //     <BrowserRouter>
  //       <SignIn />
  //     </BrowserRouter>
  //   );
  //   const requestAccountButton = screen.getByText("REQUEST AN ACCOUNT");
  //   fireEvent.click(requestAccountButton);

  //   // assertions to verify that the user is redirected to the request account page
  //   const requestAccountPage = screen.getByText("Request An Account");
  //   expect(requestAccountPage).toBeInTheDocument();
  // });

  it.todo(
    'should authenticate the user when valid email and password are provided'
    //  () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const emailInput = screen.getByPlaceholderText("Email");
    //   const passwordInput = screen.getByPlaceholderText("Password");
    //   fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    //   fireEvent.change(passwordInput, { target: { value: "password123" } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    // //   // assertions to verify authentication
    //   expect(screen.queryByText("Authentication failed")).toBeNull();
    //   expect(screen.queryByPlaceholderText("Email")).toBeNull();
    //   expect(screen.queryByPlaceholderText("Password")).toBeNull();
    //   expect(screen.getByText("Welcome to the Dashboard")).toBeInTheDocument();
    // }
  );

  // it(
  //   'should not authenticate the user when invalid email and password are provided',
  //    () => {
  //     render(
  //       <BrowserRouter>
  //         <SignIn />
  //       </BrowserRouter>
  //     );
  //     const emailInput = screen.getByPlaceholderText("Email");
  //     const passwordInput = screen.getByPlaceholderText("Password");
  //     fireEvent.change(emailInput, { target: { value: "invalidemail@email.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "invalid_password1" } });
  //     const signInButton = screen.getByText("SIGN IN");
  //     fireEvent.click(signInButton);

  //     // assertions to verify authentication fails
  //     // expect(screen.getByText("Authentication failed")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  //     expect(screen.queryByText("Welcome to the Dashboard")).toBeNull();
  //   }
  // );

  it.todo(
    'should not authenticate the user when email field is empty'
    // () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const passwordInput = screen.getByPlaceholderText("Password");
    //   fireEvent.change(passwordInput, { target: { value: "password123" } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify email authentication fails

    //   expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    //   expect(screen.queryByText("Welcome to the Dashboard")).toBeNull();
    // });

    // it("should not authenticate the user when password field is empty", () => {
    //   render(
    //     <BrowserRouter>
    //       <SignIn />
    //     </BrowserRouter>
    //   );
    //   const emailInput = screen.getByPlaceholderText("Email");
    //   fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify password authentication fails

    //   expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    //   expect(screen.queryByText("Welcome to the Dashboard")).toBeNull();
    // }
  );

  it.todo(
    'should not authenticate the user when email field contains only spaces'
    // () => {
    //   render(<SignIn />);
    //   const emailInput = screen.getByPlaceholderText("Email");
    //   const passwordInput = screen.getByPlaceholderText("Password");
    //   fireEvent.change(emailInput, { target: { value: "   " } });
    //   fireEvent.change(passwordInput, { target: { value: "password123" } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify authentication fails
    //   expect(screen.getByText("Please enter your password")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    //   expect(screen.queryByText("Welcome to the Dashboard")).toBeNull();
    // }
  );

  it.todo(
    'should not authenticate the user when password field contains only spaces'
    // () => {
    //   render(<SignIn />);
    //   const emailInput = screen.getByPlaceholderText("Email");
    //   const passwordInput = screen.getByPlaceholderText("Password");
    //   fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    //   fireEvent.change(passwordInput, { target: { value: "   " } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify authentication fails
    //   expect(screen.getByText("Please enter your password")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    //   expect(screen.queryByText("Welcome to the Dashboard")).toBeNull();
    // }
  );

  it.todo(
    'should not authenticate the user when email and password fields are empty'
    //  () => {
    //   render(<SignIn />);
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify authentication fails
    //   expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    //   expect(screen.getByText("SIGN IN")).toBeInTheDocument();
    //   expect(screen.queryByText("Authentication failed")).not.toBeInTheDocument();
    // }
  );

  it.todo(
    'should not authenticate the user when email and password fields contain only spaces'
    //  () => {
    //   render(<SignIn />);
    //   const emailInput = screen.getByPlaceholderText("Email");
    //   const passwordInput = screen.getByPlaceholderText("Password");
    //   fireEvent.change(emailInput, { target: { value: "   " } });
    //   fireEvent.change(passwordInput, { target: { value: "   " } });
    //   const signInButton = screen.getByText("SIGN IN");
    //   fireEvent.click(signInButton);

    //   // assertions to verify authentication fails
    //   expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    //   expect(screen.getByText("SIGN IN")).toBeInTheDocument();
    //   expect(screen.queryByText("Authentication failed")).not.toBeInTheDocument();
    // }
  );

  it.todo(
    'should redirect to ForgotPassword component when "FORGOT PASSWORD" button is clicked'
    //  () => {
    //   render(<SignIn />);
    //   const forgotPasswordButton = screen.getByText("FORGOT PASSWORD");
    //   fireEvent.click(forgotPasswordButton);

    //   // assertions to verify redirection to ForgotPassword component
    //   expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    //   expect(screen.getByLabelText("Email")).toBeInTheDocument();
    //   expect(screen.getByRole("button", { name: "SEND" })).toBeInTheDocument();
    // }
  );
});
