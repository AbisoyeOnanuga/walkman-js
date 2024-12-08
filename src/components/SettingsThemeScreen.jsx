import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const SettingsThemeScreen = ({ onButtonPress }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { changeTheme } = useTheme();
  const themesList = ['Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green'];

  const handleNavigation = (key) => {
    switch (key) {
      case 'ArrowUp':
        setSelectedIndex((prev) => (prev - 1 + themesList.length) % themesList.length);
        break;
      case 'ArrowDown':
        setSelectedIndex((prev) => (prev + 1) % themesList.length);
        break;
      case 'Enter':
      case ' ':
        changeTheme(themesList[selectedIndex]);
        break;
      case 'Backspace':
        onButtonPress('back');
        break;
    }
  };

  return (
    <div className="settings-theme-screen">
      <h2>Themes</h2>
      <ul>
        {themesList.map((theme, index) => (
          <li 
            key={theme}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => changeTheme(theme)}
          >
            {theme}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsThemeScreen; 