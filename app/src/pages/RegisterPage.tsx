import React, { useContext } from "react";
import "../App.css";
import RegisterPageTitle from "../components/RegisterPageComponents/RegisterPageTitle";
import RegisterPageBody from "../components/RegisterPageComponents/RegisterPageBody";
import { AuthContext } from "../AuthContext";
import ReturnToHome from "../components/ReturnToHome";

function RegisterPage() {
  const { isAllowedToRegister } = useContext(AuthContext); // Get the authentication status from the context
  if (!isAllowedToRegister) {
    return (
      <div>
        <h1>Unauthorized access</h1>
        <ReturnToHome />
      </div>
    );
  } else {
    return (
      <div className="App">
        <RegisterPageTitle />
        <RegisterPageBody />
      </div>
    );
  }
}

export default RegisterPage;
