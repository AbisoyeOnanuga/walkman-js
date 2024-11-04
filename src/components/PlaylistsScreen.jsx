import React from 'react';

const PlaylistsScreen = () => {
  return (
    <div className="playlists-screen">
      <iframe
        src="https://m.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/playlists"
        title="YouTube Playlists"
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlaylistsScreen;
