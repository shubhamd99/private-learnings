import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const NUM_BOXES = 12;
const NUM_COLUMNS = 3;

export default function App() {
  const [selected, setSelected] = useState(new Set());

  const toggleBox = (id) => {
    setSelected((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selected.has(item);

    return (
      <TouchableOpacity
        style={[
          styles.box,
          { backgroundColor: isSelected ? "blue" : "lightgray" },
        ]}
        onPress={() => toggleBox(item)}
      />
    );
  };

  return (
    <FlatList
      data={Array.from({ length: NUM_BOXES }, (_, i) => i)}
      keyExtractor={(item) => item.toString()}
      renderItem={renderItem}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.container}
    />
  );
}

const BOX_SIZE = Dimensions.get("window").width / NUM_COLUMNS - 20;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    margin: 10,
  },
});
