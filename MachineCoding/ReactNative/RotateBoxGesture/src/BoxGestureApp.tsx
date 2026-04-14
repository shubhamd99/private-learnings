// React
import React, { useReducer, useEffect } from 'react';

// React Native
import { View, Text } from 'react-native';

// Third-party
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// Local
import { BoxState } from './types';
import { reducer, initialState } from './reducer';
import { styles } from './styles';

export const BoxGestureApp = () => {
  // ─── STEP 1: Undo/redo state (JS thread) ─────────────────────────────────
  // useReducer holds the time-travel stack: { current, past[], future[] }.
  // Only updated when a gesture ends (not on every frame).
  const [state, dispatch] = useReducer(reducer, initialState);

  // ─── STEP 2: Animated shared values (UI thread) ──────────────────────────
  // These live on the UI thread so gesture callbacks can read/write them
  // at 60 fps without crossing to the JS thread on every frame.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // ─── STEP 3: Gesture start snapshots ─────────────────────────────────────
  // Captured in onBegin so onUpdate can compute: base + delta.
  // Without these, every onUpdate would apply delta from 0 instead of from
  // wherever the box currently is.
  const baseX = useSharedValue(0);
  const baseY = useSharedValue(0);
  const baseScale = useSharedValue(1);
  const baseRotation = useSharedValue(0);

  // ─── STEP 4: Sync animated values when state changes ─────────────────────
  // This is the only time animated values are driven from the JS thread.
  // Fires after every dispatch — crucially after UNDO/REDO, springing the
  // box back to the saved position. On a normal gesture end the values are
  // already correct so the spring is a no-op.
  useEffect(() => {
    const { x, y, scale: s, rotation: r } = state.current;
    translateX.value = withSpring(x);
    translateY.value = withSpring(y);
    scale.value = withSpring(s);
    rotation.value = withSpring(r);
  }, [state, translateX, translateY, scale, rotation]);

  // ─── STEP 5: JS-thread action dispatchers ────────────────────────────────
  // Plain functions — NOT worklets. Called from the UI thread via scheduleOnRN,
  // which queues them onto the React Native (JS) thread.
  const saveState = (s: BoxState) =>
    dispatch({ type: 'PUSH_STATE', payload: s });
  const undo = () => dispatch({ type: 'UNDO' });
  const redo = () => dispatch({ type: 'REDO' });

  // ─── STEP 6: commit() worklet ─────────────────────────────────────────────
  // Runs on the UI thread (note 'worklet' directive). Reads the four current
  // animated values and returns them as a BoxState snapshot.
  // Called at the end of every gesture so all three onEnd handlers share
  // one consistent snapshot instead of repeating the object literal each time.
  const commit = (): BoxState => {
    'worklet';
    return {
      x: translateX.value,
      y: translateY.value,
      scale: scale.value,
      rotation: rotation.value,
    };
  };

  // ─── STEP 7: Box gestures (pan + pinch + rotation run simultaneously) ─────
  // Pattern for every gesture:
  //   onBegin  → snapshot the current animated value into its base* counterpart
  //   onUpdate → apply delta on top of the snapshot (runs every frame, UI thread)
  //   onEnd    → commit snapshot to the JS-thread reducer via scheduleOnRN
  const boxGesture = Gesture.Simultaneous(
    // PAN — translates the box by tracking finger displacement from start position
    Gesture.Pan()
      .onBegin(() => {
        'worklet';
        baseX.value = translateX.value; // remember where box was when finger touched down
        baseY.value = translateY.value;
      })
      .onUpdate(e => {
        'worklet';
        // e.translationX/Y is delta from gesture start, not from previous frame
        translateX.value = baseX.value + e.translationX;
        translateY.value = baseY.value + e.translationY;
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit()); // push snapshot → reducer on JS thread
      }),

    // PINCH — scales the box by multiplying base scale by the pinch ratio
    Gesture.Pinch()
      .onBegin(() => {
        'worklet';
        baseScale.value = scale.value; // remember scale when fingers first touched
      })
      .onUpdate(e => {
        'worklet';
        // e.scale is ratio from gesture start (e.g. 2.0 = fingers spread to 2× original gap)
        scale.value = baseScale.value * e.scale;
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit());
      }),

    // ROTATION — rotates the box by adding cumulative rotation delta to base angle
    Gesture.Rotation()
      .onBegin(() => {
        'worklet';
        baseRotation.value = rotation.value; // remember angle when fingers first touched
      })
      .onUpdate(e => {
        'worklet';
        // e.rotation is cumulative radians from gesture start
        rotation.value = baseRotation.value + e.rotation;
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit());
      }),
  );

  // ─── STEP 8: Global gestures (undo/redo, full-screen) ────────────────────
  // Exclusive = only one of these fires at a time.
  // These wrap the entire screen so they work regardless of where fingers land.
  const globalGesture = Gesture.Exclusive(
    // 3-finger swipe down  → undo
    Gesture.Pan()
      .minPointers(3)
      .onEnd(e => {
        'worklet';
        // 50px threshold prevents accidental undo on tiny movements
        if (e.translationY > 50) scheduleOnRN(undo);
      }),

    // 2-finger double tap → redo
    Gesture.Tap()
      .numberOfTaps(2)
      .minPointers(2)
      .onEnd(() => {
        'worklet';
        scheduleOnRN(redo);
      }),
  );

  // ─── STEP 9: Animated style (UI thread) ──────────────────────────────────
  // useAnimatedStyle auto-workletizes this callback in Reanimated v4 — no
  // 'worklet' directive needed. Re-evaluates whenever any shared value changes.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` }, // Reanimated expects a string like "1.57rad"
    ],
  }));

  // ─── STEP 10: Render ──────────────────────────────────────────────────────
  // GestureHandlerRootView     → required wrapper for all gesture handling
  //   GestureDetector(global)  → undo/redo listens to the full screen
  //     GestureDetector(box)   → pan/pinch/rotate only intercept the box
  //       Animated.View        → receives the animated transform style
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={globalGesture}>
        <View style={styles.content}>
          <GestureDetector gesture={boxGesture}>
            <Animated.View style={[styles.box, animatedStyle]}>
              <Text style={styles.boxText}>Box</Text>
            </Animated.View>
          </GestureDetector>
          <Text style={styles.hint}>
            Pan · Pinch · Rotate{'\n'}3-finger ↓ = Undo · 2-finger 2× = Redo
          </Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
