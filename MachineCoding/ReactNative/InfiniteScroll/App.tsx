import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Text, StyleSheet } from 'react-native';
import { InfiniteScrollList } from './src/InfiniteScrollList';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>Posts</Text>
        <InfiniteScrollList />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', padding: 16 },
});
