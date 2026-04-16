import React from 'react';
import { View } from 'react-native';
import AnimatedToast from './AnimatedToast';
import { containerStyles } from './styles';

interface ToastItem {
  id: number;
  message: string;
  duration?: number;
  color?: string;
  icon?: string;
}

interface Props {
  toasts: ToastItem[];
  onClose: (id: number) => void;
}

export const ToastContainer = ({ toasts, onClose }: Props) => {
  if (toasts.length === 0) return null;

  return (
    <View style={containerStyles.container} pointerEvents="box-none">
      {toasts.map(({ id, message, duration, color, icon }) => (
        <AnimatedToast
          key={id}
          message={message}
          duration={duration}
          color={color}
          icon={icon}
          onClose={() => onClose(id)}
        />
      ))}
    </View>
  );
};
