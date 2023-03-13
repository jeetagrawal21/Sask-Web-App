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
    // function requestAnAccount() {
    //   navigate('/Register');
    //   const ParticipantId = {
    //     participantId: (document.getElementById('pID') as HTMLInputElement)
    //       .value,
    //   };
    //   // send the participant data to the backend using an axios post request
    //   axios
    //     .post('http://localhost:3000/requestAccount', ParticipantId)
    //     .then((response) => {
        
    //       navigate('/Register');
    //     });
    //   }
    function requestAccount() {
      // alert("In Request Acc");
      // navigate('/Register');

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

      navigate('/Register');

    }

        function checkParticipantID(e:any){
          const ParticipantIDregex= /^\d+$/;
          setParticipantNumber(e.target.value);
          setIsValidParticipantId(ParticipantIDregex.test(
            e.target.value
          ));
        }

        function handleDisable():boolean{
          let result=!isValidParticipantId;
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
                  onChange={(e) => {checkParticipantID(e)}}
                  id="pID"
                ></input>

                {/* If the typed password does not meet the criteria, this will display an error message. */}
                {!isValidParticipantId && participantNumber!=="" &&<>
                <p>Please enter a valid participant ID. It must be just numbers and should not have any other characters!</p></>}

              </div>
              {/* <Link to="/Register"> */}
                <button disabled={handleDisable()} className="signin-button" onClick={requestAccount}>
                  Request
                </button>
              {/* </Link> */}
            </form>
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
