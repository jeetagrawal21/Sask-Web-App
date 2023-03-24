import React, { Component } from "react";
import "../stylings/DashboardStyles/DashboardPage.css";
import Header from "../components/Header";
import WelcomeMessage from "../components/DashboardComponents/WelcomeMessage";
import Timeline from "../components/DashboardComponents/Timeline";
import SignOut from "../components/SignOut";

class DashboardPage extends Component {
  render() {
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
          <Timeline />
        </div>
      </div>
    );
  }
}

export default DashboardPage;
