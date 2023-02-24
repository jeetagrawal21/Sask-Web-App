import React from 'react';
import '../App.css';
import Header from '../components/header';
import Sidebar from '../components/DashboardComponents/Sidebar';
import MainComponent from '../components/DashboardComponents/MainComponent';
import axios from 'axios';

function Dashboard() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <MainComponent />
    </div>
  );
}

export default Dashboard;
