import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

const LIGHT_THEME = {
  mode: 'light',
  colors: {
    primary: '#6200ee',
    primaryVariant: '#3700b3',
    text: '#000000',
    shadow: '#000000',

    primaryText: '#ffffff',
    primaryIcon: '#ffffff',

    buttonText: '#ffffff',
    servicesPrimary: 'rgb(0, 137, 123)',
    lostPrimary: 'rgb(107, 127, 215)',
    homePrimary: 'rgb(0, 142, 255)',
    adoptPrimary: 'rgb(225, 82, 95)',
    playPrimary: 'rgb(227, 181, 5)',
    ripple: 'rgba(255, 255, 255, 0.1)',
    icon: '#000000',

    secondary: '#03dac6',
    secondaryVariant: '#018786',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#b00020',

    itemCardText: '#808080',
  },
};

const DARK_THEME = {
  mode: 'dark',
  colors: {
    primary: '#bb86fc',
    primaryVariant: '#3700b3',
    text: '#d4d4d4',
    shadow: '#000000',

    primaryText: '#ffffff',
    primaryIcon: '#ffffff',

    buttonText: '#ffffff',
    servicesPrimary: 'rgb(0, 137, 123)',
    lostPrimary: 'rgb(107, 127, 215)',
    homePrimary: 'rgb(157, 2, 196)',
    adoptPrimary: 'rgb(225, 82, 95)',
    playPrimary: 'rgb(227, 181, 5)',
    ripple: 'rgba(255, 255, 255, 0.1)',
    icon: '#ffffff',

    secondary: '#03dac6',
    secondaryVariant: '#03dac6',
    background: '#121212',
    surface: 'rgba(51, 51, 51, 0.8)',
    error: '#cf6679',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_THEME);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.mode === 'light' ? DARK_THEME : LIGHT_THEME
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getThemeContext = () => useContext(ThemeContext);

export default getThemeContext;
