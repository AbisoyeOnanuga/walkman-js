// components/SettingsScreen.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const themesList = useMemo(() => ['Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green'], []);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const { changeTheme } = useTheme();
  const themeListRef = useRef(null);
  const selectedThemeRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newIndex = selectedThemeIndex;
      if (event.key === 'ArrowUp') {
        newIndex = (selectedThemeIndex - 1 + themesList.length) % themesList.length;
      } else if (event.key === 'ArrowDown') {
        newIndex = (selectedThemeIndex + 1) % themesList.length;
      } else if (event.key === 'Enter' || event.key === ' ') {
        changeTheme(themesList[selectedThemeIndex]);  // Change theme
      }
      setSelectedThemeIndex(newIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedThemeIndex, themesList, changeTheme]);

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

  return (
    <div className="settings-screen">
      <h2>Settings</h2>
      <ul className="theme-list" ref={themeListRef} tabIndex={0}>
        {themesList.map((theme, index) => (
          <li
            key={theme}
            ref={index === selectedThemeIndex ? selectedThemeRef : null}
            className={index === selectedThemeIndex ? 'selected' : ''}
            onClick={() => changeTheme(theme)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsScreen;
