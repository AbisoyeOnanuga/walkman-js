// utils/themeManager.js
import themes from './themes';

export const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) return;

  // Apply body background
  document.body.style.background = theme.body.background;

  // Apply other styles as needed
  const buttonCenter = document.querySelector('.button-center');
  if (buttonCenter) buttonCenter.style.background = theme.buttonCenter.background;

  const navigation = document.querySelector('.navigation');
  if (navigation) navigation.style.background = theme.navigation.background;

  const buttonBack = document.querySelector('.button-back');
  if (buttonBack) buttonBack.style.background = theme.buttonBack.background;

  const buttonOption = document.querySelector('.button-option');
  if (buttonOption) buttonOption.style.background = theme.buttonOption.background;

  const volumeButtons = document.querySelector('.volume-buttons');
  if (volumeButtons) volumeButtons.style.background = theme.volumeButtons.background;

  const powerButton = document.querySelector('.power-button');
  if (powerButton) powerButton.style.background = theme.powerButton.background;

  const keyButtons = document.querySelectorAll('.key-button');
  keyButtons.forEach(button => {
    button.style.background = theme.keyButton.background;
  });
};
