import React from 'react';

const Playlist = ({ tracks }) => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
