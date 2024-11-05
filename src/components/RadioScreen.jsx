import React, { useState, useEffect } from 'react';

const RadioScreen = ({ setPlaying, playing }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/topclick/10')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching radio stations:', error));
  }, []);

  return (
    <div className="radio-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      {stations.map(station => (
        <div key={station.stationuuid} className="station">
          <p>{station.name}</p>
          <audio controls onPlay={() => setPlaying && setPlaying('radio')} style={{ width: '100%', height: '30%' }}>
            <source src={station.url} type="audio/mpeg" />
          </audio>
        </div>
      ))}
    </div>
  );
};

export default RadioScreen;
