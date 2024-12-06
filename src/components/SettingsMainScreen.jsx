import React, { useState } from 'react';

const SettingsMainScreen = ({ onButtonPress, onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuOptions = ['About', 'Theme'];

  const handleNavigation = (key) => {
    switch (key) {
      case 'ArrowUp':
        setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
        break;
      case 'ArrowDown':
        setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
        break;
      case 'Enter':
      case ' ':
        onNavigate(menuOptions[selectedIndex].toLowerCase());
        break;
      case 'Backspace':
        onButtonPress('back');
        break;
    }
  };

  return (
    <div className="settings-main-screen">
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
};

export default SettingsMainScreen;