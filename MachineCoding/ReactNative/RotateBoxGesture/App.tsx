import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BoxGestureApp } from './src/BoxGestureApp';
import { BoxGestureBasic } from './src/BoxGestureBasic';

const TABS = ['Gesture Handler', 'Built-in'] as const;
type Tab = (typeof TABS)[number];

export default function App() {
  const [active, setActive] = useState<Tab>('Gesture Handler');

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaView style={styles.root} edges={['top']}>
          {/* Tab bar */}
          <View style={styles.tabBar}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active === tab && styles.tabActive]}
                onPress={() => setActive(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    active === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {active === 'Gesture Handler' ? (
              <BoxGestureApp />
            ) : (
              <BoxGestureBasic />
            )}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: { color: '#999', fontSize: 14 },
  tabTextActive: { color: '#007AFF', fontWeight: '600' },
  content: { flex: 1 },
});
