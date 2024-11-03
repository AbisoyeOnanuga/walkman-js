import React, { useEffect, useState } from 'react';

import PlayIcon from '../assets/play-pause.svg'
import UpIcon from '../assets/tune-up.svg';
import DownIcon from '../assets/tune-down.svg';
import LeftIcon from '../assets/left.svg';
import RightIcon from '../assets/right.svg';
import WalkmanIcon from '../assets/walkman-logo.svg';

import './Walkman.css';

const Walkman = ({ screenContent, onButtonPress }) => {
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

  return (
    <div className="walkman">
      <div className="bezel">
        <div className="screen">{screenContent}</div>
        <div className="sony-logo">SONY</div>
      </div>
      <div class="volume-buttons"></div>
      <div class="key-volume-button"></div>
      <div class="power-button"></div>
      <div className="buttons">
        <div
          className="button-back"
          onMouseDown={() => handleMouseDown('back')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('back')}
        >
          BACK
        </div>
        <div
          className="button-option"
          onMouseDown={() => handleMouseDown('option')}
          onMouseUp={handleMouseUp}
          onClick={() => onButtonPress('option')}
        >
          OPTION
        </div>
        <div className="button-home">HOME</div>
        <div className="button-power">POWER</div>
        <div className="navigation">
          <button className="button-center" onClick={() => onButtonPress('enter')}>
            <img src={PlayIcon} alt="Play/Pause" />
            <div class="key-button"></div>
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