// src/App.jsx
import React, { useState, useEffect } from 'react';
import { redirectToAuthCodeFlow, getAccessToken } from './auth';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState(null); // Store playlist details
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('Created by app'); // Default playlist name

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

    // Check if playlist exists
    if (!playlist) {
      createPlaylist(playlistName, [track]);
    } else {
      addTrackToPlaylist(track);
    }
  };

  const createPlaylist = (name, tracks) => {
    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description: 'New playlist created by app',
        public: false,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const playlistId = data.id;
        setPlaylist({ id: playlistId, name });
        setPlaylistTracks(tracks);
        addTrackToPlaylist(tracks[0]);
      })
      .catch(error => console.error('Error creating playlist:', error));
  };

  const addTrackToPlaylist = (track) => {
    if (!playlist) return;

    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
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
  };

  const handleRemoveFromPlaylist = (track) => {
    if (!playlist) return;

    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracks: [{ uri: track.externalUrl }],
      }),
    })
      .then(response => response.json())
      .then(() => {
        setPlaylistTracks(prevTracks => prevTracks.filter(t => t.id !== track.id));
      })
      .catch(error => console.error('Error removing track from playlist:', error));
  };

  const handleSavePlaylist = () => {
    if (!playlist || !accessToken) return;

    // Update playlist details or save the playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: playlistTracks.map(track => track.externalUrl),
      }),
    })
      .then(response => response.json())
      .then(() => {
        console.log('Playlist saved to Spotify');
      })
      .catch(error => console.error('Error saving playlist:', error));
  };

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} accessToken={accessToken} />
        <SearchResultsList
          results={results}
          onAddToPlaylist={handleAddToPlaylist}
          onRemoveFromPlaylist={handleRemoveFromPlaylist}
        />
      </div>

      {playlist && (
        <div className="playlist-display">
          <h2>Playlist: {playlist.name}</h2>
          <div className="playlist-tracks">
            {playlistTracks.length > 0 ? (
              playlistTracks.map((track) => (
                <div key={track.id} className="playlist-track">
                  <img src={track.imageUrl} alt={track.name} style={{ width: '50px', height: '50px' }} />
                  <div>
                    <h3>{track.name}</h3>
                    <p>{track.artist} - {track.album}</p>
                    <a href={track.externalUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                    <button onClick={() => handleRemoveFromPlaylist(track)}>
                      <FaMinus /> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tracks added yet.</p>
            )}
          </div>
          <button onClick={handleSavePlaylist}>Save Playlist to Spotify</button>
        </div>
      )}
    </div>
  );
}

export default App;

