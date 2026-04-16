import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_DURATION, TOAST_COLORS } from './constants';
import { toastStyles } from './styles';

interface Props {
  message: string;
  duration?: number;
  color?: string;
  icon?: string;
  onClose: () => void;
}

const Toast = ({
  message,
  duration = DEFAULT_DURATION,
  color = TOAST_COLORS.default,
  icon,
  onClose,
}: Props) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onClose, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // onClose identity is stable (useCallback in provider), so this is safe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toastStyle = StyleSheet.flatten([
    toastStyles.toast,
    { backgroundColor: color },
  ]);

  return (
    <View style={toastStyle}>
      {icon ? <Text style={toastStyles.icon}>{icon}</Text> : null}
      <Text style={toastStyles.message} numberOfLines={2}>
        {message}
      </Text>
      <TouchableOpacity
        onPress={onClose}
        hitSlop={8}
        style={toastStyles.closeBtn}
      >
        <Text style={toastStyles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Toast);
