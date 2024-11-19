import React, { useState, useEffect } from 'react';
import Walkman from './components/Walkman';
import HomeScreen from './components/HomeScreen';
import MusicScreen from './components/MusicScreen';
import PhotosScreen from './components/PhotosScreen';
import RadioScreen from './components/RadioScreen';
import SettingsScreen from './components/SettingsScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import PlaybackScreen from './components/PlaybackScreen';
import GlobalAudioPlayer from './components/GlobalAudioPlayer'; // Import the new component
import { applyTheme } from './utils/themeManager'; // Import applyTheme function
import './App.css';

const App = () => {
  const [screenContent, setScreenContent] = useState('Welcome to Walkman-js');
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [theme, setTheme] = useState('Black');
  const [currentAudio, setCurrentAudio] = useState(null); // State to manage current playing audio
  
  const icons = ['Photos', 'Music', 'FM Radio', 'Settings', 'Playlists', 'Playback'];

  useEffect(() => {
     console.log('Current theme:', theme);
     applyTheme(theme); // Apply the theme using the theme manager 
  }, [theme]);

  const handleButtonPress = (button) => {
    let newIndex = selectedIcon;
    if (currentScreen === 'home') {
      switch (button) {
        case 'up':
          newIndex = (selectedIcon - 3 + 6) % 6;
          break;
        case 'down':
          newIndex = (selectedIcon + 3) % 6;
          break;
        case 'left':
          newIndex = (selectedIcon - 1 + 6) % 6;
          break;
        case 'right':
          newIndex = (selectedIcon + 1) % 6;
          break;
        case 'enter':
          const screens = ['photos', 'music', 'radio', 'settings', 'playlists', 'playback'];
          setCurrentScreen(screens[selectedIcon]);
          return;
        default:
          return;
      }
    } else if (button === 'back' || button === 'Escape' || button === 'Backspace') {
      setCurrentScreen('home');
    }
    setSelectedIcon(newIndex);
    setScreenContent(`Selected: ${icons[newIndex]}`);
  };

  const renderCurrentScreen = () => {
  switch (currentScreen) {
      case 'photos':
        return <PhotosScreen />;
      case 'music':
        return <MusicScreen />;
      case 'radio':
        return <RadioScreen />;
      case 'settings':
        return <SettingsScreen setTheme={setTheme} />;
      case 'playlists':
        return <PlaylistsScreen />;
      case 'playback':
        return <PlaybackScreen />;
      default:
        return <HomeScreen selectedIcon={selectedIcon} onButtonPress={handleButtonPress} />;
    }
  };

  return (
    <div className="app">
      <Walkman
        screenContent={renderCurrentScreen}
        onButtonPress={handleButtonPress}
        selectedIcon={selectedIcon}
        currentScreen={currentScreen}
      />
      <GlobalAudioPlayer currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />
    </div>
  );
};

export default App;
