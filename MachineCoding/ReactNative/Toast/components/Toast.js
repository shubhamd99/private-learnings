import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TOAST_COLORS } from "../constants/toast";

function Toast({
  message,
  color = TOAST_COLORS.default,
  icon,
  visibleFor,
  onClose,
}) {
  return (
    <View
      style={StyleSheet.flatten([styles.toast, { backgroundColor: color }])}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}

      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>

      {visibleFor ? (
        <Text style={styles.time}>{Math.round(visibleFor / 1000)}s</Text>
      ) : null}

      <TouchableOpacity onPress={onClose} hitSlop={8}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(Toast);

const styles = StyleSheet.create({
  toast: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 8,
    elevation: 5,
    flexDirection: "row",
    gap: 10,
    maxWidth: 320,
    minWidth: 220,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  time: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
  },
  closeText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 18,
    fontWeight: "600",
  },
});
