/**
 * This component allows the user to upload a file using the UI.
 * When the user clicks the "Select a file" button, a file input dialog is shown.
 * When the user selects a file, it is uploaded to the server via an API call.
 */

import React, { useRef } from 'react';
import './UploadUserData.css';
import log from 'loglevel';
import axios from 'axios'

// This function handles the file change event of the file input dialog
const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  // Get the selected file
  const file = event.target.files && event.target.files[0];

  if (!file) {
    console.error('No file selected');
    return;
  }

  try {
    // Create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);

    // Make an API call to upload the file to the server
    const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response from the server, e.g., save the uploaded file's URL
    log.info('File uploaded successfully:', response.data);
  } catch (error) {
    log.error('Error uploading the file:', error);
  }
};

const UploadUserData: React.FC = () => {
  // Create a ref to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This function is called when the user clicks the "Upload a file" button
  const handleClick = () => {
    // If the file input element exists, trigger a click event on it to show the file input dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {/* This button triggers the file input dialog */}
      <button className="upload-button" onClick={handleClick}>
        Upload a file
      </button>
      {/* This is the hidden file input element */}
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* Other elements... */}
    </div>
  );
};

export default UploadUserData;
