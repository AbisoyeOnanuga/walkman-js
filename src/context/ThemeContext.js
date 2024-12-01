// context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { themes } from '../utils/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Retrieve the stored theme or default to 'Black'
  const storedTheme = localStorage.getItem('theme') || 'Black';
  const [theme, setTheme] = useState(storedTheme);

  const changeTheme = (themeName) => {
    setTheme(themeName);
    localStorage.setItem('theme', themeName); // Store the selected theme in localStorage
  };

  useEffect(() => {
    // Update the theme on initial load
    const storedTheme = localStorage.getItem('theme') || 'Black';
    setTheme(storedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
