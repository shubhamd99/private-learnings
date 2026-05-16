import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../hooks/useTheme";

export default function HomeScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme Switcher</Text>
      <Text style={styles.subtitle}>Current theme: {theme}</Text>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Switch to {theme === "light" ? "Dark" : "Light"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      gap: 16,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "800",
    },
    subtitle: {
      color: colors.text,
      fontSize: 16,
    },
    button: {
      backgroundColor: colors.button,
      borderRadius: 8,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    buttonText: {
      color: colors.buttonText,
      fontWeight: "700",
    },
  });
