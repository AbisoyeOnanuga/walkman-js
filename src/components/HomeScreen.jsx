import React from 'react';
import icon1 from '../assets/song.svg';
import icon2 from '../assets/playlist.svg';


const HomeScreen = ({ selectedIcon, onButtonPress }) => {
  const icons = [
    { src: icon1, label: 'Icon 1' },
    { src: icon2, label: 'Icon 2' }, // add other icons here
   ];

  return (
    <div className="home-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        <div className="grid">
          {icons.map((icon, index) => (
            <div key={index} className={`icon ${icon.toLowerCase()} ${selectedIcon === index ? 'glow' : ''}`}             
            onClick={() => onButtonPress(icon.screen, index)}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className="highlighted-text">Selected: {icons[selectedIcon]}</div>
      </div>
    </div>
  );
};

export default HomeScreen;
