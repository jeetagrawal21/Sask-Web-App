import React from 'react';
import '../App.css';
import Header from '../components/header';
import Sidebar from '../components/DashboardComponents/Sidebar';
import MainComponent from '../components/DashboardComponents/MainComponent';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <MainComponent />
      </div>
    );
  }
}

export default Dashboard;
