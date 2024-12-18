import React from 'react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import Miniplayer from './Miniplayer';
import icon1 from '../assets/pet.png';
import icon2 from '../assets/visualizer.png';
import icon3 from '../assets/radio.png';
import icon4 from '../assets/settings.png';
import icon5 from '../assets/playlists.png';
import icon6 from '../assets/weather.png';

const HomeScreen = ({ selectedIcon, onButtonPress, playing, setPlaying, youtubePlayer }) => {
  const { theme } = useTheme();
  const icons = [
    { src: icon1, label: 'Pet' },
    { src: icon2, label: 'Visualizer' }, 
    { src: icon3, label: 'Radio' }, 
    { src: icon4, label: 'Settings' }, 
    { src: icon5, label: 'Playlists' },
    { src: icon6, label: 'Weather' },
  ];

  return (
    <div className="home-screen">
      <Header playing={playing} />
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
        <Miniplayer playing={playing} setPlaying={setPlaying} youtubePlayer={youtubePlayer} />
        <div className="highlighted-text">{icons[selectedIcon] && icons[selectedIcon].label}</div>
      </div>
    </div>
  );
};

export default HomeScreen;
