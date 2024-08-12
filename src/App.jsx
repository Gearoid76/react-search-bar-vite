// src/App.jsx
import React, { useState, useEffect } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './auth';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      getAccessToken(clientId, code)
        .then((token) => {
          console.log("Access Token Retrieved:", token); // Debugging line
          setAccessToken(token);
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, []);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} accessToken={accessToken} />
        <SearchResultsList results={results} />
      </div>
    </div>
  );
}

export default App;
