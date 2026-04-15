import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppModal } from './AppModal';
import { styles } from './styles';

export const ModalApp = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.openBtn} onPress={() => setVisible(true)}>
        <Text style={styles.openBtnText}>Open Modal</Text>
      </TouchableOpacity>
      <AppModal visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};
