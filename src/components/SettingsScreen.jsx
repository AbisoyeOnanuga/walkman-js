import React from 'react';

const SettingsScreen = ({ setTheme }) => {
  console.log("SettingsScreen render: setTheme is", typeof setTheme); // Debugging log

  const themes = ['black', 'pink', 'blue', 'red', 'yellow', 'green'];

  return (
    <div className="settings-screen">
      <h2>Choose Theme</h2>
      {themes.map(theme => (
        <button key={theme} onClick={() => {
          console.log('Changing theme to:', theme);
          setTheme(theme)
          }}>{theme}</button>
      ))}
    </div>
  );
};

export default SettingsScreen;
