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
import AdminPage from './pages/AdminPage';

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
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
