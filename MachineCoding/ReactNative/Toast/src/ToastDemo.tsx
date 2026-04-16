import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useToast } from './Toast';
import { styles } from './styles';

export const ToastDemo = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Toast System</Text>

      <TouchableOpacity
        style={styles.btnDefault}
        onPress={() => showToast({ message: 'Default toast (3s auto-hide)' })}
      >
        <Text style={styles.btnText}>Default Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnSuccess}
        onPress={() =>
          showToast({
            message: 'File saved successfully!',
            color: '#2e7d32',
            icon: '✓',
            duration: 2000,
          })
        }
      >
        <Text style={styles.btnText}>Success (2s)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnError}
        onPress={() =>
          showToast({
            message: 'Something went wrong. Please try again.',
            color: '#c62828',
            icon: '✕',
            duration: 5000,
          })
        }
      >
        <Text style={styles.btnText}>Error (5s)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnWarning}
        onPress={() =>
          showToast({
            message: 'Low battery warning',
            color: '#e65100',
            icon: '⚡',
          })
        }
      >
        <Text style={styles.btnText}>Warning</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnInfo}
        onPress={() =>
          showToast({
            message: 'Update available',
            color: '#1565c0',
            icon: 'ℹ',
          })
        }
      >
        <Text style={styles.btnText}>Info</Text>
      </TouchableOpacity>
    </View>
  );
};
