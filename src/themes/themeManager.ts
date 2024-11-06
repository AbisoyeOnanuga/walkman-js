// themeManager.ts
import './Black.css';
import './Blue.css';
import './Green.css';
import './Pink.css';
import './Red.css';
import './Yellow.css';

const supportedThemes = {
  black: "Black",
  blue: "Blue",
  green: "Green",
  pink: "Pink",
  red: "Red",
  yellow: "Yellow",
};

export type DeviceThemeName = keyof typeof supportedThemes;

export const setTheme = (theme: DeviceThemeName) => {
  // Remove all theme classes
  Object.keys(supportedThemes).forEach(key => {
    document.body.classList.remove(supportedThemes[key as DeviceThemeName]);
  });
  // Add the new theme class
  document.body.classList.add(supportedThemes[theme]);
};

/**
 * Initializes the theme based on URL parameters or default logic.
 */
export const initializeTheme = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme")?.toLowerCase() as DeviceThemeName;

  if (themeParam && themeParam in supportedThemes) {
    setTheme(themeParam);
  } else {
    // Set a default theme if no valid theme is found in URL
    setTheme('black'); // Change 'black' to any default theme you prefer
  }
};
