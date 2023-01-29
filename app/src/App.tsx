import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import SignIn from "./components/signin";
import Navbar from "./components/navbar";
import Register from "./AppRegisterPage"
// import { Link, Routes, Route } from 'react-router-dom';
import { Sign } from 'crypto';

function App() {
  return (

  <Router>
    <Routes>
    {/* <Route path="/" element={<Header/>}></Route> */}
    <Route path="/" element={<SignIn />}/>
    <Route path="/Register" element={<Register/>}/>

    </Routes>
  </Router>
  );

  }

export default App;