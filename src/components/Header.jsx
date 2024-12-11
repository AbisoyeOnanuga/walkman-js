import React from 'react';
import icon7 from '../assets/play-status.svg';
import icon9 from '../assets/song-status.svg';
import icon10 from '../assets/battery.svg';
import './Header.css';

const Header = ({ playing }) => {
  return (
    <div className="header">
      <div className="status-icon">
        <div className="song-status">
          <img 
            src={icon7} 
            alt="Play Status" 
            className={playing ? 'active' : ''} 
          />
        </div>
        <div className="song-status">
          <img src={icon9} alt="Song Status" />
          {playing && <span className="status-text">{playing}</span>}
        </div>
      </div>
      <div className="battery-icon">
        <img src={icon10} alt="Battery Status" />
      </div>
    </div>
  );
};

export default Header; 