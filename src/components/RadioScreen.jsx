// RadioScreen.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './RadioScreen.css';

const RADIO_STATIONS = [
  {
    name: "CNN",
    url: "https://tunein.cdnstream1.com/2868_96.mp3",
    favicon: "https://www.cnn.com/media/sites/cnn/favicon.ico",
    tags: ["news"],
    country: "USA"
  },
  {
    name: "Adroit Jazz Underground",
    url: "https://icecast.walmradio.com:8443/jazz",
    favicon: "https://icecast.walmradio.com:8443/jazz.jpg",
    tags: ["jazz", "avant-garde", "bebop", "big band"],
    country: "USA"
  },
  {
    name: "Classic Vinyl HD",
    url: "https://icecast.walmradio.com:8443/classic",
    favicon: "https://icecast.walmradio.com:8443/classic.jpg",
    tags: ["classic", "vinyl", "oldies", "easy listening"],
    country: "USA"
  },
  {
    name: "BBC World Service",
    url: "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    favicon: "http://cdn-profiles.tunein.com/s24948/images/logoq.jpg",
    tags: ["news", "talk"],
    country: "UK"
  },
  {
    name: "101 SMOOTH JAZZ",
    url: "http://www.101smoothjazz.com/101-smoothjazz.m3u",
    favicon: "http://101smoothjazz.com/favicon.ico",
    tags: ["jazz", "smooth jazz", "easy listening"],
    country: "USA"
  },
  {
    name: "Deutschlandfunk",
    url: "http://st01.dlf.de/dlf/01/128/mp3/stream.mp3",
    favicon: "http://www.deutschlandfunk.de/static/img/deutschlandfunk/icons/apple-touch-icon-128x128.png",
    tags: ["news", "culture", "information"],
    country: "Germany"
  },
  {
    name: "Radio Paradise",
    url: "http://stream-uk1.radioparadise.com/aac-320",
    favicon: "https://www.radioparadise.com/favicon-32x32.png",
    tags: ["eclectic", "mix", "non-commercial"],
    country: "USA"
  },
  {
    name: "Christmas Vinyl HD",
    url: "https://icecast.walmradio.com:8443/christmas",
    favicon: "https://icecast.walmradio.com:8443/christmas.png",
    tags: ["christmas", "holiday", "seasonal", "easy listening"],
    country: "USA"
  },
  {
    name: "WALM - Old Time Radio",
    url: "https://icecast.walmradio.com:8443/otr",
    favicon: "https://icecast.walmradio.com:8443/otr.jpg",
    tags: ["classic", "vintage", "drama", "comedy"],
    country: "USA"
  },
  {
    name: "Europa Plus",
    url: "http://ep256.hostingradio.ru:8052/europaplus256.mp3",
    favicon: "http://liveam.tv/img/2494.jpg",
    tags: ["dance", "house", "pop"],
    country: "Russia"
  },
  {
    name: "SWR3",
    url: "https://liveradio.swr.de/sw282p3/swr3/play.mp3",
    favicon: "https://swr3.de/assets/swr3/icons/apple-touch-icon.png",
    tags: ["news", "pop", "rock"],
    country: "Germany"
  },
  {
    name: "1LIVE",
    url: "http://wdr-1live-live.icecast.wdr.de/wdr/1live/live/mp3/128/stream.mp3",
    favicon: "https://www1.wdr.de/radio/1live/resources/img/favicon/apple-touch-icon.png",
    tags: ["rock", "top 40", "public radio"],
    country: "Germany"
  },
  {
    name: "Fox News Radio",
    url: "https://live.amperwave.net/direct/foxnewsradio-foxnewsradioaac-imc",
    favicon: "https://static.foxnews.com/radio.foxnews.com/content/uploads/2017/10/default_logo-150x150.png",
    tags: ["news"],
    country: "USA"
  },
  {
    name: "LBC UK",
    url: "http://media-ice.musicradio.com/LBCUK",
    favicon: "https://cdn-radiotime-logos.tunein.com/s220687q.png",
    tags: ["news talk", "talk"],
    country: "UK"
  },
  {
    name: "Classic FM UK",
    url: "http://ice-the.musicradio.com/ClassicFMMP3",
    favicon: "http://www.classicfm.com/assets_v4r/classic/img/favicon-196x196.png",
    tags: ["classical"],
    country: "UK"
  },
  {
    name: "NPR 24 Hour Program Stream",
    url: "http://npr-ice.streamguys1.com/live.mp3",
    favicon: "https://static-assets.npr.org/static/images/favicon/favicon-96x96.png",
    tags: ["news", "public radio", "talk"],
    country: "USA"
  },
  {
    name: "SomaFM Groove Salad",
    url: "http://ice1.somafm.com/groovesalad-256-mp3",
    favicon: "https://somafm.com/img3/groovesalad-400.jpg",
    tags: ["ambient", "chillout", "downtempo"],
    country: "USA"
  },
  {
    name: "Ambient Sleeping Pill",
    url: "http://radio.stereoscenic.com/asp-h",
    favicon: "https://ambientsleepingpill.com/wp-content/uploads/cropped-asp-small-logo-512-trans-180x180.png",
    tags: ["ambient", "meditation", "sleep"],
    country: "USA"
  }
];

const RadioScreen = ({ playing, currentStation, onStationPlay }) => {
  const [stations] = useState(RADIO_STATIONS);

  return (
    <div className="radio-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className="stations-list">
          {stations.map(station => (
            <div 
              key={station.name} 
              className={`station ${currentStation?.name === station.name ? 'active' : ''}`}
              onClick={() => onStationPlay(station)}
            >
              <div className="station-icon">
                <img src={station.favicon} alt={station.name} />
              </div>
              <div className="station-info">
                <div className="station-name">{station.name}</div>
                <div className="station-tags">
                  {station.tags.join(' • ')}
                </div>
              </div>
              <div className="station-status">
                {currentStation?.name === station.name ? '▶' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioScreen;