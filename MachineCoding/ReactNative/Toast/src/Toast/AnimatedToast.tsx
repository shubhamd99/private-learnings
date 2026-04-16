import React, { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Toast from './Toast';
import { animatedToastStyles } from './styles';

interface Props {
  message: string;
  duration?: number;
  color?: string;
  icon?: string;
  onClose: () => void;
}

const AnimatedToast = ({ onClose, ...props }: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  // Enter: fade in + slide up from below
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  // Exit: fade out + slide up, then fire onClose
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  return (
    <Animated.View
      style={[
        animatedToastStyles.wrapper,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Toast {...props} onClose={handleClose} />
    </Animated.View>
  );
};

export default memo(AnimatedToast);
