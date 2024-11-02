import React, { useState } from 'react';
import Walkman from './components/Walkman';
import './App.css';

const App = () => {
  const [screenContent, setScreenContent] = useState('Welcome to Walkman-js');

  const handleButtonPress = (button) => {
    switch (button) {
      case 'up':
        setScreenContent('Up button pressed');
        break;
      case 'down':
        setScreenContent('Down button pressed');
        break;
      case 'left':
        setScreenContent('Left button pressed');
        break;
      case 'right':
        setScreenContent('Right button pressed');
        break;
      case 'enter':
        setScreenContent('Enter button pressed');
        break;
      case 'back':
        setScreenContent('Back button pressed');
        break;
      case 'option':
        setScreenContent('Option button pressed');
        break;
      case 'home':
        setScreenContent('Home button pressed');
        break;
      case 'power':
        setScreenContent('Power button pressed');
        break;
      default:
        setScreenContent('Welcome to Walkman-js');
    }
  };

  return (
    <div className="app">
      <Walkman screenContent={screenContent} onButtonPress={handleButtonPress} />
    </div>
  );
};

export default App;
