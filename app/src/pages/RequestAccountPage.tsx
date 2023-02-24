import React from 'react';
// import logo from './logo.svg';
import '../App.css';
import Header from '../components/header';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RequestAccount extends Component {
  render() {
    return (
      <div className="requestAccount">
        <Header />
        <form className="Auth-form">
          <h3>Request An Account!</h3>
          <div className="participantId">
            <input
              type="id"
              className="input-fields"
              placeholder="Participant ID"
              id="pID"
            ></input>
          </div>
          <Link to="/Register">
            <button className="signin-button">Request</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default RequestAccount;
