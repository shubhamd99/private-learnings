import React from "react";
import { StyleSheet, View } from "react-native";
import Toast from "./Toast";

export default function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map(({ id, message, color, icon, visibleFor }) => (
        <Toast
          key={id}
          message={message}
          color={color}
          icon={icon}
          visibleFor={visibleFor}
          onClose={() => onClose(id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    gap: 8,
    alignItems: "flex-end",
  },
});
