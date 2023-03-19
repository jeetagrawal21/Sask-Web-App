import React from "react";
import "../App.css";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import Navbar from "../components/NavBar";

function WelcomePage() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="container">
        <div className="welcome-message">
          <h2 className="welcome-text-heading">Welcome!</h2>
          <h3 className="welcome-text-body">
            Hello world, this is our webpage for Sask LongCovid participant
            portal
          </h3>
        </div>
        <SignIn />
      </div>
    </div>
  );
}

export default WelcomePage;
