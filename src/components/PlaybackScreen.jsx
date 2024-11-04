import React, { useState, useEffect } from 'react';

const PlaybackScreen = () => {
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    // Fetch the currently playing video from YouTube's Data API
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=CURRENT_PLAYING_VIDEO_ID&key=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => setPlayingVideo(data.items[0]))
      .catch(error => console.error('Error fetching playing video:', error));
  }, []);

  return (
    <div className="playback-screen">
      {playingVideo ? (
        <div className="video">
          <iframe
            src={`https://www.youtube.com/embed/${playingVideo.id}`}
            title={playingVideo.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>{playingVideo.snippet.title}</p>
        </div>
      ) : (
        <p>No video currently playing.</p>
      )}
    </div>
  );
};

export default PlaybackScreen;
