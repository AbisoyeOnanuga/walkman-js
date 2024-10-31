// Now Playing
import React, { useState } from 'react';
import PlaylistsScreen from './PlaylistsScreen';
import MusicScreen from './MusicScreen';
import RadioScreen from './RadioScreen';

const NowPlaying = () => {
  const [playing, setPlaying] = useState('');

  return (
    <div>
      <PlaylistsScreen setPlaying={setPlaying} playing={playing} />
      <MusicScreen setPlaying={setPlaying} playing={playing} />
      <RadioScreen setPlaying={setPlaying} playing={playing} />
      {/* Add your HomeScreen and other components here */}
    </div>
  );
};

export default NowPlaying;
