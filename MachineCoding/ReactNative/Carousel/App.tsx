// React
import React, { useState } from 'react';

// React Native
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Local — four carousel implementations
import { BasicCarousel } from './src/BasicCarousel';
import { AnimatedCarousel } from './src/AnimatedCarousel';
import { AutoPlayCarousel } from './src/AutoPlayCarousel';
import { AnimatedAutoPlayCarousel } from './src/AnimatedAutoPlayCarousel';

type Tab = 'basic' | 'animated' | 'autoplay' | 'animated-autoplay';

const TABS: { key: Tab; label: string }[] = [
  { key: 'basic',             label: 'Basic' },
  { key: 'animated',         label: 'Animated' },
  { key: 'autoplay',         label: 'AutoPlay' },
  { key: 'animated-autoplay', label: 'Animated\nAutoPlay' },
];

/**
 * Entry point — tab bar to switch between the four carousel implementations.
 *   Basic            → FlatList + pagingEnabled (no third-party)
 *   Animated         → Reanimated scroll handler + per-slide scale
 *   AutoPlay         → Basic + setInterval + Animated.Value dot widths
 *   Animated AutoPlay→ Animated + setInterval + scrollX-driven dot widths
 */
export default function App() {
  const [tab, setTab] = useState<Tab>('basic');

  return (
    <SafeAreaView style={styles.root}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.activeTab]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.activeTabText]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Carousel */}
      <View style={styles.content}>
        {tab === 'basic'              && <BasicCarousel />}
        {tab === 'animated'           && <AnimatedCarousel />}
        {tab === 'autoplay'           && <AutoPlayCarousel />}
        {tab === 'animated-autoplay'  && <AnimatedAutoPlayCarousel />}
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
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#333',
  },
  tabText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
