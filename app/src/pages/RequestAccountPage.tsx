import React from 'react';
// import logo from './logo.svg';
import '../App.css';
import Header from '../components/header';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RequestAccount extends Component {
  render() {
    /**
     * Sends the participant id for client requesting an account to the backend,
     */
    function requestAccount() {
      const ParticipantId = {
        participantId: (document.getElementById('pID') as HTMLInputElement)
          .value,
      };
      // send the participant data to the backend using an axios post request
      axios
        .post('http://localhost:3000/requestAccount', ParticipantId)
        .then((response) => {
          alert(response);
        });
    }
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
            <button className="signin-button" onClick={requestAccount}>
              Request
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default RequestAccount;
