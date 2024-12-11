import React, { useState, useEffect } from 'react';
import Header from './Header';
import './PetScreen.css';

const PET_STATES = {
  IDLE: 'idle',
  HAPPY: 'happy',
  HUNGRY: 'hungry',
  SLEEPING: 'sleeping'
};

const PetScreen = ({ playing }) => {
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [petState, setPetState] = useState(PET_STATES.IDLE);
  const [lastFed, setLastFed] = useState(Date.now());
  const [lastPlayed, setLastPlayed] = useState(Date.now());

  // Update pet stats over time
  useEffect(() => {
    const timer = setInterval(() => {
      setHunger(prev => Math.max(0, prev - 0.1));
      setHappiness(prev => Math.max(0, prev - 0.05));
      setEnergy(prev => Math.max(0, prev - 0.08));
      
      // Update pet state based on stats
      if (energy < 20) {
        setPetState(PET_STATES.SLEEPING);
      } else if (hunger < 30) {
        setPetState(PET_STATES.HUNGRY);
      } else if (happiness < 30) {
        setPetState(PET_STATES.IDLE);
      } else {
        setPetState(PET_STATES.HAPPY);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const feedPet = () => {
    if (Date.now() - lastFed > 5000) { // 5 second cooldown
      setHunger(prev => Math.min(100, prev + 30));
      setLastFed(Date.now());
    }
  };

  const playWithPet = () => {
    if (Date.now() - lastPlayed > 3000) { // 3 second cooldown
      setHappiness(prev => Math.min(100, prev + 20));
      setEnergy(prev => Math.max(0, prev - 10));
      setLastPlayed(Date.now());
    }
  };

  const letPetSleep = () => {
    setPetState(PET_STATES.SLEEPING);
    setEnergy(prev => Math.min(100, prev + 50));
  };

  const renderPet = () => {
    // Simple ASCII art pet for now - we can replace with pixel art later
    switch (petState) {
      case PET_STATES.HAPPY:
        return '(^‿^)';
      case PET_STATES.HUNGRY:
        return '(╥﹏╥)';
      case PET_STATES.SLEEPING:
        return '(－‸－)';
      default:
        return '(・_・)';
    }
  };

  return (
    <div className="pet-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className="pet-stats">
          <div className="stat">❤️ {Math.round(happiness)}%</div>
          <div className="stat">🍖 {Math.round(hunger)}%</div>
          <div className="stat">⚡ {Math.round(energy)}%</div>
        </div>
        
        <div className="pet-display">
          <div className="pet-character">{renderPet()}</div>
        </div>

        <div className="pet-controls">
          <button onClick={feedPet}>Feed</button>
          <button onClick={playWithPet}>Play</button>
          <button onClick={letPetSleep}>Sleep</button>
        </div>
      </div>
    </div>
  );
};

export default PetScreen; 