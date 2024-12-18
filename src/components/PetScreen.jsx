import React, { useState, useEffect } from 'react';
import Header from './Header';
import idleBird from '../assets/idleBird.svg';
import happyBird from '../assets/happyBird.svg';
import hungryBird from '../assets/hungryBird.svg';
import sleepingBird from '../assets/sleepingBird.svg';
import eatingBird from '../assets/eatingBird.svg';
import playingBird from '../assets/playingBird.svg';
import excitedBird from '../assets/excitedBird.svg';
import './PetScreen.css';

const PET_STATES = {
  IDLE: 'idle',
  HAPPY: 'happy',
  HUNGRY: 'hungry',
  SLEEPING: 'sleeping',
  EATING: 'eating',
  PLAYING: 'playing',
  EXCITED: 'excited'
};

const PET_PIXELS = {
  idle: [idleBird, happyBird, hungryBird], // Multiple idle states
  happy: happyBird,
  hungry: hungryBird,
  sleeping: sleepingBird,
  eating: eatingBird,
  playing: playingBird,
  excited: excitedBird
};

const CAPTIONS = {
  eating: 'nom! nom!',
  sleeping: 'zzz...',
  playing: 'tweet tweet!',
  happy: 'chirp! chirp!',
  hungry: 'feed me!',
  excited: 'woo hoo!'
};

// Updated ANIMATIONS with placeholders
const ANIMATIONS = {
  dance: [playingBird, playingBird],
  jump: [happyBird, happyBird],
  spin: [excitedBird, excitedBird, excitedBird, excitedBird]
};

const PetScreen = ({ playing }) => {
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [petState, setPetState] = useState(PET_STATES.IDLE);
  const [lastFed, setLastFed] = useState(Date.now());
  const [lastPlayed, setLastPlayed] = useState(Date.now());
  const [animation, setAnimation] = useState(null);
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [idleFrame, setIdleFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHunger(prev => Math.max(0, prev - 0.1));
      setHappiness(prev => Math.max(0, prev - 0.05));
      setEnergy(prev => Math.max(0, prev - 0.08));
      
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

  useEffect(() => {
    if (currentAnimation) {
      const frames = ANIMATIONS[currentAnimation];
      const interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % frames.length);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentAnimation]);

  useEffect(() => {
    if (!animation && petState === PET_STATES.IDLE && PET_PIXELS.idle.length > 1) {
      const interval = setInterval(() => {
        setIdleFrame(prev => (prev + 1) % PET_PIXELS.idle.length);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [animation, petState]);

  const feedPet = () => {
    if (Date.now() - lastFed > 5000) {
      setAnimation('eating');
      setTimeout(() => {
        setAnimation(null);
        if (hunger > 70) {
          setPetState(PET_STATES.EXCITED);
          setCurrentAnimation('dance');
          setTimeout(() => {
            setPetState(PET_STATES.HAPPY);
            setCurrentAnimation(null);
          }, 2000);
        }
      }, 2000);
      
      setHunger(prev => Math.min(100, prev + 30));
      setLastFed(Date.now());
    }
  };

  const playWithPet = () => {
    if (Date.now() - lastPlayed > 3000) {
      setAnimation('playing');
      setCurrentAnimation('jump');
      setTimeout(() => {
        setAnimation(null);
        if (happiness > 70) {
          setPetState(PET_STATES.EXCITED);
          setCurrentAnimation('spin');
          setTimeout(() => {
            setPetState(PET_STATES.HAPPY);
            setCurrentAnimation(null);
          }, 2000);
        }
      }, 2000);
      
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
    const currentState = animation || petState;
    let displayArt;

    if (currentAnimation && ANIMATIONS[currentAnimation]) {
      displayArt = ANIMATIONS[currentAnimation][animationFrame % ANIMATIONS[currentAnimation].length];
    } else if (currentState === PET_STATES.IDLE && PET_PIXELS.idle.length > 1) {
      displayArt = PET_PIXELS.idle[idleFrame];
    } else {
      displayArt = PET_PIXELS[currentState];
    }

    return (
      <>
        <img src={displayArt} alt={currentState} className={`pet-pixel-art ${currentState}`} />
        {CAPTIONS[currentState] && (
          <div className="pet-caption">{CAPTIONS[currentState]}</div>
        )}
      </>
    );
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
