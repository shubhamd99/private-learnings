import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressBar } from './ProgressBar';

export const ProgressBarDemo = () => {
  const [progress, setProgress] = useState(30);

  const dec = () => setProgress(p => Math.max(0, p - 10));
  const inc = () => setProgress(p => Math.min(100, p + 10));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Progress Bar</Text>

      {/* Auto-play: Animated.loop drives the bar internally, no state needed */}
      <Text style={styles.sub}>Auto-play</Text>
      <ProgressBar autoPlay label="auto" />

      {/* Manually controlled bar */}
      <Text style={styles.sub}>Manual</Text>
      <ProgressBar progress={progress} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={dec}>
          <Text style={styles.btnText}>- 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={inc}>
          <Text style={styles.btnText}>+ 10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 20, justifyContent: 'center' },
  heading: { fontSize: 20, fontWeight: '700' },
  sub: { fontSize: 13, color: '#999' },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
