import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/welcomePage"
import Register from "./AppRegisterPage"


function App() {
  return (

  <Router>
    <Routes>
    
    <Route path="/" element={<WelcomePage/>}/>
    <Route path="/Register" element={<Register/>}/>

    </Routes>
  </Router>
  );

  }

export default App;