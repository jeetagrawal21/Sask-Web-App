import React, { useContext } from 'react';
import '../stylings/DashboardStyles/DashboardPage.css';
import Header from '../components/Header';
import WelcomeMessage from '../components/DashboardComponents/WelcomeMessage';
import Timeline from '../components/DashboardComponents/Timeline';
import SignOut from '../components/SignOut';
import Table from '../components/DashboardComponents/Table';
import { AuthContext } from '../AuthContext';
import ReturnToHome from '../components/ReturnToHome';

function DashboardPage() {
  // if there is the authentication status is false display unauthorized access, otherwise let the actual page be displayed
  // this would ensure that the actual dashboard is only displayed when the user logs in

  const { isAuthenticated } = useContext(AuthContext); // Get the authentication status from the context
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Unauthorized access</h1>
        <ReturnToHome />
      </div>
    );
  } else {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <Header />
          <div className="dashboard-signout">
            <SignOut />
          </div>
        </div>
        <div className="dashboard-body">
          <div className="welcome-message">
            <WelcomeMessage />
          </div>
          <Table />
          <Timeline />
        </div>
      </div>
    );
  }
}

export default DashboardPage;
