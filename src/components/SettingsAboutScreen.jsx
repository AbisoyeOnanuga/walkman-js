import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import Header from './Header';
import './SettingsScreen.css';

const SettingsAboutScreen = forwardRef(({ onButtonPress, onNavigate, playing }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const links = [
    { name: 'GitHub', url: 'https://github.com/AbisoyeOnanuga/walkman-js' },
    { name: 'Website', url: 'https://abisoyeonanuga.github.io/website/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abisoye-onanuga-b0aaa5133/' },
    { name: 'Inspiration: ipod.js by Tanner V', url: 'https://github.com/tvillarete/ipod-classic-js/' },
    { name: 'walkman.js by Abisoye', url: 'https://github.com/AbisoyeOnanuga/walkman-js' }
  ];

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
        setSelectedIndex((prev) => (prev - 1 + links.length) % links.length);
        break;
      case 'ArrowDown':
      case 'down':
        setSelectedIndex((prev) => (prev + 1) % links.length);
        break;
      case 'Enter':
      case 'enter':
      case ' ':
        window.open(links[selectedIndex].url, '_blank');
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
    <div className="settings-about-screen">
      <Header playing={playing} />
      <h2>About</h2>
      <ul ref={listRef}>
        {links.map((link, index) => (
          <li 
            key={link.name}
            ref={el => itemRefs.current[index] = el}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => {
              setSelectedIndex(index);
              window.open(link.url, '_blank');
            }}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SettingsAboutScreen;