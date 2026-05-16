import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";

export const themes = {
  light: {
    background: "#ffffff",
    text: "#111827",
    button: "#2563eb",
    buttonText: "#ffffff",
  },
  dark: {
    background: "#111827",
    text: "#ffffff",
    button: "#60a5fa",
    buttonText: "#111827",
  },
};

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === "dark" ? "dark" : "light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colors: themes[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
