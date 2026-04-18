import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../hooks/useChat';

interface Props {
  message: Message;
}

export const ChatBubble: React.FC<Props> = ({ message }) => {
  return (
    <View
      style={[
        styles.container,
        message.isAI ? styles.aiContainer : styles.userContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          message.isAI ? styles.aiBubble : styles.userBubble,
        ]}
      >
        <Text
          style={[styles.text, message.isAI ? styles.aiText : styles.userText]}
        >
          {message.text}
        </Text>
        {!message.isAI && message.status && (
          <Text style={styles.statusText}>
            {message.status === 'sending' ? '⏱' : '✓'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // 1. Full width allows us to align bubbles arbitrarily left/right using Flexbox
    width: '100%',
    marginVertical: 4,
    paddingHorizontal: 16,
    // 2. flexDirection controls horizontal rendering direction (row vs column stack)
    flexDirection: 'row',
  },
  aiContainer: {
    // 3. Pushes this component's active items to the left
    justifyContent: 'flex-start',
  },
  userContainer: {
    // 4. Pushes this component's active items to the right
    justifyContent: 'flex-end',
  },
  bubble: {
    // 5. 80% maxWidth prevents extremely long paragraphs from touching the opposing edge
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: '#F0F0F0',
    // 6. The 4px sharp corner creates a visual directional "tail" toward the sender
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiText: {
    color: '#000000',
  },
  userText: {
    color: '#FFFFFF',
  },
  statusText: {
    fontSize: 10,
    color: '#D0E5FF',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
});
