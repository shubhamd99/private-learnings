import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppModal from "./components/AppModal";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("No action taken yet");

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function handleConfirm() {
    setStatus("Modal confirmed");
    closeModal();
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Reusable Modal</Text>

        <Pressable style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Open Modal</Text>
        </Pressable>

        <Text style={styles.status}>{status}</Text>

        <AppModal
          visible={isModalVisible}
          title="Delete item?"
          confirmText="Delete"
          cancelText="Keep"
          onClose={closeModal}
          onConfirm={handleConfirm}
        >
          <Text>
            This action will remove the selected item. You can close the modal
            by tapping outside, pressing Keep, or using the Android back button.
          </Text>
        </AppModal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  status: {
    marginTop: 16,
  },
});
