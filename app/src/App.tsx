import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import Register from './pages/RegisterPage';
import RequestAccount from './pages/RequestAccountPage';
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/DashboardPage';
import { AuthProvider } from './AuthContext';
import log from 'loglevel';
import remotePlugin from 'loglevel-plugin-remote';

const remoteOptions = {
  url: process.env.REACT_APP_API_BASE_URL + '/logs',
  format: remotePlugin.json,
  method: 'POST',
  level: 'trace', // Only send trace level messages and above
};

remotePlugin.apply(log, remoteOptions); // use remotePlugin.apply() here

log.enableAll();

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/RequestAccount" element={<RequestAccount />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
