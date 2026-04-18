import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useTodoContext } from '../../context/TodoContext';
import { styles } from './styles';

export const TodoInput = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTodoContext(); // Tapping directly into global dispatch

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() });
      setText(''); // Reset input immediately physically locally
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd} // Allows submitting directly via iOS/Android keyboard return
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
