import React, { useEffect, useState } from 'react';
import Header from './Header';
import Miniplayer from './Miniplayer';
import './PlaylistsScreen.css';

const PLAYLISTS = [
  {
    id: 'playlist1',
    title: 'Lofi Loft Mix',
    videoId: 'rKGRuQBnatM',
    listId: 'RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM',
    thumbnail: 'https://i.ytimg.com/vi/rKGRuQBnatM/default.jpg'
  },
  {
    id: 'playlist2',
    title: 'Take It Easy Rock',
    videoId: 'SebH8En9ZOY',
    listId: 'RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI',
    thumbnail: 'https://i.ytimg.com/vi/SebH8En9ZOY/default.jpg'
  },
  {
    id: 'playlist3',
    title: 'Lofi Hip Hop',
    videoId: 'jfKfPfyJRdk',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/default.jpg'
  },
  {
    id: 'playlist4',
    title: 'Classical Mix',
    videoId: 'mIYzp5rcTvU',
    thumbnail: 'https://i.ytimg.com/vi/mIYzp5rcTvU/default.jpg'
  },
  {
    id: 'playlist5',
    title: 'Jazz Vibes',
    videoId: 'Dx5qFachd3A',
    thumbnail: 'https://i.ytimg.com/vi/Dx5qFachd3A/default.jpg'
  },
  {
    id: 'playlist6',
    title: 'Piano Relaxation',
    videoId: '77ZozI0rw7w',
    thumbnail: 'https://i.ytimg.com/vi/77ZozI0rw7w/default.jpg'
  }
]; 

const PlaylistsScreen = ({ playing, setPlaying, currentPlaylist, onPlaylistPlay, setYoutubePlayer, youtubePlayer }) => {
  const [isMiniplayer, setIsMiniplayer] = useState(false);
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (PLAYLISTS.length > 0) {
        const player = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: PLAYLISTS[0].videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            list: PLAYLISTS[0].listId
          },
          events: {
            onReady: (event) => {
              setYoutubePlayer(event.target);
              setIsPlayerInitialized(true);
            },
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
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {};
  }, [setYoutubePlayer, setPlaying]);

  const toggleMiniplayer = () => {
    setIsMiniplayer(!isMiniplayer);
  };

  return (
    <div className="playlists-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className={`player-container ${isMiniplayer ? 'hidden' : ''}`}>
          <div id="youtube-player"></div>
          {isPlayerInitialized && (
            <button className="minimize-button" onClick={toggleMiniplayer}>
              Minimize
            </button>
          )}
        </div>
        <Miniplayer playing={playing} setPlaying={setPlaying} youtubePlayer={youtubePlayer} isMiniplayer={isMiniplayer} />
        <div className="playlists-list">
          {PLAYLISTS.map(playlist => (
            <div 
              key={playlist.id}
              className={`playlist ${currentPlaylist?.id === playlist.id ? 'active' : ''}`}
              onClick={() => onPlaylistPlay(playlist)}
            >
              <div className="playlist-thumbnail">
                <img src={playlist.thumbnail} alt={playlist.title} />
              </div>
              <div className="playlist-info">
                <div className="playlist-title">{playlist.title}</div>
              </div>
              <div className="playlist-status">
                {currentPlaylist?.id === playlist.id ? '▶' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsScreen;
