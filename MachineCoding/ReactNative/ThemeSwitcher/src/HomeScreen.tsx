// React
import React from 'react';

// React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Local
import { useTheme } from './useTheme';
import { ThemeColors } from './types';

export const HomeScreen = () => {
  // Pull colours and toggle from context via the custom hook
  const { theme, colors, toggleTheme } = useTheme();

  // Rebuild styles with new colours on every theme toggle
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme Switcher</Text>
      <Text style={styles.subtitle}>Current: {theme}</Text>

      {/* Calls toggleTheme from context — no prop drilling needed */}
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Dynamic styles — takes active colours, returns a StyleSheet
const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.6,
    },
    button: {
      backgroundColor: colors.button,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 8,
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
    },
  });
