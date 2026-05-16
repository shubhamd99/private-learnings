import React from "react";
import { FlatList, Text } from "react-native";
import NoteItem from "./NoteItem";

export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteItem note={item} onEdit={onEdit} onDelete={onDelete} />
      )}
      ListEmptyComponent={<Text>No notes yet</Text>}
    />
  );
}
