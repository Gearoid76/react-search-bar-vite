// src/components/Playlist.jsx
import React from 'react';
import { FaMinus } from 'react-icons/fa';

const Playlist = ({ playlist, playlistTracks, handleRemoveTrack }) => {
  return (
    <div className="playlist-display">
      <h2>Playlist: {playlist.name}</h2>
      <div className="playlist-tracks">
        {playlistTracks.length > 0 ? (
          playlistTracks.map((track, index) => (
            <div key={index} className="playlist-track">
              <img src={track.imageUrl} alt={track.name} style={{ width: '50px', height: '50px' }} />
              <div>
                <h3>{track.name}</h3>
                <p>{track.artist} - {track.album}</p>
                <a href={track.externalUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                <FaMinus
                  className="remove-icon"
                  onClick={() => handleRemoveTrack(track)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No tracks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
