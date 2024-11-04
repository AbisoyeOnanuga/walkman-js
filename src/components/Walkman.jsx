import React, { useEffect, useState } from 'react';

import PlayIcon from '../assets/play-pause.svg';
import UpIcon from '../assets/tune-up.svg';
import DownIcon from '../assets/tune-down.svg';
import LeftIcon from '../assets/left.svg';
import RightIcon from '../assets/right.svg';
import WalkmanIcon from '../assets/walkman-logo.svg';
import HomeScreen from './HomeScreen';
import MusicScreen from './MusicScreen';
import PhotosScreen from './PhotosScreen';
import RadioScreen from './RadioScreen';
import SettingsScreen from './SettingsScreen';
import PlaylistsScreen from './PlaylistsScreen';
import PlaybackScreen from './PlaybackScreen';

import './Walkman.css';

const Walkman = ({ screenContent, onButtonPress, selectedIcon, currentScreen }) => {
  const [pressTimer, setPressTimer] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          onButtonPress('up');
          break;
        case 'ArrowDown':
          onButtonPress('down');
          break;
        case 'ArrowLeft':
          onButtonPress('left');
          break;
        case 'ArrowRight':
          onButtonPress('right');
          break;
        case 'Enter':
        case ' ':
          onButtonPress('enter');
          break;
        case 'Backspace':
        case 'Escape':
          onButtonPress('back');
          break;
        case 'Shift':
          onButtonPress('option');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onButtonPress]);

  const handleMouseDown = (button) => {
    const timer = setTimeout(() => {
      if (button === 'back') {
        onButtonPress('home');
      } else if (button === 'option') {
        onButtonPress('power');
      }
    }, 3000); // 3 seconds
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
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
        return <SettingsScreen />;
      case 'playlists':
        return <PlaylistsScreen />;
      case 'playback':
        return <PlaybackScreen />;
      default:
        return <HomeScreen selectedIcon={selectedIcon} onButtonPress={onButtonPress} />;
    }
  };

  return (
    <div className="walkman">
      <div className="bezel">
        <div className="sony-logo">SONY</div>
        {renderCurrentScreen()}
      </div>
      <div className="volume-buttons"></div>
      <div className="key-volume-button"></div>
      <div className="power-button"></div>
      <div className="buttons">
        <div
          className="button-back"
          onMouseDown={() => handleMouseDown('back')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('back')}
          tabIndex="0"
        >
          BACK
        </div>
        <div
          className="button-option"
          onMouseDown={() => handleMouseDown('option')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('option')}
          tabIndex="0"
        >
          OPTION
        </div>
        <div className="button-home">HOME</div>
        <div className="button-power">POWER</div>
        <div className="navigation">
          <button className="button-center" onClick={() => onButtonPress('enter')}>
            <img src={PlayIcon} alt="Play/Pause" />
            <div className="key-button"></div>
          </button>
          <button className="button-up" onClick={() => onButtonPress('up')}><img src={UpIcon} alt="Up" /></button>
          <button className="button-down" onClick={() => onButtonPress('down')}><img src={DownIcon} alt="Down" /></button>
          <button className="button-left" onClick={() => onButtonPress('left')}><img src={LeftIcon} alt="Left" /></button>
          <button className="button-right" onClick={() => onButtonPress('right')}><img src={RightIcon} alt="Right" /></button>
        </div>
      </div>
      <div className="walkman-logo"><img src={WalkmanIcon} alt="Walkman" /></div>
    </div>
  );
};

export default Walkman;
