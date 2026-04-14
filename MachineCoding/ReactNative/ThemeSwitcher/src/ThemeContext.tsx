// React
import React, { createContext, useState } from 'react';

// React Native
import { useColorScheme } from 'react-native';

// Types
import { ThemeType, ThemeContextValue } from './types';

// ─── Theme colours ────────────────────────────────────────────────────────────
// One object per theme. Add more keys here as the app grows.
export const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    button: '#007AFF',
    buttonText: '#ffffff',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    button: '#0A84FF',
    buttonText: '#ffffff',
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────
// undefined default — we guard against using it outside the provider in useTheme
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

// ─── Provider ─────────────────────────────────────────────────────────────────
// Wrap the whole app in this so every screen can access the theme.
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed from the OS setting on first render. Falls back to 'light' if system returns null.
  // After mount the user can override it manually with toggleTheme.
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    systemTheme === 'dark' ? 'dark' : 'light',
  );

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider
      value={{ theme, colors: themes[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
