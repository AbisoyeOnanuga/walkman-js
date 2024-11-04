import React from 'react';

const SettingsScreen = ({ setTheme }) => {
  const themes = ['black', 'pink', 'blue', 'red', 'yellow', 'green'];

  return (
    <div className="settings-screen">
      <h2>Choose Theme</h2>
      {themes.map(theme => (
        <button key={theme} onClick={() => setTheme(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
};

export default SettingsScreen;
