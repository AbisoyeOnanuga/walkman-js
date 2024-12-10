import React, { useEffect, useRef } from 'react';
import './PersistentPlayer.css';

const PersistentPlayer = ({ setPlaying, isVisible }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying('playlists');
            } else if (event.data === window.YT.PlayerState.PAUSED || 
                     event.data === window.YT.PlayerState.ENDED) {
              setPlaying(null);
            }
          }
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [setPlaying]);

  return (
    <div className="player-container">
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/rKGRuQBnatM?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM&enablejsapi=1"
        title="why dont we"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PersistentPlayer; 