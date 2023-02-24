import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/pages/login/login';
import './App.css';
import WelcomePage from './pages/welcomePage';
import Register from './pages/RegisterPage';
import TestPage from './pages/TestPage';
import RequestAccount from './pages/RequestAccountPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Dashboard from './components/layout/defaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/RequestAccount" element={<RequestAccount />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/TestPage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
