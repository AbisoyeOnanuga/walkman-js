import React from 'react';
import MusicScreen from './MusicScreen';
import RadioScreen from './RadioScreen';
import PlaylistsScreen from './PlaylistsScreen';

const PlaybackScreen = ({ playing }) => {
  return playing === 'music' ? <MusicScreen setPlaying={() => {}} /> : <RadioScreen setPlaying={() => {}} />;
};

export default PlaybackScreen
