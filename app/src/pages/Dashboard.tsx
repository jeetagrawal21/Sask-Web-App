import React from 'react';
import '../stylings/DashboardStyles/Dashboard.css';
import Header from '../components/header';
import Sidebar from '../components/DashboardComponents/Sidebar';
import MainComponent from '../components/DashboardComponents/MainComponent';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Header />
        <br></br>
        <div className="dashboard-body">
          <div className="sidebar dashboard-component">
            <Sidebar />
          </div>
          <div className="main-component dashboard-component">
            <MainComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
