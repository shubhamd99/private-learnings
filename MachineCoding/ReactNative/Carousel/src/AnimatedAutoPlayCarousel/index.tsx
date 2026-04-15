// React
import React, { useRef, useState, useEffect } from 'react';

// React Native
import {
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

// Reanimated v4
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';

// GestureHandlerRootView required root wrapper for react-native-gesture-handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Local
import { SLIDES, SCREEN_WIDTH, AUTOPLAY_INTERVAL } from './constants';
import { styles } from './styles';

// ─── AnimatedDot ──────────────────────────────────────────────────────────────
// Separate component so useAnimatedStyle can be called per dot (hooks can't go in .map).
//
// Dot width is interpolated directly from scrollX (shared value on UI thread):
//   scrollX at this dot's slide center → width 20 (active)
//   scrollX one slide away             → width 8  (inactive)
// This runs entirely on the UI thread — no JS involvement per frame.

type DotProps = { index: number; scrollX: SharedValue<number> };

const AnimatedDot = ({ index, scrollX }: DotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [
        (index - 1) * SCREEN_WIDTH, // one slide before → 8
        index * SCREEN_WIDTH, // this slide center → 20
        (index + 1) * SCREEN_WIDTH, // one slide after  → 8
      ],
      [8, 20, 8],
      Extrapolation.CLAMP,
    );
    return { width };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AnimatedAutoPlayCarousel
 *
 * Built on top of AnimatedCarousel (Reanimated + GestureHandler).
 * Two additions vs AnimatedCarousel:
 *   1. Auto-play   — setInterval advances the slide every AUTOPLAY_INTERVAL ms.
 *   2. Dot animation — width is interpolated from scrollX on the UI thread,
 *                      so dots animate in sync with finger during manual swipe too.
 */
export const AnimatedAutoPlayCarousel = () => {
  // scrollX lives on UI thread; drives both slide scale and dot width animations
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<Animated.FlatList<(typeof SLIDES)[0]>>(null);

  // STEP 1 — scrollX updated at 60fps on UI thread (no JS bridge)
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
  });

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
  };

  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  // STEP 2 — auto-play: advance every AUTOPLAY_INTERVAL ms
  // Effect re-runs on activeIndex change so timer resets after every slide advance
  useEffect(() => {
    const id = setInterval(() => {
      const next = (activeIndex + 1) % SLIDES.length;
      scrollTo(next);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [activeIndex]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* STEP 3 — Animated.FlatList: same as AnimatedCarousel */}
      <Animated.FlatList
        ref={listRef}
        data={SLIDES}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg }]}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* STEP 4 — AnimatedDot per slide: width driven by scrollX on UI thread
          Dots animate during the swipe itself, not just after it settles */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => scrollTo(i)}>
            <AnimatedDot index={i} scrollX={scrollX} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <Text style={[styles.btn, activeIndex === 0 && styles.disabled]}>
            ‹ Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex === SLIDES.length - 1}
        >
          <Text
            style={[
              styles.btn,
              activeIndex === SLIDES.length - 1 && styles.disabled,
            ]}
          >
            Next ›
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};
