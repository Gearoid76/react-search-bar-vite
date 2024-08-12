// src/components/SearchResult.jsx
import React from 'react';
import '../App.css';

export const SearchResult = ({ result }) => {
  return (
    <div className='search-result'>
      <img src={result.imageUrl} alt={result.name} style={{ width: '50px', height: '50px' }} />
      <div>
        <h3>{result.name}</h3>
        <p>{result.artist} - {result.album}</p>
        <a href={result.externalUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
      </div>
    </div>
  );
};
