import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Sign out button to clear local storage and redirect to home page
 * @precond user is logged in
 * @postcond user is logged out
 * @returns sign out button
 */
function UploadUserData() {
  const navigate = useNavigate();

  function handleUploadUserData() {
    // TODO: implement Upload user data logic
    localStorage.clear();

    // redirect to home page
    // navigate("/");
  }

  return (
    // <button type="button" onClick={handleUploadUserData}>
    <button type="button">
    {/* <button type="file" name="file" id="file" style={{ display: "none" }} /> */}
      Upload user data
    </button>
  );
}

export default UploadUserData;