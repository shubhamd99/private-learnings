# Drag · Resize · Rotate + Undo/Redo

> Machine Coding — confirmed asked July 2025

<p align="center">
  <img src="preview/image-01.png" width="280" alt="App preview" />
</p>

---

## Gestures

| Gesture                    | Action |
| -------------------------- | ------ |
| 1-finger drag              | Move   |
| 2-finger pinch             | Resize |
| 2-finger twist             | Rotate |
| 3-finger swipe down > 50px | Undo   |
| 2-finger double tap        | Redo   |

---

## Packages & Why

| Package                        | Why                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `react-native-gesture-handler` | Gesture primitives that run on the UI thread, not the JS thread                       |
| `react-native-reanimated`      | Shared values + animated styles that update at 60fps without touching JS              |
| `react-native-worklets`        | `scheduleOnRN` — bridge to call JS functions (dispatch) from a worklet                |
| `useReducer`                   | Manages past/current/future undo stack; cleaner than `useState` for multi-field state |

---

## State Shape

```ts
// Snapshot of the box at one point in time
interface BoxState {
  x;
  y;
  scale;
  rotation;
}

// Undo/redo stack — both arrays use END as top of stack
interface AppState {
  current: BoxState; // what the box looks like now
  past: BoxState[]; // undo pops from end
  future: BoxState[]; // redo pops from end
}
```

---

## Reducer Logic

```
ADD → past.push(current),    current = payload,   future = []
UNDO       → past.pop() → current,  future.push(old current)
REDO       → future.pop() → current, past.push(old current)
```

Both `past` and `future` are end-of-array stacks — consistent push/pop direction.
`future` ordering is reversed (`[D,C,B]` not `[B,C,D]`) but REDO always pops from the same end so behaviour is identical.

> Wipe `future` on ADD — any new action after an undo must discard the redo branch.

---

## Key Concepts

**`useSharedValue`** — value that lives on the **native OS UI thread** (not the JS thread). Read/write at 60fps without crossing the JS bridge. Used for translateX/Y, scale, rotation, and gesture base snapshots.

**`useAnimatedStyle`** — callback that runs as a worklet on the UI thread. Re-executes automatically when any shared value it reads changes. Attach result to `<Animated.View>` not `<View>`.

**`withSpring(value)`** — animates a shared value with spring physics instead of snapping. The `useEffect` runs on every dispatch (ADD, UNDO, REDO). On ADD it's a no-op (box already at the right position). On UNDO/REDO it springs the box to the saved position.

**`'worklet'` directive** — string literal at top of a function. Babel plugin serialises the function so it runs on the UI thread. Without it, the function only exists on the JS thread and can't safely read/write shared values at 60fps.

**`scheduleOnRN(fn, ...args)`** — runs a plain JS function on the RN (JS) thread from a worklet. Used in every `onEnd` to call `dispatch`. You cannot call React APIs directly from a worklet.

```
worklet (UI thread) ──scheduleOnRN──► dispatch (JS thread)
JS thread ──useEffect──► shared values (withSpring)
```

**`GestureHandlerRootView`** — required root wrapper. Without it gestures silently fail on Android.

**`GestureDetector`** — attaches a composed `Gesture.*` to a subtree.

**`Gesture.Simultaneous`** — all gestures recognise at once. Used for pan + pinch + rotation on the box.

**`Gesture.Exclusive`** — only the first recognising gesture fires. Used for undo vs redo so they don't both trigger.

---

## Gesture Lifecycle

| Callback   | When                | What to do                                                        |
| ---------- | ------------------- | ----------------------------------------------------------------- |
| `onBegin`  | Finger touches down | Snapshot `translateX/Y/scale/rotation` → `baseX/Y/scale/rotation` |
| `onUpdate` | Every frame (60fps) | `animated = base + delta`                                         |
| `onEnd`    | Finger lifts        | `scheduleOnRN(saveState, commit())`                               |

> Never dispatch in `onUpdate` — that's 60 undo entries per second.

**Event values (cumulative from gesture start, not from previous frame):**

- `e.translationX/Y` — displacement in px → `base + translation`
- `e.scale` — ratio (2.0 = fingers 2× apart) → `base × scale`
- `e.rotation` — radians → `base + rotation`

---

## Threads

React Native has 3 threads:

| Thread                                | What runs here                                              |
| ------------------------------------- | ----------------------------------------------------------- |
| **JS Thread** (JavaScript VM)         | React, useReducer, useEffect, fetch, business logic         |
| **UI Thread** (native OS main thread) | Frame rendering, gesture callbacks, shared values, worklets |
| **Shadow Thread**                     | Flexbox / Yoga layout calculations                          |

The **UI thread is the native main thread of the OS** — the same thread the OS uses to draw every frame to the screen. Keeping animations here means a slow JS operation (fetch, big loop) never causes dropped frames.

```
JS Thread                         UI Thread (native OS main thread)
─────────────────────             ──────────────────────────────────
useReducer state                  useSharedValue (x, y, scale, rotation)
dispatch(action)                  gesture callbacks ('worklet')
useEffect → withSpring            useAnimatedStyle → transform
```

The bridge crosses only twice per gesture:

1. `onEnd` → `scheduleOnRN` → `dispatch` (UI → JS)
2. State change → `useEffect` → `withSpring` (JS → UI)

---

## Interview Script

> "Time-travel state machine. BoxState = x/y/scale/rotation. Undo/redo uses past/future stacks —
> PUSH clears future, UNDO pops past, REDO pops future. Gestures run as worklets on the UI thread,
> updating shared values every frame. On release, scheduleOnRN commits to the reducer on the JS thread."

```
1. State shape   → BoxState { x, y, scale, rotation }
2. Undo stack    → { current, past[], future[] } — 3 actions
3. Gesture map   → Pan=x/y  Pinch=scale  Rotation=rotation  3-finger=undo  2-tap=redo
4. Thread bridge → onUpdate animates, onEnd commits via scheduleOnRN
5. Sync hook     → useEffect springs animated values back on undo/redo
```
