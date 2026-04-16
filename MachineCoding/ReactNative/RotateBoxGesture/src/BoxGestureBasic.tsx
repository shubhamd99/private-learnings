import React, { useReducer, useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import { reducer, initialState } from './reducer';
import { styles } from './styles';

// --- helpers ---
type T = { pageX: number; pageY: number };
const dist = (a: T, b: T) => Math.hypot(b.pageX - a.pageX, b.pageY - a.pageY);
const angle = (a: T, b: T) => Math.atan2(b.pageY - a.pageY, b.pageX - a.pageX);

export const BoxGestureBasic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Animated values (built-in RN, no Reanimated)
  const tx = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;
  const sc = useRef(new Animated.Value(1)).current;
  const ro = useRef(new Animated.Value(0)).current;

  // Synchronous mirror of current values (Animated.Value can't be read back)
  const live = useRef({ x: 0, y: 0, scale: 1, rotation: 0 });

  // Spring to new state on undo/redo
  useEffect(() => {
    const { x, y, scale, rotation } = state.current;
    live.current = { x, y, scale, rotation };
    Animated.spring(tx, { toValue: x, useNativeDriver: true }).start();
    Animated.spring(ty, { toValue: y, useNativeDriver: true }).start();
    Animated.spring(sc, { toValue: scale, useNativeDriver: true }).start();
    Animated.spring(ro, { toValue: rotation, useNativeDriver: true }).start();
  }, [state, tx, ty, sc, ro]);

  const save = () => dispatch({ type: 'ADD', payload: { ...live.current } });

  // Refs to capture gesture start values
  const base = useRef({ x: 0, y: 0, scale: 1, rotation: 0 });
  const p0 = useRef({ dist: 1, scale: 1 });   // pinch baseline
  const r0 = useRef({ angle: 0, rotation: 0 }); // rotate baseline

  // Box: 1-finger pan, 2-finger pinch + rotate
  const boxPR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: e => e.nativeEvent.touches.length <= 2,
      onMoveShouldSetPanResponder:  e => e.nativeEvent.touches.length <= 2,
      onPanResponderGrant: e => {
        const t = e.nativeEvent.touches;
        base.current = { ...live.current };
        if (t.length >= 2) {
          p0.current = { dist: dist(t[0], t[1]), scale: live.current.scale };
          r0.current = { angle: angle(t[0], t[1]), rotation: live.current.rotation };
        }
      },
      onPanResponderMove: (e, gs) => {
        const t = e.nativeEvent.touches;
        if (t.length === 1) {
          // Pan: PanResponder gives dx/dy from gesture start automatically
          live.current.x = base.current.x + gs.dx;
          live.current.y = base.current.y + gs.dy;
          tx.setValue(live.current.x);
          ty.setValue(live.current.y);
        } else if (t.length >= 2) {
          // Pinch: scale = baseScale × (currentDist / startDist)
          live.current.scale = p0.current.scale * (dist(t[0], t[1]) / p0.current.dist);
          sc.setValue(live.current.scale);
          // Rotate: rotation = baseRotation + (currentAngle - startAngle)
          live.current.rotation = r0.current.rotation + (angle(t[0], t[1]) - r0.current.angle);
          ro.setValue(live.current.rotation);
        }
      },
      onPanResponderRelease:   save,
      onPanResponderTerminate: save, // fired when outer responder takes over
    }),
  ).current;

  // Global: 3-finger swipe down = undo, swipe up = redo
  // Capture phase so it wins over box responder for 3+ touches
  const startY = useRef<number | null>(null);
  const outerPR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: e => e.nativeEvent.touches.length >= 3,
      onMoveShouldSetPanResponderCapture:  e => e.nativeEvent.touches.length >= 3,
      onPanResponderGrant: e => { startY.current = e.nativeEvent.touches[0].pageY; },
      onPanResponderMove: e => {
        if (startY.current === null) return;
        const dy = e.nativeEvent.touches[0].pageY - startY.current;
        if (dy > 50)  { dispatch({ type: 'UNDO' }); startY.current = null; }
        if (dy < -50) { dispatch({ type: 'REDO' }); startY.current = null; }
      },
      onPanResponderRelease: () => { startY.current = null; },
    }),
  ).current;

  // Animated.Value is a number; `rotate` transform needs a string like "1.57rad"
  const rotateStr = ro.interpolate({
    inputRange: [-4 * Math.PI, 4 * Math.PI],
    outputRange: ['-12.566rad', '12.566rad'],
  });

  return (
    <View style={styles.container} {...outerPR.panHandlers}>
      <View style={styles.content}>
        <Animated.View
          {...boxPR.panHandlers}
          style={[styles.box, { transform: [
            { translateX: tx }, { translateY: ty },
            { scale: sc }, { rotate: rotateStr },
          ]}]}
        >
          <Text style={styles.boxText}>Box</Text>
        </Animated.View>
        <Text style={styles.hint}>
          Pan · Pinch · Rotate{'\n'}3-finger ↓ = Undo · 3-finger ↑ = Redo
        </Text>
      </View>
    </View>
  );
};
