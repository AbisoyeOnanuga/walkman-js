// components/Walkman.jsx
import React, { useEffect, useState } from 'react';
import PlayIcon from '../assets/play-pause.svg';
import UpIcon from '../assets/up.png';
import DownIcon from '../assets/down.png';
import LeftIcon from '../assets/left.png';
import RightIcon from '../assets/right.png';
import WalkmanIcon from '../assets/walkman-logo.svg';
import './Walkman.css';

const Walkman = ({ 
  screenContent, 
  onButtonPress, 
  selectedIcon, 
  currentScreen,
  theme,
  playing,
  currentStation,
  onStationPlay
}) => {
  const [pressTimer, setPressTimer] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleMouseDown = (button) => {
    setActiveButton(button);
    const timer = setTimeout(() => {
      if (button === 'back') {
        onButtonPress('home');
      } else if (button === 'option') {
        onButtonPress('power');
      }
    }, 3000);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
    setActiveButton(null);
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      setActiveButton(event.key.toLowerCase());
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
          return;
      }
    };

    const handleKeyUp = () => {
      setActiveButton(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onButtonPress]);

  return (
    <div className="walkman" style={{ background: theme.walkman.background }}>
      <div className="bezel">
        <div className="sony-logo">SONY</div>
        <div className="screen">
          {typeof screenContent === 'function' ? 
            screenContent({
              selectedIcon,
              onButtonPress,
              playing,
              currentStation,
              onStationPlay
            }) : 
            screenContent
          }
        </div>
      </div>
      <div className="volume-buttons" style={{ background: theme.volumeButtons.background }}></div>
      <div className="key-volume-button" style={{ background: theme.keyVolume.background }}></div>
      <div className="power-button" style={{ background: theme.powerButton.background }}></div>
      <div className="buttons">
        <div
          className="button-back"
          style={{ background: theme.buttonBack.background }}
          onMouseDown={() => handleMouseDown('back')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('back')}
          tabIndex="0"
        >
          BACK
        </div>
        <div
          className="button-option"
          style={{ background: theme.buttonOption.background }}
          onMouseDown={() => handleMouseDown('option')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('option')}
          tabIndex="0"
        >
          OPTION
        </div>
        <div className="button-home">HOME</div>
        <div className="button-power">POWER</div>
        <div className="navigation" style={{ background: theme.navigation.background }}>
          <button className="button-center" style={{ background: theme.buttonCenter.background }} onClick={() => onButtonPress('enter')}>
            <div className="key-center-button" style={{ background: theme.keyButton.background }}></div>
            <img src={PlayIcon} alt="Play/Pause" />
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
