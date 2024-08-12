import React, { useState, useEffect } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './auth';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import  Playlist  from './components/Playlist';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState(null); // Store the playlist details
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      getAccessToken(clientId, code)
        .then((token) => {
          setAccessToken(token);
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, []);

  const handleAddToPlaylist = (track, playlistName) => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    // Create a new playlist
    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'Created my Muusic(k)',
        public: false,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const playlistId = data.id;
        setPlaylist({ id: playlistId, name: playlistName });

        // Add the track to the newly created playlist
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [track.externalUrl],
          }),
        })
          .then(response => response.json())
          .then(() => {
            setPlaylistTracks(prevTracks => [...prevTracks, track]);
          })
          .catch(error => console.error('Error adding track to playlist:', error));
      })
      .catch(error => console.error('Error creating playlist:', error));
  };

  const handleRemoveTrack = (trackToRemove) => {
    if (!accessToken || !playlist) {
      console.error("No access token or playlist available");
      return;
    }

    // Remove the track from the playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracks: [{ uri: trackToRemove.externalUrl }],
      }),
    })
      .then(response => response.json())
      .then(() => {
        setPlaylistTracks(prevTracks => prevTracks.filter(track => track.id !== trackToRemove.id));
      })
      .catch(error => console.error('Error removing track from playlist:', error));
  };

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} accessToken={accessToken} />
        <SearchResultsList results={results} onAddToPlaylist={handleAddToPlaylist} />
      </div>
      {playlist && (
       <Playlist 
          playlist={playlist}
          playlistTracks={playlistTracks}
          handleRemoveTrack={handleRemoveTrack}
          />
      )}
      </div>
  );
}

export default App;
