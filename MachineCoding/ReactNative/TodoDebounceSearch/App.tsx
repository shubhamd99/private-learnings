import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { TodoProvider } from './src/context/TodoContext';
import { TodoInput } from './src/components/TodoInput';
import { TodoSearch } from './src/components/TodoSearch';
import { TodoList } from './src/components/TodoList';

// The fully decoupled orchestrator that binds Context wrappers safely over the View.
// Because it does not contain inline `useReducer` bindings, this top-level layer
// NEVER unexpectedly re-renders when a Todo is typed or deleted! (Massive performance boost).
const MainLayout = () => {
  const [activeSearchFilter, setActiveSearchFilter] = useState('');

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.headerTitle}>Tasks</Text>

      {/* Accepts an onSearch callback which is debounced safely internally */}
      <TodoSearch onSearch={setActiveSearchFilter} />

      {/* Independent Todo Insertion (Zero re-renders from Search) */}
      <TodoInput />

      {/* Renders mapping safely through Context, filtered linearly on the view layer */}
      <TodoList searchFilter={activeSearchFilter} />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Master Redux-styled State Wrapper (Context + Reducer) */}
          <TodoProvider>
            <MainLayout />
          </TodoProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
});
