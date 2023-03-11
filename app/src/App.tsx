import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/pages/login/login';
import './App.css';
import WelcomePage from './pages/welcomePage';
import Register from './pages/RegisterPage';
import TestPage from './pages/TestPage';
import RequestAccount from './pages/RequestAccountPage';
import Timeline from './pages/Timeline';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import log from "loglevel";
import remotePlugin from 'loglevel-plugin-remote';

const remoteOptions = {
  url: "http://localhost:3000/logs",
  format: remotePlugin.json,
  method: "POST",
  level: process.env.NODE_ENV === "development"?
                                  "trace": // Send trace level messages and above when in development
                                  "error", // Only send error level messages when in production
};
log.enableAll();

remotePlugin.apply(log, remoteOptions); // use remotePlugin.apply() here


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/RequestAccount" element={<RequestAccount />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Timeline" element={<Timeline />} />
        <Route path="/TestPage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
