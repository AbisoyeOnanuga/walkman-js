// components/Walkman.jsx
import React, { useState, useEffect } from 'react';
import PlayIcon from '../assets/play-pause.svg';
import UpIcon from '../assets/up.png';
import DownIcon from '../assets/down.png';
import LeftIcon from '../assets/left.png';
import RightIcon from '../assets/right.png';
import WalkmanIconBlack from '../assets/walkman-logo.svg';
import WalkmanIconBlue from '../assets/walkman-logo-blue.svg';
import WalkmanIconPink from '../assets/walkman-logo-pink.svg';
import WalkmanIconRed from '../assets/walkman-logo-red.svg';
import WalkmanIconYellow from '../assets/walkman-logo-yellow.svg';
import WalkmanIconGreen from '../assets/walkman-logo-green.svg';
import SonyLogo from '../assets/sony-logo.svg';
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
  const [activeButton, setActiveButton] = useState(null);

  const getThemeLogo = () => {
    switch (theme.name) {
      case 'Blue':
        return WalkmanIconBlue;
      case 'Pink':
        return WalkmanIconPink;
      case 'Red':
        return WalkmanIconRed;
      case 'Yellow':
        return WalkmanIconYellow;
      case 'Green':
        return WalkmanIconGreen;
      default:
        return WalkmanIconBlack;
    }
  };

  const handleMouseDown = (button) => {
    setActiveButton(button);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  const handleNavigation = (direction) => {
    setActiveButton(direction);
    switch (currentScreen) {
      case 'home':
        onButtonPress(direction);
        break;
      case 'radio':
      case 'settings':
        if (direction === 'up' || direction === 'down' || direction === 'enter') {
          onButtonPress(direction);
        }
        break;
      case 'playlists':
        if (direction === 'up' || direction === 'down') {
          onButtonPress(direction);
        } else if (direction === 'enter') {
          onButtonPress('enter');
        }
        break;
      case 'weather':
        if (direction === 'enter') {
          onButtonPress('enter');
        }
        break;
      case 'pet':
        if (direction === 'up') {
          onButtonPress('feed');
        } else if (direction === 'down') {
          onButtonPress('play');
        } else if (direction === 'enter') {
          onButtonPress('sleep');
        }
        break;
      case 'visualizer':
        break;
      default:
        onButtonPress(direction);
    }
    setTimeout(() => setActiveButton(null), 150);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setActiveButton('up');
          handleNavigation('up');
          break;
        case 'ArrowDown':
          setActiveButton('down');
          handleNavigation('down');
          break;
        case 'ArrowLeft':
          setActiveButton('left');
          handleNavigation('left');
          break;
        case 'ArrowRight':
          setActiveButton('right');
          handleNavigation('right');
          break;
        case 'Enter':
        case ' ':
          setActiveButton('enter');
          handleNavigation('enter');
          break;
        case 'Backspace':
        case 'Escape':
          setActiveButton('back');
          onButtonPress('back');
          break;
        case 'Shift':
          setActiveButton('option');
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
  }, [currentScreen, onButtonPress]);

  const buttonStyle = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none'
  };

  return (
    <div className="walkman" style={{ background: theme.walkman.background }}>
      <div className="bezel">
        <div className="sony-logo"><img src={SonyLogo} alt="Sony" /></div>
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
          className={`button-back ${activeButton === 'back' ? 'active' : ''}`}
          style={{ 
            ...buttonStyle,
            background: activeButton === 'back' && theme.active ? 
              theme.active.buttonBack.background : 
              theme.buttonBack.background 
          }}
          onMouseDown={() => handleMouseDown('back')}
          onMouseUp={() => {
            handleMouseUp();
            onButtonPress('back');
          }}
          onMouseLeave={handleMouseUp}
          tabIndex="0"
        >
          BACK
        </div>
        <div
          className={`button-option ${activeButton === 'option' ? 'active' : ''}`}
          style={{ 
            ...buttonStyle,
            background: activeButton === 'option' && theme.active ? 
              theme.active.buttonOption.background : 
              theme.buttonOption.background 
          }}
          onMouseDown={() => handleMouseDown('option')}
          onMouseUp={() => {
            handleMouseUp();
            onButtonPress('option');
          }}
          onMouseLeave={handleMouseUp}
          tabIndex="0"
        >
          OPTION
        </div>
        <div className="button-home">HOME</div>
        <div className="button-power">POWER</div>
        <div className="navigation" style={{ background: theme.navigation.background }}>
          <button 
            className={`button-center ${activeButton === 'enter' ? 'active' : ''}`}
            style={{ 
              ...buttonStyle,
              background: activeButton === 'enter' && theme.active ? 
                theme.active.buttonCenter.background : 
                theme.buttonCenter.background 
            }}
            onMouseDown={() => handleMouseDown('enter')}
            onMouseUp={() => {
              handleMouseUp();
              handleNavigation('enter');
            }}
            onMouseLeave={handleMouseUp}
          >
            <div className="key-center-button" style={{ background: theme.keyButton.background }}></div>
            <img src={PlayIcon} alt="Play/Pause" />
          </button>
          <button 
            className={`button-up ${activeButton === 'up' ? 'active' : ''}`}
            style={{ 
              ...buttonStyle,
              ...(activeButton === 'up' && theme.active ? theme.active.buttonUp : {})
            }}
            onMouseDown={() => handleMouseDown('up')}
            onMouseUp={() => {
              handleMouseUp();
              handleNavigation('up');
            }}
            onMouseLeave={handleMouseUp}
          >
            <img src={UpIcon} alt="Up" />
          </button>
          <button 
            className={`button-down ${activeButton === 'down' ? 'active' : ''}`}
            style={{ 
              ...buttonStyle,
              ...(activeButton === 'down' && theme.active ? theme.active.buttonDown : {})
            }}
            onMouseDown={() => handleMouseDown('down')}
            onMouseUp={() => {
              handleMouseUp();
              handleNavigation('down');
            }}
            onMouseLeave={handleMouseUp}
          >
            <img src={DownIcon} alt="Down" />
          </button>
          <button 
            className={`button-left ${activeButton === 'left' ? 'active' : ''}`}
            style={{ 
              ...buttonStyle,
              ...(activeButton === 'left' && theme.active ? theme.active.buttonLeft : {})
            }}
            onMouseDown={() => handleMouseDown('left')}
            onMouseUp={() => {
              handleMouseUp();
              handleNavigation('left');
            }}
            onMouseLeave={handleMouseUp}
          >
            <img src={LeftIcon} alt="Left" />
          </button>
          <button 
            className={`button-right ${activeButton === 'right' ? 'active' : ''}`}
            style={{ 
              ...buttonStyle,
              ...(activeButton === 'right' && theme.active ? theme.active.buttonRight : {})
            }}
            onMouseDown={() => handleMouseDown('right')}
            onMouseUp={() => {
              handleMouseUp();
              handleNavigation('right');
            }}
            onMouseLeave={handleMouseUp}
          >
            <img src={RightIcon} alt="Right" />
          </button>
        </div>
      </div>
      <div className="walkman-logo">
        <img src={getThemeLogo()} alt="Walkman" />
      </div>
    </div>
  );
};

export default Walkman;
