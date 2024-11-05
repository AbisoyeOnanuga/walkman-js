// RadioScreen.jsx
import React, { useState, useEffect } from 'react';

const RadioScreen = ({ setCurrentAudio }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/topclick/10')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching radio stations:', error));
  }, []);

  const handlePlay = (station) => {
    if (typeof setCurrentAudio === 'function') {
      setCurrentAudio(station);
    } else {
      console.error('setCurrentAudio is not a function');
    }
  };

  return (
    <div className="radio-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        {stations.map(station => (
          <div key={station.stationuuid} className="station">
            <p>{station.name}</p>
            <button onClick={() => handlePlay(station)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioScreen;
