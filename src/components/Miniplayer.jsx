// Miniplayer.jsx
import React, { useState, useRef } from 'react';
import './Miniplayer.css';

const Miniplayer = ({ playing, setPlaying, youtubePlayer }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const miniplayerRef = useRef(null);

  const handleResize = () => {
    setIsMinimized(!isMinimized);
  };

  const snapToPosition = () => {
    const miniplayer = miniplayerRef.current;
    const { top, left } = miniplayer.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (isMinimized) {
      // Snap to corners when minimized
      const newTop = top < screenHeight / 2 ? 0 : screenHeight - 100;
      const newLeft = left < screenWidth / 2 ? 0 : screenWidth - 100;
      miniplayer.style.top = `${newTop}px`;
      miniplayer.style.left = `${newLeft}px`;
    } else {
      // Snap to bottom or top when in full-width mode
      const newTop = top < screenHeight / 2 ? 0 : screenHeight - 100;
      miniplayer.style.top = `${newTop}px`;
      miniplayer.style.left = '0';
    }
  };

  return (
    <div
      className={`miniplayer ${playing ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      ref={miniplayerRef}
      onMouseUp={snapToPosition}
    >
      <div id="youtube-player-miniplayer"></div>
      <button className="resize-button" onClick={handleResize}>
        {isMinimized ? 'Expand' : 'Minimize'}
      </button>
    </div>
  );
};

export default Miniplayer;
