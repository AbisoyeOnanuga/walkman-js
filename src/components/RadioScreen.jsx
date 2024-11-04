import React, { useState, useEffect } from 'react';

const RadioScreen = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/topclick/10')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching radio stations:', error));
  }, []);

  return (
    <div className="radio-screen">
      {stations.map(station => (
        <div key={station.stationuuid} className="station">
          <p>{station.name}</p>
          <audio controls>
            <source src={station.url} type="audio/mpeg" />
          </audio>
        </div>
      ))}
    </div>
  );
};

export default RadioScreen;
