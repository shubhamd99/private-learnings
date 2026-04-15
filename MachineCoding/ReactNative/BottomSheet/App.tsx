// React
import React, { useState } from 'react';

// React Native
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// GestureHandlerRootView must wrap the entire app — one instance at the root.
// GestureDetector inside GestureBottomSheet won't work without this ancestor.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Local — two separate implementations
import { BasicBottomSheet } from './src/BasicBottomSheet';
import { GestureBottomSheet } from './src/GestureBottomSheet';

/**
 * Entry point.
 * Tab bar to switch between the two bottom sheet implementations.
 *   Basic   → Animated + PanResponder (no third-party)
 *   Gesture → react-native-gesture-handler + Reanimated (UI-thread gestures)
 */
export default function App() {
  const [tab, setTab] = useState<'basic' | 'gesture'>('basic');
  const [visible, setVisible] = useState(false);

  // Reset sheet when switching tabs
  const switchTab = (t: typeof tab) => {
    setVisible(false);
    setTab(t);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="dark-content" />

        {/* Tab bar */}
        <View style={styles.tabBar}>
          {(['basic', 'gesture'] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.activeTab]}
              onPress={() => switchTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t === 'basic'
                  ? 'Basic (PanResponder)'
                  : 'Gesture (Reanimated)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Screen content + bottom sheet overlay */}
        <View style={styles.screen}>
          <TouchableOpacity
            style={styles.openBtn}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.openBtnText}>Open Bottom Sheet</Text>
          </TouchableOpacity>

          {tab === 'basic' ? (
            <BasicBottomSheet
              visible={visible}
              onClose={() => setVisible(false)}
            />
          ) : (
            <GestureBottomSheet
              visible={visible}
              onClose={() => setVisible(false)}
            />
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
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
    fontSize: 13,
    color: '#999',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  openBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
