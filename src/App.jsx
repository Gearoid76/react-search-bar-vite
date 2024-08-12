// src/App.jsx
import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import { getAccessToken } from './auth'; // Import the auth function

const clientId = import.meta.env.VITE_CLIENT_ID; // Make sure you have this in your environment variables

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      getAccessToken(clientId, code).then((token) => setAccessToken(token));
    }
  }, []);

  return (
    <div className="App">
      <h1>Spotify Search</h1>
      <SearchBar setResults={setResults} accessToken={accessToken} />
      <SearchResultsList results={results} />
    </div>
  );
}

export default App;
