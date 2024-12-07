import React from 'react';
import MusicScreen from './MusicScreen';
import RadioScreen from './RadioScreen';
import PlaylistsScreen from './PlaylistsScreen';
import Header from './Header';

const PlaybackScreen = ({ playing }) => {
  return (
    <div className="playback-screen">
      <Header playing={playing} />
      <div className="screen-content">
        {playing === 'music' ? <MusicScreen setPlaying={() => {}} /> : <RadioScreen setPlaying={() => {}} />}
      </div>
    </div>
  );
};

export default PlaybackScreen
