import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import BottomSheet from "./components/BottomSheet";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={() => setOpen(true)}>
        <Text style={styles.btnText}>Open Sheet</Text>
      </Pressable>

      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        <Text style={styles.title}>Bottom Sheet</Text>
        <Text>This is reusable content.</Text>

        <Pressable style={styles.btn} onPress={() => setOpen(false)}>
          <Text style={styles.btnText}>Close</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
