import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import RequestAccount from "./pages/RequestAccountPage";
import Timeline from "./pages/Timeline";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import log from "loglevel";
import remotePlugin from "loglevel-plugin-remote";

const remoteOptions = {
  url: "http://localhost:3000/logs",
  format: remotePlugin.json,
  method: "POST",
  level: "trace", // Only send trace level messages and above
};

remotePlugin.apply(log, remoteOptions); // use remotePlugin.apply() here

log.enableAll();

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
