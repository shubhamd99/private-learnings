import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface Props {
  // 0-100; ignored when autoPlay is true
  progress?: number;
  // optional label shown on the right of the bar
  label?: string;
  // when true, loops 0->100 continuously with no external state needed
  autoPlay?: boolean;
}

export const ProgressBar = ({
  progress = 0,
  label,
  autoPlay = false,
}: Props) => {
  // STEP 1 - Animated.Value holds the current animated width as a percentage (0-100)
  // useRef keeps the same instance across renders (no reset on re-render)
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // STEP 2 - Two modes:
  //   autoPlay: Animated.loop runs 0->100 forever - no setInterval, no state, no pauses
  //   manual:   Animated.timing animates to the new `progress` value on each prop change
  useEffect(() => {
    if (autoPlay) {
      // Animated.loop resets animatedWidth to 0 and reruns timing automatically
      // This is perfectly smooth because there is no JS interval involved
      Animated.loop(
        Animated.timing(animatedWidth, {
          toValue: 100,
          duration: 2000,
          useNativeDriver: false,
        }),
      ).start();
    } else {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 400,
        useNativeDriver: false, // width is a layout prop - native driver doesn't support it
      }).start();
    }
    return () => animatedWidth.stopAnimation();
  }, [autoPlay, progress, animatedWidth]);

  // STEP 3 - Convert the animated number (0-100) to a "N%" string width
  // interpolate maps the numeric range to a string range that the style understands
  const widthStyle = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrapper}>
      {/* STEP 4 - Track: full-width grey background */}
      <View style={styles.track}>
        {/* STEP 5 - Fill: animated width grows left-to-right inside the track */}
        <Animated.View style={[styles.fill, { width: widthStyle }]} />
      </View>

      {/* STEP 6 - Label: percentage text next to the bar */}
      <Text style={styles.label}>{label ?? `${Math.round(progress)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  track: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden', // clip the fill so it respects borderRadius
  },
  fill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  label: {
    width: 40,
    fontSize: 13,
    color: '#555',
    textAlign: 'right',
  },
});
