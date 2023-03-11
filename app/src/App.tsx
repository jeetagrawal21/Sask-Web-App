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


const remoteOptions = {
  url: "https://my-server.com/crash-reports",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  level: process.env.NODE_ENV === "development"?
                                  "trace": // Send trace level messages and above when in development
                                  "error", // Only send error level messages when in production
};

remote.apply(log, remoteOptions);


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
