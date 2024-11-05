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
  Object.keys(supportedThemes).forEach(key => {
    document.body.classList.remove(supportedThemes[key as DeviceThemeName]);
  });
  document.body.classList.add(supportedThemes[theme]);
};

/**
 * Looks for a 'theme' query parameter in the URL.
 * If a supported theme is detected, sets the theme on the document body.
 */
export const getThemeParam = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const themeParam = params.get("theme")?.toLowerCase() as DeviceThemeName;

  if (!themeParam || !(themeParam in supportedThemes)) {
    return;
  }

  setTheme(themeParam);
  return themeParam;
};
