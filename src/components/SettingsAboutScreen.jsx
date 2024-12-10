import React, { useState } from 'react';

const SettingsAboutScreen = ({ onButtonPress, onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const links = [
    { name: 'GitHub', url: 'https://github.com/AbisoyeOnanuga/walkman-js' },
    { name: 'Website', url: 'https://abisoyeonanuga.github.io/website/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abisoye-onanuga-b0aaa5133/' },
    { name: 'Inspiration: ipod.js by Tanner V', url: 'https://github.com/tvillarete/ipod.js' }
  ];

  const handleNavigation = (key) => {
    switch (key) {
      case 'ArrowUp':
        setSelectedIndex((prev) => (prev - 1 + links.length) % links.length);
        break;
      case 'ArrowDown':
        setSelectedIndex((prev) => (prev + 1) % links.length);
        break;
      case 'Enter':
      case ' ':
        window.open(links[selectedIndex].url, '_blank');
        break;
      case 'Backspace':
        onButtonPress('back');
        break;
    }
  };

  return (
    <div className="settings-about-screen">
      <h2>About</h2>
      <ul>
        {links.map((link, index) => (
          <li 
            key={link.name}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => window.open(link.url, '_blank')}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsAboutScreen;