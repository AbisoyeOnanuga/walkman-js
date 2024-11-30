import React from 'react';
import { useTheme } from '../context/ThemeContext';
import icon1 from '../assets/photos.png';
import icon2 from '../assets/music.png';
import icon3 from '../assets/radio.png';
import icon4 from '../assets/settings.png';
import icon5 from '../assets/playlists.png';
import icon6 from '../assets/playback.png';
import icon7 from '../assets/play-status.svg';
import icon9 from '../assets/song-status.svg';
import icon10 from '../assets/battery.svg';

const HomeScreen = ({ selectedIcon, onButtonPress }) => {
  const { theme } = useTheme();
  const icons = [
    { src: icon1, label: 'Photos' },
    { src: icon2, label: 'Music' }, 
    { src: icon3, label: 'Radio' }, 
    { src: icon4, label: 'Settings' }, 
    { src: icon5, label: 'Playlists' },
    { src: icon6, label: 'Playback' },
  ];

  return (
    <div className="home-screen">
      <div className="header">
        <div className="status-icon">
          <div className="song-status"><img src={icon7} alt="Play Status" /></div>
          <div className="song-status"><img src={icon9} alt="Song Status" /></div>
        </div>
        <div className="battery-icon"><img src={icon10} alt="Battery Status" /></div>
      </div>
      <div className="screen-content">
        <div className="grid">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`icon ${icon.label.toLowerCase().replace(/\s+/g, '-')} ${selectedIcon === index ? 'glow' : ''}`}
              onClick={() => onButtonPress(icon.src, index)}
            >
              <img className="icon" src={icon.src} alt={icon.label} />
            </div>
          ))}
        </div>
        <div className="highlighted-text">{icons[selectedIcon] && icons[selectedIcon].label}</div>
      </div>
    </div>
  );
};

export default HomeScreen;
