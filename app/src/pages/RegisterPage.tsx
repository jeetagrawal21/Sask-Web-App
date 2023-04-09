import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import RegisterPageTitle from '../components/RegisterPageComponents/RegisterPageTitle';
import RegisterPageBody from '../components/RegisterPageComponents/RegisterPageBody';


export const userid = null;


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [is404, setIs404] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search)
  const encodedId = queryParameters.get("id")

useEffect(() => {
  axios
    .get<boolean>(process.env.REACT_APP_API_BASE_URL + `/Register/${encodedId}`)
    .then((response) => {
      setIsAuthenticated(response.data);
      setIs404(false);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setIs404(true);
      } else {
      }
    });
}, []);

  if (is404) {
    return <div>Page not found</div>;
  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <div className="App">
      <RegisterPageTitle />
      <RegisterPageBody />
    </div>
  ) : (
    <div>You are not authenticated</div>
  );
}

export default App;
