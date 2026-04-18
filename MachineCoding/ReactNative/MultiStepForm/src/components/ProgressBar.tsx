import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormContext, TOTAL_STEPS } from '../context/FormContext';

export const ProgressBar: React.FC = () => {
  const { currentStep } = useFormContext();

  // Calculate percentage dynamically based on globally provided context steps
  const percentage = Math.min(
    100,
    Math.max(0, (currentStep / TOTAL_STEPS) * 100),
  );

  return (
    <View style={styles.track}>
      {/* Native View allows us to securely map width percentage */}
      <View style={[styles.fill, { width: `${percentage}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: '#E0E0E0',
    width: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#007AFF', // Solid primary color
    // A more complex app would animate this width change using `Animated.timing`
  },
});
