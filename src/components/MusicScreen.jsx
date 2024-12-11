import React, { useState, useEffect } from 'react';
import Header from './Header';
import './MusicScreen.css';

const MusicScreen = ({ playing, setPlaying }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize YouTube Player
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('music-player', {
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            setYoutubePlayer(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying('music');
            } else if (event.data === window.YT.PlayerState.PAUSED || 
                     event.data === window.YT.PlayerState.ENDED) {
              setPlaying(null);
            }
          }
        }
      });
    };

    // Cleanup
    return () => {
      if (youtubePlayer) {
        youtubePlayer.destroy();
      }
    };
  }, [setPlaying]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
    setLoading(false);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    if (youtubePlayer && youtubePlayer.loadVideoById) {
      youtubePlayer.loadVideoById(video.id.videoId);
    } else {
      // If player isn't ready yet, reinitialize with the selected video
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player('music-player', {
          height: '100%',
          width: '100%',
          videoId: video.id.videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
          },
          events: {
            onReady: (event) => {
              setYoutubePlayer(event.target);
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setPlaying('music');
              } else if (event.data === window.YT.PlayerState.PAUSED || 
                       event.data === window.YT.PlayerState.ENDED) {
                setPlaying(null);
              }
            }
          }
        });
      };
    }
  };

  return (
    <div className="music-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search YouTube..."
          />
          <button onClick={handleSearch} className="search-button">
            <span>⌕</span>
          </button>
        </div>

        {selectedVideo && (
          <div className="player-container">
            <div id="music-player"></div>
          </div>
        )}

        <div className="search-results">
          {loading && <div className="loading">Searching...</div>}
          {searchResults.map((video) => (
            <div
              key={video.id.videoId}
              className={`video-item ${selectedVideo?.id.videoId === video.id.videoId ? 'active' : ''}`}
              onClick={() => handleVideoSelect(video)}
            >
              <div className="video-thumbnail">
                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
              </div>
              <div className="video-info">
                <div className="video-title">{video.snippet.title}</div>
                <div className="video-channel">{video.snippet.channelTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicScreen;