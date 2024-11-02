import React from 'react';
import Icon from './assets/icon.svg';

import Player from './components/Player';
import Playlist from './components/Playlist';
import Search from './components/Search';

const App = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    const handleSearch = (query) => {
      // Implement search functionality using YouTube API
      // For now, let's use dummy data
      const dummyTracks = [
        { title: 'Track 1', videoId: 'dQw4w9WgXcQ' },
        { title: 'Track 2', videoId: '3JZ_D3ELwOQ' }
      ];
      setTracks(dummyTracks);
    };
    return (
    <div className="app">
      <img src={Icon} alt="App Icon" />
      <h1>Walkman-js</h1>
      <Search onSearch={handleSearch} />
      <Player videoId={currentTrack && currentTrack.videoId} />
      <Playlist tracks={tracks} />
    </div>
  );
}

export default App;
