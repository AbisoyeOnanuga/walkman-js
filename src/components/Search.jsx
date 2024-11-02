import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a track"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
