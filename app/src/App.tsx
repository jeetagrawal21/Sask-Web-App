import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from './components/pages/login/login';
import './App.css';
import WelcomePage from "./pages/welcomePage"
import Register from "./AppRegisterPage"
import Dashboard from './components/layout/defaultLayout';



function App() {
  return (

  <Router>
    <Routes>
    
    <Route path="/" element={<WelcomePage/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/Register" element={<Register/>}/>

    </Routes>
  </Router>
  );




  }

export default App;