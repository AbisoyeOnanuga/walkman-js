// NowPlaying
import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import PlaylistsScreen from './PlaylistsScreen';
import MusicScreen from './MusicScreen';
import RadioScreen from './RadioScreen';
import PersistentComponent from './PersistentComponent';

const NowPlaying = () => {
  const [playing, setPlaying] = useState('');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedScreen, setSelectedScreen] = useState('home');
  const [selectedIcon, setSelectedIcon] = useState(0);

  const handleButtonPress = (screen, index) => {
    setSelectedScreen(screen);
    setSelectedIcon(index);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen setPlaying={setPlaying} playing={playing} setCurrentScreen={setCurrentScreen} />;
      case 'playlists':
        return <PlaylistsScreen setPlaying={setPlaying} playing={playing} />;
      case 'music':
        return <MusicScreen setPlaying={setPlaying} playing={playing} />;
      case 'radio':
        return <RadioScreen setPlaying={setPlaying} playing={playing} />;
      default:
        return <HomeScreen setPlaying={setPlaying} playing={playing} setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <div>
      <PersistentComponent isVisible={selectedScreen === 'home'}>
        <HomeScreen
          selectedIcon={selectedIcon}
          onButtonPress={handleButtonPress}
        />
      </PersistentComponent>
      <PersistentComponent isVisible={selectedScreen === 'playlists'}>
        <PlaylistsScreen setPlaying={setPlaying} playing={playing} />
      </PersistentComponent>
      <PersistentComponent isVisible={selectedScreen === 'music'}>
        <MusicScreen setPlaying={setPlaying} playing={playing} />
      </PersistentComponent>
      <PersistentComponent isVisible={selectedScreen === 'radio'}>
        <RadioScreen setPlaying={setPlaying} playing={playing} />
      </PersistentComponent>
    </div>
  );
};

export default NowPlaying;
