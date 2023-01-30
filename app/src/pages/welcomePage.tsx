import React from 'react';
// import logo from './logo.svg';
import '../App.css';
import Header from "../components/header";
import SignIn from "../components/signin";
import Navbar from "../components/navbar";

function WelcomePage() {
  return (
   
    <div className="App">
   
          <Header/>
          <Navbar/>
          <div className="container">
          <div className="welcome-message">
            <h2 className="welcome-text-heading">Welcome!</h2>
            <h3 className="welcome-text-body">Hello world, this is our webpage for Sask LongCovid participant portal</h3>
          </div>
          <SignIn/>
          </div>


    </div>
  

  );
}

export default WelcomePage;