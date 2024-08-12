// src/components/SearchResultsList.jsx
import React from 'react';
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results }) => {
  return (
    <div className='results-list'>
      {results.map((result, id) => (
        <SearchResult result={result} key={id} />
      ))}
    </div>
  );
};
