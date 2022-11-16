import { createContext, useState } from "react";

export const ThemeContext = createContext()

export const ThemeContextProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    return setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};