import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Carousel from "./components/Carousel";
import { slides } from "./data/slides";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Carousel Demo</Text>
      <Carousel data={slides} autoPlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
