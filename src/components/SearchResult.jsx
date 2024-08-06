import React from 'react'
import App from '../App';

export const SearchResult = ({result}) => {
  return (
    <div className='search-result'>{result.name}</div>
  )
}
