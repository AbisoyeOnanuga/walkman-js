import React from 'react';

const MusicScreen = () => {
  return (
    <div className="music-screen">
      <iframe
        src="https://m.youtube.com/"
        title="YouTube"
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MusicScreen;
