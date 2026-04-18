import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="#999"
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!text.trim() || disabled) && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!text.trim() || disabled}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // 1. Flex row aligns the input field and the send button side-by-side
    flexDirection: 'row',
    padding: 12,
    // 2. Extra bottom padding gives breathing room above the iOS home indicator bar
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFEFEF',
    // 3. Align flex-end ensures the Send button stays at the bottom even when multiline input grows tall
    alignItems: 'flex-end',
  },
  input: {
    // 4. Flex 1 tells the TextInput to consume all available horizontal space pushing the Send button right
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    // 5. maxHeight guarantees the input won't cover the entire screen if the user pastes an essay
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    // 6. Justify and Align Center perfectly centers the text "Send" inside the button boundary
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#99C7FF',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
