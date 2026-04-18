import React from 'react';
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useChat } from './src/hooks/useChat';
import { ChatBubble } from './src/components/ChatBubble';
import { ChatInput } from './src/components/ChatInput';

export default function App() {
  const {
    messages,
    isTyping,
    sendMessage,
    isLoadingHistory,
    loadMoreMessages,
  } = useChat();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            inverted
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Start a conversation!</Text>
              </View>
            }
            ListHeaderComponent={
              isTyping ? (
                <View style={styles.typingContainer}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={styles.typingText}>AI is typing...</Text>
                </View>
              ) : null
            }
            ListFooterComponent={
              isLoadingHistory ? (
                <View style={styles.historyLoadingContainer}>
                  <ActivityIndicator size="small" color="#999" />
                </View>
              ) : null
            }
          />
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // 1. Root container requires flex: 1 to claim the full device screen strictly
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    // 2. Pushes the boundaries, but importantly shrinks exactly when the iOS keyboard appears
    flex: 1,
  },
  listContent: {
    // 3. Vertical padding gives breathing room to first/last items against the edges
    paddingVertical: 16,
    // 4. flexGrow: 1 stretches the inner scrollable canvas strictly across the visible FlatList UI
    flexGrow: 1,
    // 5. In an inverted list, default rendering behavior starts from bottom. flexGrow handles empty states fine natively.
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    marginLeft: 8,
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  historyLoadingContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
