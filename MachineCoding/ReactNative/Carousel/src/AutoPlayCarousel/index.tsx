// React
import React, { useRef, useState, useEffect } from 'react';

// React Native
import {
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

// Local
import { SLIDES, SCREEN_WIDTH, AUTOPLAY_INTERVAL } from './constants';
import { styles } from './styles';

/**
 * AutoPlayCarousel
 *
 * Built on top of BasicCarousel (FlatList + pagingEnabled).
 * Two additions:
 *   1. Auto-play   — setInterval advances the slide every AUTOPLAY_INTERVAL ms.
 *                    Interval resets on every activeIndex change (manual or auto).
 *   2. Dot animation — each dot's width is an Animated.Value that transitions
 *                    between 8px (inactive) and 20px (active) on activeIndex change.
 *                    useNativeDriver: false because `width` is a layout property.
 */
export const AutoPlayCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  // STEP 1 — one Animated.Value per dot; initial width = 8 (inactive)
  // useRef keeps the array stable across renders
  const dotWidths = useRef(SLIDES.map(() => new Animated.Value(8))).current;

  // STEP 2 — animate all dots whenever activeIndex changes
  // Active dot → width 20, all others → width 8
  useEffect(() => {
    SLIDES.forEach((_, i) => {
      Animated.timing(dotWidths[i], {
        toValue: i === activeIndex ? 20 : 8,
        duration: 200,
        useNativeDriver: false, // width is a layout prop — native driver doesn't support it
      }).start();
    });
  }, [activeIndex, dotWidths]);

  // STEP 3 — auto-play: advance to next slide every AUTOPLAY_INTERVAL ms
  // Effect re-runs on activeIndex change so the timer resets after each slide advance
  // (whether triggered by auto-play or manual swipe/button)
  useEffect(() => {
    const id = setInterval(() => {
      const next = (activeIndex + 1) % SLIDES.length;
      scrollTo(next);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id); // clear on activeIndex change or unmount
  }, [activeIndex]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
  };

  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => (
    <View style={[styles.slide, { backgroundColor: item.bg }]}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* STEP 4 — animated dots: Animated.View reads dotWidths[i] for its width */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => scrollTo(i)}>
            <Animated.View style={[styles.dot, { width: dotWidths[i] }]} />
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
    </View>
  );
};
