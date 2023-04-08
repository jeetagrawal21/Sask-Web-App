import { useNavigate } from "react-router-dom";
import React from "react";

/**
 * Returns the user to the home/welcome page
 * @precond None
 * @postcond None
 * @returns return to home button
 */
function ReturnToHome() {
  const navigate = useNavigate();

  function goToHomePage() {
    // redirect to home page
    navigate("/");
  }

  return (
    <button type="button" onClick={goToHomePage}>
      Return to Home
    </button>
  );
}

export default ReturnToHome;
