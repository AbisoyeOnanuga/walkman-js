import React, { useState } from 'react';
import Walkman from './components/Walkman';
import './App.css';

const App = () => {
  const [screenContent, setScreenContent] = useState('Welcome to Walkman-js');
  const [selectedIcon, setSelectedIcon] = useState(1); // Index of the selected icon, starting with Music

  const icons = ['Photos', 'Music', 'FM Radio', 'Settings', 'Playlists', 'Playback'];
  
  const handleButtonPress = (button) => {
    let newIndex = selectedIcon;
    switch (button) {
      case 'up':
        newIndex = (selectedIcon - 3 + 6) % 6; // Moving up in a 2x3 grid
        break;
      case 'down':
        newIndex = (selectedIcon + 3) % 6; // Moving down in a 2x3 grid
        break;
      case 'left':
        newIndex = (selectedIcon - 1 + 6) % 6; // Moving left in a row
        break;
      case 'right':
        newIndex = (selectedIcon + 1) % 6; // Moving right in a row
        break;
      case 'enter':
        setScreenContent(`Enter ${icons[selectedIcon]}`);
        return;
      case 'back':
        setScreenContent('Back button pressed');
        return;
      case 'option':
        setScreenContent('Option button pressed');
        return;
      case 'home':
        setScreenContent('Home button pressed');
        return;
      case 'power':
        setScreenContent('Power button pressed');
        return;
      default:
        setScreenContent('Welcome to Walkman-js');
        return;
    }
    setSelectedIcon(newIndex);
    setScreenContent(`Selected: ${icons[newIndex]}`);
  };

  return (
    <div className="app">
      <Walkman screenContent={screenContent} onButtonPress={handleButtonPress} selectedIcon={selectedIcon} />
    </div>
  );
};

export default App;
