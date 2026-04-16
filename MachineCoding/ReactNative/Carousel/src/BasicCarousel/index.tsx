// React
import React, { useRef, useState } from 'react';

// React Native
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// Local
import { SLIDES, SCREEN_WIDTH } from './constants';
import { styles } from './styles';

export const BasicCarousel = () => {
  // STEP 1 — track which slide is visible (JS state, updated on scroll settle)
  const [activeIndex, setActiveIndex] = useState(0);

  // STEP 2 — ref to call scrollToIndex imperatively (prev/next buttons, dot taps)
  const listRef = useRef<FlatList>(null);

  // STEP 3 — FlatList tells us the index directly when a slide becomes >50% visible
  // Must be a stable ref — FlatList ignores it if the function reference changes
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
      if (viewableItems[0]?.index != null)
        setActiveIndex(viewableItems[0].index);
    },
  ).current;
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  // STEP 4 — programmatic navigation used by dots and prev/next buttons
  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  // STEP 5 — each slide fills the full screen width (pagingEnabled requires this)
  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => (
    <View style={[styles.slide, { backgroundColor: item.bg }]}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* STEP 6 — FlatList
          horizontal    → scrolls left/right
          pagingEnabled → snaps to exact multiples of SCREEN_WIDTH (one slide per page)
          getItemLayout → skips measuring each item; required for scrollToIndex to work */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH, // each slide is exactly one screen wide
          offset: SCREEN_WIDTH * index, // slide 0 starts at 0, slide 1 at 375, slide 2 at 750…
          index, // required by FlatList; lets scrollToIndex skip layout measurement
        })}
      />

      {/* STEP 7 — dot indicators; active dot is wider to show position */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => scrollTo(i)}>
            <View style={[styles.dot, i === activeIndex && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* STEP 8 — prev/next buttons; disabled at boundaries */}
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
