// React
import React, { useReducer, useEffect } from 'react';

// React Native
import { View, Text } from 'react-native';

// Third-party
import {
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
  // STEP 1 — Undo/redo stack (JS thread)
  // Holds { current, past[], future[] }. Only changes when a gesture ends.
  const [state, dispatch] = useReducer(reducer, initialState);

  // STEP 2 — Box position on the native UI thread (not JS)
  // Lives here so gestures can update them 60fps without going through JS.
  const translateX = useSharedValue(0); // x position in px
  const translateY = useSharedValue(0); // y position in px
  const scale = useSharedValue(1); // 1 = normal size
  const rotation = useSharedValue(0); // angle in radians

  // STEP 3 — Where the box was when the finger first touched down
  // e.g. box is at x=100, finger lands → baseX=100
  //      finger moves 30px right → translateX = 100 + 30 = 130
  const baseX = useSharedValue(0);
  const baseY = useSharedValue(0);
  const baseScale = useSharedValue(1);
  const baseRotation = useSharedValue(0);

  // STEP 4 — Runs after every dispatch (ADD, UNDO, REDO)
  // ADD:  box is already at the right position → withSpring is a no-op (same value)
  // UNDO/REDO: state.current changed → box springs back/forward to the saved position
  useEffect(() => {
    const { x, y, scale: s, rotation: r } = state.current;
    translateX.value = withSpring(x);
    translateY.value = withSpring(y);
    scale.value = withSpring(s);
    rotation.value = withSpring(r);
  }, [state, translateX, translateY, scale, rotation]);

  // STEP 5 — JS thread actions (plain functions, not worklets)
  // Gesture onEnd calls these via scheduleOnRN to cross back to the JS thread.
  const saveState = (s: BoxState) => dispatch({ type: 'ADD', payload: s });
  const undo = () => dispatch({ type: 'UNDO' });
  const redo = () => dispatch({ type: 'REDO' });

  // STEP 6 — Read current box values into one object (runs on UI thread)
  // Shared across all 3 gesture onEnd handlers to avoid repeating the same 4 fields.
  const commit = (): BoxState => {
    'worklet';
    return {
      x: translateX.value,
      y: translateY.value,
      scale: scale.value,
      rotation: rotation.value,
    };
  };

  // STEP 7 — Box gestures: pan + pinch + rotation all fire at the same time
  // Every gesture follows the same 3-step pattern:
  //   onBegin  → save current value as base
  //   onUpdate → base + delta (runs 60fps)
  //   onEnd    → save snapshot to reducer
  const boxGesture = Gesture.Simultaneous(
    // PAN: drag right 50px → box moves right 50px from where it started
    Gesture.Pan()
      .onBegin(() => {
        'worklet';
        baseX.value = translateX.value; // remember box position at touch start
        baseY.value = translateY.value;
      })
      .onUpdate(e => {
        'worklet';
        translateX.value = baseX.value + e.translationX; // e.translationX = total drag from start
        translateY.value = baseY.value + e.translationY;
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit());
      }),

    // PINCH: spread fingers 2× apart → e.scale = 2 → box doubles in size
    Gesture.Pinch()
      .onBegin(() => {
        'worklet';
        baseScale.value = scale.value; // remember box size at touch start
      })
      .onUpdate(e => {
        'worklet';
        scale.value = baseScale.value * e.scale; // e.scale = ratio from start (2 = 2× bigger)
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit());
      }),

    // ROTATION: twist fingers 90° → e.rotation = 1.57 rad → box rotates 90°
    Gesture.Rotation()
      .onBegin(() => {
        'worklet';
        baseRotation.value = rotation.value; // remember box angle at touch start
      })
      .onUpdate(e => {
        'worklet';
        rotation.value = baseRotation.value + e.rotation; // e.rotation = total twist from start
      })
      .onEnd(() => {
        'worklet';
        scheduleOnRN(saveState, commit());
      }),
  );

  // STEP 8 — Undo/redo gestures (full screen, only one fires at a time)
  const globalGesture = Gesture.Exclusive(
    // 3 fingers swipe down > 50px → undo (50px stops accidental triggers)
    Gesture.Pan()
      .minPointers(3)
      .onEnd(e => {
        'worklet';
        if (e.translationY > 50) scheduleOnRN(undo);
      }),

    // 2 fingers double tap → redo
    Gesture.Tap()
      .numberOfTaps(2)
      .minPointers(2)
      .onEnd(() => {
        'worklet';
        scheduleOnRN(redo);
      }),
  );

  // STEP 9 — Convert shared values into a style (re-runs when any value changes)
  // No 'worklet' needed — Reanimated v4 adds it automatically.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` }, // must be a string e.g. "1.57rad"
    ],
  }));

  // STEP 10 — Render
  // GestureHandlerRootView  → required wrapper, gestures break on Android without it
  //   GestureDetector(global) → undo/redo on full screen
  //     GestureDetector(box)  → pan/pinch/rotate on the box only
  //       Animated.View       → the box that moves/scales/rotates
  return (
    <GestureDetector gesture={globalGesture}>
      <View style={[styles.container, styles.content]}>
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
  );
};
