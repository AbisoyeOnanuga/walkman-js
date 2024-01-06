// RadioScreen.jsx
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import { RADIO_STATIONS } from '../data/radioStations';
import './RadioScreen.css';

const RadioScreen = ({ playing, currentStation, onStationPlay }) => {
  const stationsListRef = useRef(null);
  const selectedStationRef = useRef(null);

  useEffect(() => {
    if (selectedStationRef.current && stationsListRef.current) {
      selectedStationRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentStation]);

  return (
    <div className="radio-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className="stations-list" ref={stationsListRef}>
          {RADIO_STATIONS.map(station => (
            <div 
              key={station.name} 
              ref={currentStation?.name === station.name ? selectedStationRef : null}
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