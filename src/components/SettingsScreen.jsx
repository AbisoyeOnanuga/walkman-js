import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';

const SettingsScreen = forwardRef(({ onButtonPress, playing }, ref) => {
  const [currentView, setCurrentView] = useState('main-menu');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pressTimer, setPressTimer] = useState(null);

  const mainMenuOptions = useMemo(() => ['About', 'Theme'], []);
  const aboutLinks = useMemo(() => [
    { name: 'GitHub', url: 'https://github.com/AbisoyeOnanuga' },
    { name: 'Website', url: 'https://abisoyeonanuga.github.io/website' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abisoye-onanuga-b0aaa5133/' },
    { name: 'Inspiration: ipod.js by Tanner V', url: 'https://github.com/tvillarete/ipod-classic.js' },
    { name: 'walkman.js by Abisoye', url: 'https://github.com/AbisoyeOnanuga/walkman-js' }
  ], []);
  const themesList = useMemo(() => ['Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green'], []);

  const mainMenuRef = useRef(null);
  const selectedMainMenuRef = useRef(null);
  const aboutLinksRef = useRef(null);
  const selectedAboutLinkRef = useRef(null);
  const themesListRef = useRef(null);
  const selectedThemeRef = useRef(null);

  const { changeTheme } = useTheme();

  const handleBackPress = () => {
    // Clear any existing timer
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }

    // Start a new timer for long press detection (3 seconds)
    const timer = setTimeout(() => {
      // Long press - go to home screen
      onButtonPress('back');
      setPressTimer(null);
    }, 3000);

    setPressTimer(timer);
  };

  const handleBackRelease = () => {
    // Only handle short press if timer exists and hasn't fired
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);

      // Short press - navigate back one level
      switch (currentView) {
        case 'about':
        case 'themes':
          // Go back to main settings menu
          setCurrentView('main-menu');
          setSelectedIndex(0);
          break;
        case 'main-menu':
          // Exit settings to previous screen
          onButtonPress('back');
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Backspace':
          handleBackPress();
          break;
        default:
          switch (currentView) {
            case 'main-menu':
              handleMainMenuNavigation(event.key);
              break;
            case 'about':
              handleAboutLinksNavigation(event.key);
              break;
            case 'themes':
              handleThemesNavigation(event.key);
              break;
          }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Backspace') {
        handleBackRelease();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      // Clear any remaining timer
      if (pressTimer) {
        clearTimeout(pressTimer);
      }
    };
  }, [currentView, selectedIndex, pressTimer]);

  useEffect(() => {
    if (currentView === 'main-menu' && selectedMainMenuRef.current) {
      selectedMainMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (currentView === 'about' && selectedAboutLinkRef.current) {
      selectedAboutLinkRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (currentView === 'themes' && selectedThemeRef.current) {
      selectedThemeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentView, selectedIndex]);

  const handleMainMenuNavigation = (key) => {
    let newIndex = selectedIndex;
    if (key === 'ArrowUp' || key === 'up') {
      newIndex = (selectedIndex - 1 + mainMenuOptions.length) % mainMenuOptions.length;
    } else if (key === 'ArrowDown' || key === 'down') {
      newIndex = (selectedIndex + 1) % mainMenuOptions.length;
    } else if (key === 'Enter' || key === ' ' || key === 'enter') {
      if (mainMenuOptions[selectedIndex] === 'About') {
        setCurrentView('about');
        setSelectedIndex(0);
      } else if (mainMenuOptions[selectedIndex] === 'Theme') {
        setCurrentView('themes');
        setSelectedIndex(0);
      }
    }
    setSelectedIndex(newIndex);
  };

  const handleAboutLinksNavigation = (key) => {
    let newIndex = selectedIndex;
    if (key === 'ArrowUp' || key === 'up') {
      newIndex = (selectedIndex - 1 + aboutLinks.length) % aboutLinks.length;
    } else if (key === 'ArrowDown' || key === 'down') {
      newIndex = (selectedIndex + 1) % aboutLinks.length;
    } else if (key === 'Enter' || key === ' ' || key === 'enter') {
      window.open(aboutLinks[selectedIndex].url, '_blank');
    } else if (key === 'Backspace' || key === 'Escape') {
      setCurrentView('main-menu');
      setSelectedIndex(0);
    }
    setSelectedIndex(newIndex);
  };

  const handleThemesNavigation = (key) => {
    let newIndex = selectedIndex;
    if (key === 'ArrowUp' || key === 'up') {
      newIndex = (selectedIndex - 1 + themesList.length) % themesList.length;
    } else if (key === 'ArrowDown' || key === 'down') {
      newIndex = (selectedIndex + 1) % themesList.length;
    } else if (key === 'Enter' || key === ' ' || key === 'enter') {
      changeTheme(themesList[selectedIndex]);
    } else if (key === 'Backspace' || key === 'Escape') {
      setCurrentView('main-menu');
      setSelectedIndex(0);
    }
    setSelectedIndex(newIndex);
  };

  const handleMainMenuMouseClick = (index) => {
    setSelectedIndex(index);
    if (mainMenuOptions[index] === 'About') {
      setCurrentView('about');
    } else if (mainMenuOptions[index] === 'Theme') {
      setCurrentView('themes');
    }
  };

  const handleAboutLinkMouseClick = (index) => {
    setSelectedIndex(index);
    window.open(aboutLinks[index].url, '_blank');
  };

  const handleThemeMouseClick = (index) => {
    setSelectedIndex(index);
    changeTheme(themesList[index]);
  };

  const renderMainMenu = () => (
    <div className="settings-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <h2>Settings</h2>
        <ul className="theme-list" ref={mainMenuRef} tabIndex={0}>
          {mainMenuOptions.map((option, index) => (
            <li
              key={option}
              ref={index === selectedIndex ? selectedMainMenuRef : null}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => handleMainMenuMouseClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderAboutLinks = () => (
    <div className="settings-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <h2>About</h2>
        <ul className="theme-list" ref={aboutLinksRef} tabIndex={0}>
          {aboutLinks.map((link, index) => (
            <li
              key={link.name}
              ref={index === selectedIndex ? selectedAboutLinkRef : null}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => handleAboutLinkMouseClick(index)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderThemesList = () => (
    <div className="settings-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <h2>Themes</h2>
        <ul className="theme-list" ref={themesListRef} tabIndex={0}>
          {themesList.map((theme, index) => (
            <li
              key={theme}
              ref={index === selectedIndex ? selectedThemeRef : null}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => handleThemeMouseClick(index)}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'main-menu':
        return renderMainMenu();
      case 'about':
        return renderAboutLinks();
      case 'themes':
        return renderThemesList();
      default:
        return renderMainMenu();
    }
  };

  // Expose navigation method through ref
  useImperativeHandle(ref, () => ({
    handleNavigation: (button) => {
      switch (currentView) {
        case 'main-menu':
          handleMainMenuNavigation(button);
          break;
        case 'about':
          handleAboutLinksNavigation(button);
          break;
        case 'themes':
          handleThemesNavigation(button);
          break;
      }
    }
  }));

  return renderCurrentView();
});

export default SettingsScreen;