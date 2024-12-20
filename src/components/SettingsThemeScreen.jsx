import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import './SettingsScreen.css';

const SettingsThemeScreen = forwardRef(({ onButtonPress, playing }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { changeTheme } = useTheme();
  const themesList = ['Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green'];
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  const handleNavigation = (key) => {
    switch (key) {
      case 'ArrowUp':
      case 'up':
        setSelectedIndex((prev) => (prev - 1 + themesList.length) % themesList.length);
        break;
      case 'ArrowDown':
      case 'down':
        setSelectedIndex((prev) => (prev + 1) % themesList.length);
        break;
      case 'Enter':
      case 'enter':
      case ' ':
        changeTheme(themesList[selectedIndex]);
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
    <div className="settings-theme-screen">
      <Header playing={playing} />
      <h2>Themes</h2>
      <ul ref={listRef}>
        {themesList.map((theme, index) => (
          <li 
            key={theme}
            ref={el => itemRefs.current[index] = el}
            data-theme={theme}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => {
              setSelectedIndex(index);
              changeTheme(theme);
            }}
          >
            {theme}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SettingsThemeScreen; 