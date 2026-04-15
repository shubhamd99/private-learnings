// React
import React, { useEffect } from 'react';

// React Native
import { Text, TouchableOpacity, View } from 'react-native';

// Third-party — gesture runs on UI thread, no JS bridge crossing per frame
// GestureHandlerRootView lives in App.tsx (must be a single root, not per component)
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// Local
import { styles, SHEET_HEIGHT, DISMISS_THRESHOLD } from './styles';

// Dismiss velocity threshold in px/s (Gesture handler uses px/s, unlike PanResponder px/ms)
const DISMISS_VELOCITY_PX_S = 500;

interface Props {
  visible: boolean;
  onClose: () => void;
}

/**
 * GestureBottomSheet
 *
 * Same behaviour as BasicBottomSheet but uses:
 *   react-native-gesture-handler — gesture runs on the UI thread
 *   react-native-reanimated      — shared values animate at 60fps without JS bridge
 *   react-native-worklets        — scheduleOnRN bridges back to JS to call onClose
 *
 * translateY lives on the UI thread (useSharedValue).
 * The JS thread only touches it in useEffect via withSpring.
 */
export const GestureBottomSheet = ({ visible, onClose }: Props) => {
  // STEP 1 — shared value: lives on UI thread, starts off-screen
  const translateY = useSharedValue(SHEET_HEIGHT);

  // STEP 2 — slide up (open) or down (close) when visible changes
  // withTiming + ease-out gives a clean slide with no overshoot.
  // withSpring would overshoot past 0, making the sheet jump above its open position.
  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : SHEET_HEIGHT, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible, translateY]);

  // STEP 3 — pan gesture: runs entirely on UI thread
  const panGesture = Gesture.Pan()
    // Only activate on downward drag (dy > 5)
    .activateAfterLongPress(0)
    .onUpdate(e => {
      'worklet';
      // clamp: sheet can't be dragged above its open position
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd(e => {
      'worklet';
      if (
        e.translationY > DISMISS_THRESHOLD ||
        e.velocityY > DISMISS_VELOCITY_PX_S
      ) {
        // scheduleOnRN: call JS function (onClose) from a worklet (UI thread)
        scheduleOnRN(onClose);
      } else {
        // Not far enough — snap back to open position
        translateY.value = withTiming(0, {
          duration: 250,
          easing: Easing.out(Easing.cubic),
        });
      }
    });

  // STEP 4 — animated style: re-runs when translateY changes (UI thread only)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Plain View — pointerEvents="none" when closed so the CTA behind stays tappable.
  // GestureHandlerRootView does NOT support pointerEvents; it lives in App.tsx instead.
  return (
    <View style={styles.container} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop — only rendered when open so it doesn't show when sheet is closed */}
      {visible && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
      )}

      {/* Sheet wrapped in GestureDetector for drag-to-dismiss */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Bottom Sheet</Text>
          <Text style={styles.body}>
            Swipe down, tap backdrop, or press Close to dismiss.
          </Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
