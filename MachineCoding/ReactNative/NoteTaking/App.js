import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    console.log("App mounted");
  }, []);

  const handleSave = () => {
    if (!note.trim()) return;

    if (editingId) {
      // ✏️ update existing note
      setNotes((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text: note } : item,
        ),
      );
      setEditingId(null);
    } else {
      // ➕ add new note
      const newNote = {
        id: Date.now().toString(),
        text: note,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setNote("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  const editNote = (item) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text>{item.text}</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => editNote(item)}>
          <Text style={{ color: "blue" }}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Text style={{ color: "red" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Enter note..."
        style={styles.input}
      />

      <Button
        title={editingId ? "Update Note" : "Add Note"}
        onPress={handleSave}
      />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No notes yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
});
