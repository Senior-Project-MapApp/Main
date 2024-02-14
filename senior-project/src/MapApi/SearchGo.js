import React from 'react';

function SearchGo({ onSearch, onGo }) {
  return (
    <div>
      <button onClick={onSearch}>Find</button>
      <button onClick={onGo}>Get Directions</button>
    </div>
  );
}

export default SearchGo;
