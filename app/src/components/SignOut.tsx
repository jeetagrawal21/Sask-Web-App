import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

/**
 * Sign out button to clear local storage and redirect to home page
 * @precond user is logged in
 * @postcond user is logged out
 * @returns sign out button
 */
function SignOut() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  function handleSignOut() {
    localStorage.clear();
    setAuthenticated(false); //set the authentication status to false

    // redirect to home page
    navigate("/");
  }

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
