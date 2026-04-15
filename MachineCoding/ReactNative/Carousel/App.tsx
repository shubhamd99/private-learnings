// React
import React, { useState } from 'react';

// React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Safe area — use this package's SafeAreaView, not RN's built-in one.
// The built-in only works on iOS and ignores dynamic insets on Android.
import { SafeAreaView } from 'react-native-safe-area-context';

// Local — two separate carousel implementations
import { BasicCarousel } from './src/BasicCarousel';
import { AnimatedCarousel } from './src/AnimatedCarousel';

/**
 * --- ENTRY POINT ---
 * Renders a tab toggle to switch between the two carousel implementations.
 *   Basic    → FlatList + pagingEnabled (no third-party libs)
 *   Animated → manual pan gesture + Reanimated v3 (scale/opacity per slide)
 */
export default function App() {
  const [tab, setTab] = useState<'basic' | 'animated'>('basic');

  return (
    <SafeAreaView style={styles.root}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, tab === 'basic' && styles.activeTab]}
          onPress={() => setTab('basic')}>
          <Text style={[styles.tabText, tab === 'basic' && styles.activeTabText]}>
            Basic (FlatList)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === 'animated' && styles.activeTab]}
          onPress={() => setTab('animated')}>
          <Text
            style={[
              styles.tabText,
              tab === 'animated' && styles.activeTabText,
            ]}>
            Animated (Reanimated)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View style={styles.content}>
        {tab === 'basic' ? <BasicCarousel /> : <AnimatedCarousel />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#333',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
