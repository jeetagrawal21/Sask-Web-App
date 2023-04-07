import React, { useRef } from 'react';
import './UploadUserData.css';
import log from 'loglevel';
import axios from 'axios'

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];

  if (!file) {
    console.error('No file selected');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <button className="upload-button" onClick={handleClick}>
        Select a file
      </button>
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