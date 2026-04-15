// React
import React, { useEffect, useRef } from 'react';

// React Native — Animated + PanResponder are built-in, no third-party needed
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Local
import {
  styles,
  SHEET_HEIGHT,
  DISMISS_THRESHOLD,
  DISMISS_VELOCITY,
} from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
}

/**
 * BasicBottomSheet
 *
 * Built with RN's built-in Animated + PanResponder.
 * No react-native-gesture-handler or react-native-reanimated needed.
 *
 * Animation:
 *   translateY = 0          → sheet fully visible (bottom of screen)
 *   translateY = SHEET_HEIGHT → sheet fully off-screen (below viewport)
 *
 * Close triggers:
 *   1. Backdrop tap
 *   2. Close button
 *   3. Swipe down past DISMISS_THRESHOLD px
 *   4. Flick down fast (vy > DISMISS_VELOCITY)
 */
export const BasicBottomSheet = ({ visible, onClose }: Props) => {
  // STEP 1 — animated Y position; starts off-screen
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  // STEP 2 — spring open (0) or closed (SHEET_HEIGHT) when visibility changes
  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SHEET_HEIGHT,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  // STEP 3 — PanResponder: handle drag-to-dismiss
  const panResponder = useRef(
    PanResponder.create({
      // Only claim the gesture if the user is dragging downward (dy > 5)
      // This avoids conflicting with vertical ScrollViews inside the sheet
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,

      // Follow the finger; clamp to 0 so sheet can't be dragged upward
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },

      // On finger lift: dismiss if dragged far enough or flicked fast enough
      // Otherwise spring back to open position
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_THRESHOLD || g.vy > DISMISS_VELOCITY) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    // pointerEvents="none" when closed so underlying content stays tappable
    <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop — only rendered when open so it doesn't show when sheet is closed */}
      {visible && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
      )}

      {/* Sheet — animated slide up/down; panHandlers enable drag-to-dismiss */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Bottom Sheet</Text>
        <Text style={styles.body}>
          Swipe down, tap backdrop, or press Close to dismiss.
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
