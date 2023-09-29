import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

const LIGHT_THEME = {
    mode: "light",
    colors : {
        primary: "#6200ee",
        primaryVariant: "#3700b3",
        ripple: "#bdbdbd",
        icon: "#000000",
        secondary: "#03dac6",
        secondaryVariant: "#018786",
        background: "#ffffff",
        surface: "#ffffff",
        error: "#b00020",
        onPrimary: "#ffffff",
        onSecondary: "#000000",
        onBackground: "#000000",
        onSurface: "#000000",
        onError: "#ffffff",
    }
};

const DARK_THEME = {
    mode: "dark",
    colors : {
        primary: "#bb86fc",
        primaryVariant: "#3700b3",
        secondary: "#03dac6",
        secondaryVariant: "#03dac6",
        background: "#121212",
        surface: "#121212",
        error: "#cf6679",
        onPrimary: "#000000",
        onSecondary: "#000000",
        onBackground: "#ffffff",
        onSurface: "#ffffff",
        onError: "#000000",
    }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_THEME);

useEffect(() => {
    if (theme.mode === "dark") {
        setTheme(DARK_THEME);
    } else {
        setTheme(LIGHT_THEME);
    }
}, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getThemeContext = () => useContext(ThemeContext);

export default getThemeContext;