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
    // const file = event.target.files[0]; // get the uploaded file
    // console.log("Uploaded file:", file);

    // redirect to home page
    // navigate("/");
  }

  return (
    <div>
      <label htmlFor="upload-file" style={{ display: "none" }}>
        Upload user data
      </label>
      <input type="file" id="upload-file" name="upload-file" style={{ display: "none" }} onChange={handleUploadUserData}/>
      <button
        type="button"
        onClick={() => {
          document.getElementById("upload-file")?.click(); // trigger file explorer
        }}
      >
        Upload user data
      </button>
    </div>
  );
}

export default UploadUserData;



// import React from "react";
// import { useNavigate } from "react-router-dom";

// /**
//  * Sign out button to clear local storage and redirect to home page
//  * @precond user is logged in
//  * @postcond user is logged out
//  * @returns sign out button
//  */
// function UploadUserData() {
//   const navigate = useNavigate();

//   function handleUploadUserData() {
//     // TODO: implement Upload user data logic
//     localStorage.clear();

//     // redirect to home page
//     // navigate("/");
//   }

//   return (
//     // <button type="button" onClick={handleUploadUserData}>
//     <button type="button">
//       Upload user data
//     </button>
//   );
// }

// export default UploadUserData;