//components/SearchResult.jsx
import React from 'react'
import { FaPlus } from "react-icons/fa";
import App from '../App';

export const SearchResult = ({result}) => {
  return (
    <div className='search-result'>{result.name} <FaPlus id='add-icon' onClick={(e) => alert(`You clicked on ${result.name}`)}/> </div>
  )
}
