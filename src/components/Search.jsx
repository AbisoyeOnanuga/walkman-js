import React, { useState } from 'react';
import api from './youtubeMusic';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const results = await api.search(query)
    onSearch(results);
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
