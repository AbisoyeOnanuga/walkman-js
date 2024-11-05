import React, { useState, useEffect } from 'react';

const MusicScreen = ({ setPlaying }) => {
  const [videos, setVideos] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=${apiKey}`)
      .then(response => response.json())
      .then(data => setVideos(data.items || []))
      .catch(error => console.error('Error fetching YouTube videos:', error));
  }, []);

  return (
    <div className="music-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      {videos.length === 0 ? (
        <p>No videos available.</p>
        ) : (
        videos.map(video => (
          <div key={video.id.videoId} className="video">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              style={{ width: '100%', height: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setPlaying && setPlaying('music')}
            ></iframe>
            <p>{video.snippet.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MusicScreen;