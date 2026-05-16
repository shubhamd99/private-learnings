import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function NoteForm({ value, onChangeText, onSubmit, isEditing }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter note..."
        style={styles.input}
      />

      <Button
        title={isEditing ? "Update Note" : "Add Note"}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
