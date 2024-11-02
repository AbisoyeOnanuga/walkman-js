import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const apiKey = 'AIzaSyB0_YkmQgAehK63HgH39wurN1poOdYmzEU';  // Replace with your YouTube Data API key
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;

    try {
      const response = await axios.get(searchUrl);
      const tracks = response.data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId
      }));
      onSearch(tracks);
    } catch (error) {
      console.error('Network Error:', error);
    }
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
