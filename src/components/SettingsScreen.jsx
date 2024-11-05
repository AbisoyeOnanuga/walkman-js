// components/SettingsScreen.jsx
import React, { useState, useEffect, useRef } from 'react';

const SettingsScreen = ({ setTheme }) => {
  const themes = ['black', 'pink', 'blue', 'red', 'yellow', 'green'];
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const themeListRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedThemeIndex((prevIndex) => (prevIndex - 1 + themes.length) % themes.length);
          break;
        case 'ArrowDown':
          setSelectedThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
          break;
        case 'Enter':
        case ' ':
          setTheme(themes[selectedThemeIndex]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedThemeIndex, themes, setTheme]);
  
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
