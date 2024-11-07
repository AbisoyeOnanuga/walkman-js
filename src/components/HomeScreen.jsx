import React from 'react';
import icon1 from '../assets/photos.png';
import icon2 from '../assets/music.png';
import icon3 from '../assets/radio.png';
import icon4 from '../assets/settings.png';
import icon5 from '../assets/playlists.png';
import icon6 from '../assets/playback.png';
import icon7 from '../assets/play-pause.svg';
import icon8 from '../assets/song-status.svg';
import icon9 from '../assets/battery.svg';

const HomeScreen = ({ selectedIcon, onButtonPress }) => {
  const icons = [
    { src: icon1, label: 'Photos' },
    { src: icon2, label: 'Music' }, 
    { src: icon3, label: 'Radio' }, 
    { src: icon4, label: 'Settings' }, 
    { src: icon5, label: 'Playlist' },
    { src: icon6, label: 'Playback' },
  ];

  const icons_status = [
    {src: icon7, label: 'play-pause'},
    {src: icon8, label: 'song-status'},
    {src: icon9, label: 'battery'},
  ]

  return (
    <div className="home-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"><img className="icon-status" src={icon7} alt={icon7.label} /></div>
          <div className="song-status"><img className="icon-status" src={icon8} alt={icon8.label} /></div>
        </div>
        <div className="battery-icon"><img className="icon-status" src={icon9} alt={icon9.label} /></div>
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
