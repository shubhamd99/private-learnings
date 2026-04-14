// React
import React from 'react';

// Local
import { ThemeProvider } from './src/ThemeContext';
import { HomeScreen } from './src/HomeScreen';

// Wrap the whole app in ThemeProvider so every screen can access the theme
// via useTheme() without any prop drilling.
export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
