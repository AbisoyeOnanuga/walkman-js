// Miniplayer.jsx
import React, { useState, useRef } from 'react';
import './Miniplayer.css';

const Miniplayer = ({ playing, setPlaying, youtubePlayer, isMiniplayer }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, left: 0 });
  const miniplayerRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    const newLeft = e.clientX - miniplayerRef.current.offsetWidth / 2;
    const newTop = e.clientY - miniplayerRef.current.offsetHeight / 2;
    setPosition({
      top: Math.max(0, Math.min(newTop, window.innerHeight - miniplayerRef.current.offsetHeight)),
      left: Math.max(0, Math.min(newLeft, window.innerWidth - miniplayerRef.current.offsetWidth)),
      bottom: 'auto',
      right: 'auto',
    });
  };

  const handleResize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setPosition({ bottom: 0, left: 0 });
    }
  };

  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`miniplayer ${playing && isMiniplayer ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={position}
      ref={miniplayerRef}
      onMouseDown={handleMouseDown}
    >
      <div id="youtube-player-miniplayer"></div>
      <button className="resize-button" onClick={handleResize}>
        {isMinimized ? 'Expand' : 'Minimize'}
      </button>
    </div>
  );
};

export default Miniplayer;
