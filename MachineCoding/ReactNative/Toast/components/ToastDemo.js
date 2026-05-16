import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TOAST_COLORS } from "../constants/toast";
import useToast from "../hooks/useToast";

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Toast System</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: TOAST_COLORS.default }]}
        onPress={() => showToast({ message: "Default toast" })}
      >
        <Text style={styles.buttonText}>Default Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: TOAST_COLORS.success }]}
        onPress={() =>
          showToast({
            message: "File saved successfully!",
            color: TOAST_COLORS.success,
            icon: "✓",
            duration: 2000,
          })
        }
      >
        <Text style={styles.buttonText}>Success Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: TOAST_COLORS.error }]}
        onPress={() =>
          showToast({
            message: "Something went wrong",
            color: TOAST_COLORS.error,
            icon: "!",
            duration: 5000,
          })
        }
      >
        <Text style={styles.buttonText}>Error Toast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  button: {
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
