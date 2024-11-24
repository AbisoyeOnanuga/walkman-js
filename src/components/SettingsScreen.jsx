// components/SettingsScreen.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';

const SettingsScreen = ({ setTheme }) => {
  const themes = useMemo(() => ['Black', 'Pink', 'Blue', 'Red', 'Yellow', 'Green'], []);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const themeListRef = useRef(null);
  const selectedThemeRef = useRef(null);

  // Log setTheme to ensure it is received correctly
  console.log("setTheme in SettingsScreen component:", setTheme);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newIndex = selectedThemeIndex;
      if (event.key === 'ArrowUp') {
        newIndex = (selectedThemeIndex - 1 + themes.length) % themes.length;
      } else if (event.key === 'ArrowDown') {
        newIndex = (selectedThemeIndex + 1) % themes.length;
      } else if (event.key === 'Enter' || event.key === ' ') {
        setTheme(themes[selectedThemeIndex]);
      } else if (event.key === 'Backspace' || event.key === 'Escape') {
        setTheme('home');
      }
      setSelectedThemeIndex(newIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedThemeIndex, themes, setTheme]);

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
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        <h2>Settings</h2>
        <ul className="theme-list" ref={themeListRef} tabIndex={0}>
          {themes.map((theme, index) => (
          <li
            key={theme}
            ref={index === selectedThemeIndex ? selectedThemeRef : null}
            className={index === selectedThemeIndex ? 'selected' : ''}
            onClick={() => setTheme(theme)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsScreen;
