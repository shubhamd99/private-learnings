import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AppModal = ({ visible, onClose }: Props) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    {/* Overlay outside the card — tapping it closes the modal */}
    <TouchableOpacity
      style={styles.overlay}
      onPress={onClose}
      activeOpacity={1}
    />

    {/* Card centered on screen; rendered on top so its touches don't reach the overlay */}
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello Modal</Text>
        <Text style={styles.body}>
          Built with RN's built-in Modal — no third-party package.
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
