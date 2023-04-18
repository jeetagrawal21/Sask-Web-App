import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import Header from '../components/Header';
import SignOut from '../components/SignOut';

describe('UserRequestsTable', () => {
  it('renders header', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders sign out button', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    const welcomeMessageElement = screen.getByText(/welcome to the dashboard/i);
    expect(welcomeMessageElement).toBeInTheDocument();
  });

  it('renders timeline component', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    const timelineElement = screen.getByRole('list', { name: /timeline/i });
    expect(timelineElement).toBeInTheDocument();
  });

  it('renders header element', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(3);
  });

  it('renders signout button', () => {
    render(<SignOut />);
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
  });
});
