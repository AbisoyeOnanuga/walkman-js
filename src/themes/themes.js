// utils/themes.js
const Silver = {
  body: {
    background: "linear-gradient(180deg, #e3e3e3 0%, #d6d6d6 100%)",
  },
  clickwheel: {
    background: "#FFFFFF",
    outline: "#b9b9b9",
    button: "#AFAFAF",
    centerButton: {
      background: "#ffffff",
      boxShadow: "rgb(191, 191, 191)",
      outline: "#b9b9b9",
    },
  },
};

const Black = {
  body: {
    background: "linear-gradient(180deg, #7d7c7d 0%, #1e1e1e 100%)",
  },
  clickwheel: {
    background: "#2a2a2a",
    outline: "#1a1a1a",
    button: "#FFFFFF",
    centerButton: {
      background: "#7d7c7d",
      boxShadow: "rgb(50, 50, 50)",
      outline: "#1a1a1a",
    },
  },
};

const themes = {
  silver: Silver,
  black: Black,
  // Add other themes here
};

export default themes;
