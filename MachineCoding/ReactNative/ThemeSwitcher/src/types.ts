import { themes } from './ThemeContext';

export type ThemeType = 'light' | 'dark';

// Derived from the themes object so adding a colour key in one place updates the type too
export type ThemeColors = typeof themes.light;

export interface ThemeContextValue {
  theme: ThemeType; // 'light' or 'dark'
  colors: ThemeColors; // active colour set
  toggleTheme: () => void; // flip between light ↔ dark
}
