# Bottom Sheet

> Machine Coding — two versions: Basic (no third-party) and Gesture (Reanimated)

<p align="center">
  <img src="preview/01.png" width="280" alt="Bottom sheet open" />
</p>

---

## File structure

```
src/
  styles.ts             — shared styles + SHEET_HEIGHT constant
  BasicBottomSheet.tsx  — Animated + PanResponder (built-in RN)
  GestureBottomSheet.tsx — gesture-handler + Reanimated (UI-thread gestures)
App.tsx                 — tab switcher + open button
```

---

## How it works

```
translateY = 0            → sheet fully visible
translateY = SHEET_HEIGHT → sheet fully off-screen (below viewport)

Open button pressed → setVisible(true) → useEffect → spring to 0
Close triggered     → setVisible(false) → useEffect → spring to SHEET_HEIGHT
```

Close triggers (both versions):

1. Backdrop tap
2. Close button
3. Swipe down > 80px
4. Flick down fast (velocity threshold)

---

## Basic version — `Animated` + `PanResponder`

| Concept                     | Detail                                                             |
| --------------------------- | ------------------------------------------------------------------ |
| `Animated.Value`            | lives on JS thread; sufficient for this use case                   |
| `PanResponder`              | `onMoveShouldSetPanResponder: dy > 5` — only claims downward drags |
| `translateY.setValue(g.dy)` | follows finger directly during drag                                |
| `Animated.spring`           | snaps back to open if not dismissed                                |
| `useNativeDriver: true`     | offloads transform to native for smoother animation                |
| `pointerEvents="none"`      | when closed, container doesn't block underlying touches            |

---

## Gesture version — `react-native-gesture-handler` + Reanimated

| Concept                  | Detail                                                                |
| ------------------------ | --------------------------------------------------------------------- |
| `useSharedValue`         | lives on UI thread — gesture can update it at 60fps without JS bridge |
| `Gesture.Pan`            | gesture callback runs as a worklet on UI thread                       |
| `withSpring`             | spring physics on UI thread — no JS involvement                       |
| `scheduleOnRN(onClose)`  | bridge back to JS thread to call `onClose` from a worklet             |
| `GestureHandlerRootView` | required root wrapper — without it gestures fail on Android           |

```
UI thread                      JS thread
────────────────────           ──────────────────
Gesture.Pan onUpdate           useEffect → withSpring
translateY (shared value)      onClose → setVisible(false)
onEnd → scheduleOnRN(onClose) ──►
```

---

## Why `pointerEvents="none"` when closed

The sheet container uses `absoluteFill` — it covers the whole screen even when off-screen. Without `pointerEvents="none"`, the invisible container intercepts all taps and the Open button becomes untappable after the sheet closes.

---

## Packages (Gesture version only)

| Package                        | Why                                      |
| ------------------------------ | ---------------------------------------- |
| `react-native-gesture-handler` | gestures on UI thread, not JS thread     |
| `react-native-reanimated`      | shared values + animated styles at 60fps |
| `react-native-worklets`        | `scheduleOnRN` — call JS from a worklet  |

---

## Interview Script

> "One boolean drives open/close. translateY=0 is open, translateY=SHEET_HEIGHT is closed.
> Basic uses PanResponder on JS thread; Gesture version uses shared values on UI thread so animation never drops frames even if JS is busy.
> Both versions: backdrop tap, Close button, and swipe-down all call the same onClose."

```
1. State        → useState(false) in App
2. Animation    → spring translateY between 0 and SHEET_HEIGHT
3. Drag down    → onUpdate clamps to > 0; onEnd checks threshold
4. Close paths  → backdrop / button / swipe — all call onClose
5. pointerEvents → "none" when closed so underlying content is tappable
```
