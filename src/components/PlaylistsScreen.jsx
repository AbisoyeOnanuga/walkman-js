import React from 'react';

const PlaylistsScreen = () => {
  return (
    <div className="playlists-screen">
      <iframe
        width="100%" height="100%"
        src="https://www.youtube.com/embed/rKGRuQBnatM?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM"
        title="why dont we"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
      ></iframe>
    </div>
  );
};

export default PlaylistsScreen;
