import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <Text>{note.text}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(note)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  edit: {
    color: "blue",
  },
  delete: {
    color: "red",
  },
});
