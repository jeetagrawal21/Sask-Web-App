import React, { Component } from "react";
import "../stylings/DashboardStyles/Dashboard.css";
import Header from "../components/Header";
import WelcomeMessage from "../components/DashboardComponents/WelcomeMessage";
import Timeline from "../components/DashboardComponents/Timeline";
import SignOut from "../components/SignOut";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Header />
        <br></br>
        <div className="dashboard-body">
          <WelcomeMessage />
          <Timeline />
          <SignOut />
        </div>
      </div>
    );
  }
}

export default Dashboard;
