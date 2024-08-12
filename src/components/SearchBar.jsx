// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ setResults, accessToken }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    const query = encodeURIComponent(value);
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tracks) {
          const results = data.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            imageUrl: track.album.images[0]?.url,
            externalUrl: track.external_urls.spotify
          }));
          setResults(results);
        }
      })
      .catch((error) => console.error("Error fetching data from Spotify:", error));
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      fetchData(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className='input-wrapper'>
      <input
        placeholder='Type to search..'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaSearch id="search-icon" />
    </div>
  );
};

