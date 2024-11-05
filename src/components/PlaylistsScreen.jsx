import React from 'react';

const PlaylistsScreen = ({ setPlaying, playing }) => {
  return (
    <div className="playlists-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
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
  );
};

export default PlaylistsScreen;
