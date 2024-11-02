import React, { useState } from 'react';
import Icon from './assets/icon.svg';

import Player from './components/Player';
import Playlist from './components/Playlist';
import Search from './components/Search';

import './App.css';

const App = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    const handleSearch = (tracks) => {
      setTracks(tracks);
      if (tracks.length > 0) {
        setCurrentTrack(tracks[0]);
      }
    };  

    return (
    <div className="app">
      <img src={Icon} alt="App Icon" />
      <h1>Walkman-js</h1>
      <Search onSearch={handleSearch} />
      {currentTrack && <Player videoId={currentTrack.videoId} />}
      <Playlist tracks={tracks} />
    </div>
  );
}

export default App;
