// PopupPlayer.jsx
import React, { useEffect, useState, useRef } from 'react';
import './PopupPlayer.css';

const PLAYLISTS = [
  {
    id: 'playlist1',
    title: 'Lofi Loft Mix',
    videoId: 'rKGRuQBnatM',
    listId: 'RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM',
    thumbnail: 'https://i.ytimg.com/vi/rKGRuQBnatM/default.jpg'
  },
  // Add other playlists here
];

const PopupPlayer = ({ playing, setPlaying, youtubePlayer, setYoutubePlayer, isPopupPlayer, closePopup }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, right: 0 });
  const playerRef = useRef(null);

  useEffect(() => {
    if (isPopupPlayer && youtubePlayer) {
      document.getElementById('popup-player').appendChild(youtubePlayer.getIframe());
      youtubePlayer.playVideo();
    } else if (youtubePlayer && playerRef.current) {
      document.querySelector('.player-container').appendChild(youtubePlayer.getIframe());
    }
  }, [isPopupPlayer, youtubePlayer]);

  const handleDrag = (e) => {
    e.preventDefault();
    const newLeft = e.clientX - playerRef.current.offsetWidth / 2;
    const newTop = e.clientY - playerRef.current.offsetHeight / 2;
    setPosition({
      top: Math.max(0, Math.min(newTop, window.innerHeight - playerRef.current.offsetHeight)),
      left: Math.max(0, Math.min(newLeft, window.innerWidth - playerRef.current.offsetWidth)),
      bottom: 'auto',
      right: 'auto',
    });
  };

  const handleResize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setPosition({ bottom: 0, right: 0 });
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
      className={`popup-player ${playing === 'popupPlayer' && isPopupPlayer ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={position}
      ref={playerRef}
      onMouseDown={handleMouseDown}
    >
      <div id="popup-player"></div>
      <button className="resize-button" onClick={handleResize}>
        {isMinimized ? 'Expand' : 'Minimize'}
      </button>
      <button className="close-button" onClick={closePopup}>
        &times;
      </button>
    </div>
  );
};

export default PopupPlayer;
