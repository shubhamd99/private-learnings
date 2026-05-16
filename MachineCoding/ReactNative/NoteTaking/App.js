import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!note.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text: note } : item,
        ),
      );
      setEditingId(null);
    } else {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      <NoteForm
        value={note}
        onChangeText={setNote}
        onSubmit={handleSave}
        isEditing={Boolean(editingId)}
      />

      <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
    paddingTop: 56,
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
});
