//src/App.jsx
import { useState } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './auth';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';

const clientId = import.meta.env.VITE_CLIENT_ID; 
const params = new URLSearchParams(window.location.search); 
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
}

function App() {
  const [results, setResults] = useState([]);

  return (
      <div className="App">
        <div className='search-bar-container'>
          <SearchBar setResults={setResults} />
              <SearchResultsList results={results} />
          </div>
         
        </div>
  );
}

export default App;
