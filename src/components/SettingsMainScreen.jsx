import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Header from './Header';
import './SettingsScreen.css';

const SettingsMainScreen = forwardRef(({ onButtonPress, onNavigate, playing }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuOptions = ['About', 'Theme'];

  const handleNavigation = (key) => {
    switch (key) {
      case 'ArrowUp':
      case 'up':
        setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
        break;
      case 'ArrowDown':
      case 'down':
        setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
        break;
      case 'Enter':
      case 'enter':
      case ' ':
        onNavigate(menuOptions[selectedIndex].toLowerCase());
        break;
      case 'Backspace':
      case 'back':
        onButtonPress('back');
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    handleNavigation
  }));

  return (
    <div className="settings-main-screen">
      <Header playing={playing} />
      <h2>Settings</h2>
      <ul>
        {menuOptions.map((option, index) => (
          <li 
            key={option}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => onNavigate(option.toLowerCase())}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SettingsMainScreen;