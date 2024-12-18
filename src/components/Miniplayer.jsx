// Miniplayer.jsx
import React, { useState, useRef } from 'react';
import './Miniplayer.css';

const Miniplayer = ({ playing, setPlaying, youtubePlayer }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const miniplayerRef = useRef(null);

  const handleDrag = (e) => {
    setPosition({ top: e.clientY - 50, left: e.clientX - 50 });
  };

  const handleResize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`miniplayer ${playing ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{ top: position.top, left: position.left }}
      ref={miniplayerRef}
      onMouseDown={handleDrag}
    >
      <div id="youtube-player-miniplayer"></div>
      <button className="resize-button" onClick={handleResize}>
        {isMinimized ? 'Expand' : 'Minimize'}
      </button>
    </div>
  );
};

export default Miniplayer;
