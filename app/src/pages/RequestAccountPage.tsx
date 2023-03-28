import "../App.css";
import Header from "../components/Header";
import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RequestAccount() {
  const navigate = useNavigate();
  const [isValidParticipantId, setIsValidParticipantId] = useState(false);
  const [participantNumber, setParticipantNumber] = useState("");

  /**
   * Sends the participant id for client requesting an account to the backend,
   */
  // function requestAnAccount() {
  //   navigate('/Register');
  //   const ParticipantId = {
  //     participantId: (document.getElementById('pID') as HTMLInputElement)
  //       .value,
  //   };
  //   // send the participant data to the backend using an axios post request
  //   axios
  //     .post(process.env.REACT_APP_API_BASE_URL + '/requestAccount', ParticipantId)
  //     .then((response) => {

  //       navigate('/Register');
  //     });
  //   }
  function requestAccount() {
    // alert("In Request Acc");
    // navigate('/Register');

    const ParticipantId = {
      participantId: (document.getElementById("pID") as HTMLInputElement).value,
    };

    // send the participant data to the backend using an axios post request
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/requestAccount", ParticipantId)
      .then((response) => {
        alert(response);
      });

    navigate("/Register");
  }

  function checkParticipantID(e: any) {
    const ParticipantIDregex = /^\d+$/;
    setParticipantNumber(e.target.value);
    setIsValidParticipantId(ParticipantIDregex.test(e.target.value));
  }

  function handleDisable(): boolean {
    let result = !isValidParticipantId;
    return result;
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
            placeholder="Participant ID*"
            value={participantNumber}
            onChange={(e) => {
              checkParticipantID(e);
            }}
            id="pID"
          ></input>

          {/* If the typed password does not meet the criteria, this will display an error message. */}
          {!isValidParticipantId && participantNumber !== "" && (
            <>
              <p>
                Please enter a valid participant ID. It must be just numbers and
                should not have any other characters!
              </p>
            </>
          )}
        </div>
        {/* <Link to="/Register"> */}
        <button
          disabled={handleDisable()}
          className="signin-button"
          onClick={requestAccount}
        >
          Request
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default RequestAccount;
