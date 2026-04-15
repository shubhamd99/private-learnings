# Carousel — React Native (Machine Coding)

Two carousel implementations toggled via a tab bar in `App.tsx`.

## Preview

|         Basic (FlatList)          |        Animated (Reanimated)         |
| :-------------------------------: | :----------------------------------: |
| ![Basic Carousel](preview/01.png) | ![Animated Carousel](preview/02.png) |

---

## Project Structure

```
src/
  BasicCarousel/
    constants.ts    ← SCREEN_WIDTH, SLIDES
    styles.ts       ← StyleSheet
    index.tsx       ← component logic
  AnimatedCarousel/
    constants.ts    ← SCREEN_WIDTH, SLIDES
    styles.ts       ← StyleSheet
    index.tsx       ← component logic
App.tsx             ← tab toggle
index.js            ← SafeAreaProvider + AppRegistry
```

---

## Basic Carousel — `src/BasicCarousel/`

Uses only built-in React Native primitives. No third-party animation library.

**Key APIs:**

- `FlatList` with `horizontal` + `pagingEnabled` — auto-snaps to multiples of `SCREEN_WIDTH`
- `onMomentumScrollEnd` — fires after scroll settles, reliable index tracking
- `getItemLayout` — skips item measurement, required for `scrollToIndex` to work
- `scrollToIndex` — programmatic navigation for dots and prev/next buttons

**Benefits:**

- Zero extra dependencies
- Simple mental model — FlatList handles all scroll physics
- Easy to understand and write from scratch in an interview

---

## Animated Carousel — `src/AnimatedCarousel/`

Same FlatList structure as Basic, but uses Reanimated v4 to animate each slide.

**Key APIs:**

- `useSharedValue` — holds `scrollX`, lives on the UI thread (not JS)
- `useAnimatedScrollHandler` — reads scroll offset at 60fps without touching JS thread
- `Animated.FlatList` — drop-in swap for `FlatList`; accepts the Reanimated scroll handler
- `useAnimatedStyle` + `interpolate` — derives `scale` per slide from scroll position; runs on UI thread

**Benefits:**

- Scroll tracking and scale animation run entirely on the UI thread — no JS bridge, no dropped frames
- `Animated.FlatList` is the only structural change from BasicCarousel — easy to explain the delta
- `interpolate` maps scroll offset to any visual property (scale, opacity, translateY) with one call

---

## Why `GestureHandlerRootView`?

`react-native-gesture-handler` replaces React Native's default touch handling system with its own native recognizers. On Android this replacement is complete — the library takes over all touch dispatch. Without `GestureHandlerRootView` at the root, the two touch systems compete and scroll or tap events can silently fail.

Even though `AnimatedCarousel` doesn't use explicit gestures like `Gesture.Pan()`, the package is installed (it ships with Reanimated v4 as a peer dep), so the wrapper is required.

**Rule:** one `GestureHandlerRootView` wrapping each screen (or the whole app root) whenever `react-native-gesture-handler` is in the project.

---

## Key Difference

|                 | Basic                   | Animated                                                                           |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| Scroll handling | RN built-in (JS thread) | `useAnimatedScrollHandler` (UI thread)                                             |
| List component  | `FlatList`              | `Animated.FlatList`                                                                |
| Slide animation | None                    | `interpolate` → scale per slide                                                    |
| Performance     | Fine for most cases     | Guaranteed 60fps, no JS involvement                                                |
| Dependencies    | None                    | `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets` |

---

## Setup

```sh
npm install

# iOS only
bundle exec pod install
```

> `babel.config.js` already has `react-native-worklets/plugin` configured.
