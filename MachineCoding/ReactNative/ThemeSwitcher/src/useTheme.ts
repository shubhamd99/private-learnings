import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemeContextValue } from './types';

// Custom hook — shortcut so screens write useTheme() instead of useContext(ThemeContext)
// Also throws a clear error if used outside <ThemeProvider>.
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
};
