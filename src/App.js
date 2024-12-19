// App.js
import React, { useState, useEffect, useRef } from 'react';
import Walkman from './components/Walkman';
import HomeScreen from './components/HomeScreen';
import VisualizerScreen from './components/VisualizerScreen';
import PetScreen from './components/PetScreen';
import RadioScreen from './components/RadioScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import WeatherScreen from './components/WeatherScreen';
import SettingsMainScreen from './components/SettingsMainScreen';
import SettingsAboutScreen from './components/SettingsAboutScreen';
import SettingsThemeScreen from './components/SettingsThemeScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RADIO_STATIONS } from './data/radioStations';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const [screenContent, setScreenContent] = useState('Welcome to Walkman-js');
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentSettingsScreen, setCurrentSettingsScreen] = useState('main');
  const [currentAudio, setCurrentAudio] = useState(null); 
  const [playing, setPlaying] = useState(null);
  const [activePlayer, setActivePlayer] = useState(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [audioPlayer] = useState(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    return audio;
  });

  const mainScreenRef = useRef(null);
  const aboutScreenRef = useRef(null);
  const themeScreenRef = useRef(null);

  const { theme } = useTheme();

  const icons = ['Pet', 'Visualizer', 'FM Radio', 'Settings', 'Playlists', 'Weather'];

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

  const handleSettingsNavigate = (screen) => {
    setCurrentSettingsScreen(screen);
  };

  const handleButtonPress = (button) => {
    let newIndex = selectedIcon;
    
    // Handle back button first
    if (button === 'back' || button === 'Escape' || button === 'Backspace') {
      if (currentScreen === 'settings') {
        if (currentSettingsScreen !== 'main') {
          setCurrentSettingsScreen('main');
        } else {
          setCurrentScreen('home');
        }
      } else {
        setCurrentScreen('home');
      }
      return;
    }

    switch (currentScreen) {
      case 'home':
        switch (button) {
          case 'up':
            newIndex = (selectedIcon - 3 + icons.length) % icons.length;
            break;
          case 'down':
            newIndex = (selectedIcon + 3) % icons.length;
            break;
          case 'left':
            newIndex = (selectedIcon - 1 + icons.length) % icons.length;
            break;
          case 'right':
            newIndex = (selectedIcon + 1) % icons.length;
            break;
          case 'enter':
            const screenMap = {
              'Pet': 'pet',
              'Visualizer': 'visualizer',
              'FM Radio': 'radio',
              'Settings': 'settings',
              'Playlists': 'playlists',
              'Weather': 'weather'
            };
            setCurrentScreen(screenMap[icons[selectedIcon]]);
            return;
        }
        break;
      case 'radio':
        const currentStationIndex = RADIO_STATIONS.findIndex(station => station.name === currentStation?.name);
        let newStationIndex = currentStationIndex === -1 ? 0 : currentStationIndex;

        switch (button) {
          case 'up':
            newStationIndex = (newStationIndex - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length;
            setCurrentStation(RADIO_STATIONS[newStationIndex]);
            break;
          case 'down':
            newStationIndex = (newStationIndex + 1) % RADIO_STATIONS.length;
            setCurrentStation(RADIO_STATIONS[newStationIndex]);
            break;
          case 'enter':
          case 'space':
          case ' ':
            if (currentStation) {
              handleRadioPlay(currentStation);
            }
            break;
        }
        return;
      case 'settings':
        // Pass navigation to the appropriate settings screen
        switch (currentSettingsScreen) {
          case 'main':
            mainScreenRef.current?.handleNavigation(button);
            break;
          case 'about':
            aboutScreenRef.current?.handleNavigation(button);
            break;
          case 'theme':
            themeScreenRef.current?.handleNavigation(button);
            break;
        }
        return;
    }
    
    setSelectedIcon(newIndex);
    setScreenContent(`Selected: ${icons[newIndex]}`);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'pet':
        return <PetScreen playing={playing} />;
      case 'visualizer':
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
        switch (currentSettingsScreen) {
          case 'main':
            return <SettingsMainScreen 
              ref={mainScreenRef}
              onButtonPress={handleButtonPress}
              onNavigate={handleSettingsNavigate}
              playing={playing}
            />;
          case 'about':
            return <SettingsAboutScreen 
              ref={aboutScreenRef}
              onButtonPress={handleButtonPress}
              onNavigate={handleSettingsNavigate}
              playing={playing}
            />;
          case 'theme':
            return <SettingsThemeScreen 
              ref={themeScreenRef}
              onButtonPress={handleButtonPress}
              playing={playing}
            />;
          default:
            return <SettingsMainScreen 
              ref={mainScreenRef}
              onButtonPress={handleButtonPress}
              onNavigate={handleSettingsNavigate}
              playing={playing}
            />;
        }
      case 'weather':
        return <WeatherScreen playing={playing} />;
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
