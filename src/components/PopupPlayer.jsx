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

const PopupPlayer = ({ playing, setPlaying, youtubePlayer, setYoutubePlayer }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, right: 0 });
  const playerRef = useRef(null);

  useEffect(() => {
    const initPlayer = () => {
      if (PLAYLISTS.length > 0) {
        const player = new window.YT.Player('popup-player', {
          height: '100%',
          width: '100%',
          videoId: PLAYLISTS[0].videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            list: PLAYLISTS[0].listId
          },
          events: {
            onReady: (event) => {
              setYoutubePlayer(event.target);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setPlaying('popupPlayer');
              } else if (event.data === window.YT.PlayerState.PAUSED || 
                        event.data === window.YT.PlayerState.ENDED) {
                setPlaying(null);
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {};
  }, [setYoutubePlayer, setPlaying]);

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
      className={`popup-player ${playing === 'popupPlayer' ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={position}
      ref={playerRef}
      onMouseDown={handleMouseDown}
    >
      <div id="popup-player"></div>
      <button className="resize-button" onClick={handleResize}>
        {isMinimized ? 'Expand' : 'Minimize'}
      </button>
    </div>
  );
};

export default PopupPlayer;
