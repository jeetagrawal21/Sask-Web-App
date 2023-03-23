import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Sign out button to clear local storage and redirect to home page
 * @precond user is logged in
 * @postcond user is logged out
 * @returns sign out button
 */
function SignOut() {
  const navigate = useNavigate();

  function handleSignOut() {
    // TODO: implement sign out logic
    localStorage.clear();

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
