import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import SignIn from "./components/signin";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
   
          <Header/>
          <Navbar/>
          <div className="container">
          <div className="welcome-message">
            <h2>Welcome!</h2>
            <h3>Hello world, this is our webpage for Sask LongCovid participant portal</h3>
          </div>
          <SignIn/>
          </div>


    </div>

  );
}

export default App;
