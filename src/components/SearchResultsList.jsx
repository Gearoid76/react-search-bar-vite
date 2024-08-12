//src/components/SearchResultsList.jsx
import React from 'react';
import { SearchResult } from './SearchResult';
import  '../App.css';

export const SearchResultsList = ({ results, onAddToPlaylist }) => {
  return (
    <div className='results-list'>
        {
            results.map((result, id) => (
              
                <SearchResult result={result} key={id} onAddToPlaylist={onAddToPlaylist} />
            ))
        }
        </div>
  );
};