import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ onButtonPress }) => {
  const themesList = useMemo(() => ['Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green'], []);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const { changeTheme } = useTheme();
  const themeListRef = useRef(null);
  const selectedThemeRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleNavigation(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedThemeIndex, themesList]);

  const handleNavigation = (key) => {
    let newIndex = selectedThemeIndex;
    if (key === 'ArrowUp' || key === 'up') {
      newIndex = (selectedThemeIndex - 1 + themesList.length) % themesList.length;
    } else if (key === 'ArrowDown' || key === 'down') {
      newIndex = (selectedThemeIndex + 1) % themesList.length;
    } else if (key === 'Enter' || key === ' ' || key === 'enter') {
      changeTheme(themesList[selectedThemeIndex]);
    }
    setSelectedThemeIndex(newIndex);
  };

  useEffect(() => {
    if (selectedThemeRef.current) {
      selectedThemeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedThemeIndex]);

  useEffect(() => {
    if (themeListRef.current) {
      themeListRef.current.focus();
    }
  }, []);

  const handleMouseClick = (index) => {
    setSelectedThemeIndex(index);
    changeTheme(themesList[index]);
  };

  return (
    <div className="settings-screen">
      <h2>Settings</h2>
      <ul className="theme-list" ref={themeListRef} tabIndex={0}>
        {themesList.map((theme, index) => (
          <li
            key={theme}
            ref={index === selectedThemeIndex ? selectedThemeRef : null}
            className={index === selectedThemeIndex ? 'selected' : ''}
            onClick={() => handleMouseClick(index)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsScreen;
