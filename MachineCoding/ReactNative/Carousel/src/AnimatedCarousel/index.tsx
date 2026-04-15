// React
import React, { useRef, useState } from 'react';

// React Native
import {
  View,
  Text,
  TouchableOpacity,
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

// GestureHandlerRootView is required as root wrapper — gestures break on Android without it
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Local
import { SLIDES, SCREEN_WIDTH } from './constants';
import { styles } from './styles';

// ─── Slide item ───────────────────────────────────────────────────────────────
// Separate component so useAnimatedStyle can be called per item (hooks can't go in .map).
// Scales down to 0.85 when offscreen, 1.0 when centered — driven by scroll position.

type SlideItemProps = {
  item: (typeof SLIDES)[0];
  index: number;
  scrollX: SharedValue<number>; // shared value from parent — read on UI thread
};

const SlideItem = ({ item, index, scrollX }: SlideItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    // inputRange: prev slide center → this slide center → next slide center
    const scale = interpolate(
      scrollX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.85, 1.0, 0.85],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View
      style={[styles.slide, { backgroundColor: item.bg }, animatedStyle]}
    >
      <Text style={styles.title}>{item.title}</Text>
    </Animated.View>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

export const AnimatedCarousel = () => {
  // STEP 1 — scrollX tracks horizontal offset on the UI thread (no JS bridge)
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<Animated.FlatList<(typeof SLIDES)[0]>>(null);

  // STEP 2 — scrollHandler runs on UI thread; updates scrollX at 60fps
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
  });

  // STEP 3 — update activeIndex when scroll settles (same as BasicCarousel)
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
  };

  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  // GestureHandlerRootView — required wrapper whenever react-native-gesture-handler is installed.
  // On Android, the library replaces RN's default touch system entirely. Without this wrapper,
  // touches are handled by two competing systems and scroll/tap events can fail or behave
  // incorrectly. On iOS the impact is less severe but it is still required by the library.
  // Rule of thumb: one GestureHandlerRootView at the top of every screen that uses the package.
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* STEP 4 — Animated.FlatList: same as FlatList but accepts Reanimated onScroll handler */}
      <Animated.FlatList
        ref={listRef}
        data={SLIDES}
        renderItem={({ item, index }) => (
          <SlideItem item={item} index={index} scrollX={scrollX} />
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

      {/* STEP 5 — dots (state-based, same as BasicCarousel) */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => scrollTo(i)}>
            <View style={[styles.dot, i === activeIndex && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* STEP 6 — prev/next buttons */}
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
