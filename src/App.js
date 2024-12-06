// App.js
import React, { useState, useEffect } from 'react';
import Walkman from './components/Walkman';
import HomeScreen from './components/HomeScreen';
import MusicScreen from './components/MusicScreen';
import PhotosScreen from './components/PhotosScreen';
import RadioScreen from './components/RadioScreen';
import SettingsScreen from './components/SettingsScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import PlaybackScreen from './components/PlaybackScreen';
import PersistentPlayer from './components/PersistentPlayer';
import Header from './components/Header';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';
import VisualizerScreen from './components/VisualizerScreen';
import PetScreen from './components/PetScreen';

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const [screenContent, setScreenContent] = useState('Welcome to Walkman-js'); // Correctly defining useState
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentAudio, setCurrentAudio] = useState(null); 
  const [playing, setPlaying] = useState(null);
  const [activePlayer, setActivePlayer] = useState(null);
  const [audioPlayer] = useState(new Audio());
  const [currentStation, setCurrentStation] = useState(null);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const { theme } = useTheme();

  const icons = ['Pet', 'Visualizer', 'FM Radio', 'Settings', 'Playlists', 'Playback'];

  useEffect(() => {
    audioPlayer.addEventListener('playing', () => {
      setPlaying('radio');
    });

    audioPlayer.addEventListener('pause', () => {
      setPlaying(null);
    });

    audioPlayer.addEventListener('ended', () => {
      setPlaying(null);
    });

    return () => {
      audioPlayer.pause();
      audioPlayer.src = '';
    };
  }, [audioPlayer]);

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
          const screens = ['pet', 'visualizer', 'radio', 'settings', 'playlists', 'playback'];
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

  const handleRadioPlay = (station) => {
    if (currentStation?.name === station.name && !audioPlayer.paused) {
      audioPlayer.pause();
      setCurrentStation(null);
    } else {
      audioPlayer.src = station.url;
      audioPlayer.play().catch(error => {
        console.error('Error playing station:', error);
      });
      setCurrentStation(station);
    }
  };

  const handlePlaylistPlay = (playlist) => {
    if (currentPlaylist?.id === playlist.id && youtubePlayer?.getPlayerState() === 1) {
      youtubePlayer.pauseVideo();
      setCurrentPlaylist(null);
      setPlaying(null);
    } else {
      if (youtubePlayer) {
        if (playlist.listId) {
          youtubePlayer.loadPlaylist({
            listType: 'playlist',
            list: playlist.listId,
            index: 0,
            startSeconds: 0
          });
        } else {
          youtubePlayer.loadVideoById(playlist.videoId);
        }
        youtubePlayer.playVideo();
        setCurrentPlaylist(playlist);
        setPlaying('playlists');
      }
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'pet':
        return <PetScreen playing={playing} />;
      case 'music':
        return <VisualizerScreen playing={playing} />;
      case 'playlists':
        return <PlaylistsScreen 
          playing={playing}
          setPlaying={setPlaying}
          currentPlaylist={currentPlaylist}
          onPlaylistPlay={handlePlaylistPlay}
          setYoutubePlayer={setYoutubePlayer}
        />;
      case 'radio':
        return <RadioScreen 
          playing={playing}
          currentStation={currentStation}
          onStationPlay={handleRadioPlay}
        />;
      case 'settings':
        return <SettingsScreen onButtonPress={handleButtonPress} playing={playing} />;
      case 'visualizer':
        return <VisualizerScreen playing={playing} audioPlayer={audioPlayer} />;
      default:
        return <HomeScreen 
          selectedIcon={selectedIcon} 
          onButtonPress={handleButtonPress}
          playing={playing}
        />;
    }
  };

  return (
    <div className="app">
      <Walkman
        screenContent={renderCurrentScreen}
        onButtonPress={handleButtonPress}
        selectedIcon={selectedIcon}
        currentScreen={currentScreen}
        theme={theme}
        playing={playing}
        currentStation={currentStation}
        onStationPlay={handleRadioPlay}
      />
    </div>
  );
};

export default App;
