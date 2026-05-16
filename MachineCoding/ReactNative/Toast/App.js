import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ToastDemo from "./components/ToastDemo";
import { ToastProvider } from "./context/ToastContext";

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
