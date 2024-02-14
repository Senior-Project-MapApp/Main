import React from 'react';

function AutoComplete({ searchInput, setSearchInput }) {
  return (
    <input
      id="search-input"
      type="text"
      placeholder="Search for a place"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}

export default AutoComplete;
