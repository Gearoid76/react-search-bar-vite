// src/components/SearchResult.jsx
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../App.css';

export const SearchResult = ({ result, onAddToPlaylist, onRemoveFromPlaylist }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [playlistName, setPlaylistName] = useState('Created by Muusic(k)');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleAddToPlaylist = () => {
    if (playlistName.trim()) {
      onAddToPlaylist(result, playlistName);
      setPlaylistTracks(prevTracks => [...prevTracks, result]);
      setIsAdding(false);
    }
  };

  const handleRemoveTrack = (track) => {
    onRemoveFromPlaylist(track, playlistName);
    setPlaylistTracks(prevTracks => prevTracks.filter(t => t.id !== track.id));
  };

  return (
    <div className='search-result'>
      <img src={result.imageUrl} alt={result.name} style={{ width: '50px', height: '50px' }} />
      <div className="artistNameAndAlbum">
        <h3>{result.name}</h3>
        <p>{result.artist} - {result.album}</p>
        <a href={result.externalUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
      </div>
      <div className="add-icon" onClick={() => setIsAdding(true)}>
        <FaPlus />
      </div>

      {isAdding && (
        <div className="playlist-container">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
          />
          <button onClick={handleAddToPlaylist}>Add to Playlist</button>
          <div className="playlist-tracks">
            {playlistTracks.length > 0 && playlistTracks.map((track) => (
              <div key={track.id} className="playlist-track">
                <img src={track.imageUrl} alt={track.name} style={{ width: '50px', height: '50px' }} />
                <div>
                  <h3>{track.name}</h3>
                  <p>{track.artist} - {track.album}</p>
                  <button onClick={() => handleRemoveTrack(track)}>
                    <FaMinus /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

