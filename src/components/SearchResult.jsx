// src/components/SearchResult.jsx
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../App.css';

export const SearchResult = ({ result, onAddToPlaylist }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [playlistName,setPlaylistName] =useState ('Created from Muusic(k)');

  const handleAddToPlaylist = () => {
    if (playlistName.trim()) {
      onAddToPlaylist(result, playlistName);
      setIsAdding(false)
    }
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

     {/* Container for adding to playlist */}
     {isAdding && (
        <div className="playlist-container">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
          />
          <button onClick={handleAddToPlaylist}>Add to Playlist</button>
        </div>
      )}
    </div>
    
  );
};