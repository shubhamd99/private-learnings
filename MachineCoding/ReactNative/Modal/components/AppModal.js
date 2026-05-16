import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function AppModal({
  visible,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>{children}</View>

          <View style={styles.row}>
            <Pressable onPress={onClose} style={styles.button}>
              <Text>{cancelText}</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={[styles.button, styles.danger]}
            >
              <Text style={styles.dangerText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  body: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 10,
    marginLeft: 8,
  },
  danger: {
    backgroundColor: "#dc2626",
    borderRadius: 6,
  },
  dangerText: {
    color: "white",
  },
});
