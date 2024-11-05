import React, { useEffect } from 'react';

const PlaylistsScreen = ({ setPlaying, playing }) => {
  useEffect(() => {
    if (playing === 'playlists') {
      // Logic to resume playing content if previously playing
    }
  }, [playing]);

  return (
    <div className="playlists-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        <iframe
          width="100%" height="100%"
          src="https://www.youtube.com/embed/rKGRuQBnatM?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM"
          title="why dont we"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
          onLoad={() => setPlaying('playlists')}
        ></iframe>
      </div>
    </div>
  );
};

export default PlaylistsScreen;
