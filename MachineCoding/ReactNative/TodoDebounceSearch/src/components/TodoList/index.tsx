import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useTodoContext } from '../../context/TodoContext';
import { TodoItemProps, TodoListProps } from '../../types';
import { styles } from './styles';

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: todo.id, text: editText.trim() },
      });
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.todoItem}>
      {/* TouchableOpacity wraps the left side to toggle completion organically */}
      <TouchableOpacity
        style={styles.todoLeft}
        onPress={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
      >
        <View
          style={[styles.checkbox, todo.completed && styles.checkboxActive]}
        />

        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            autoFocus
            onSubmitEditing={handleSave}
            onBlur={handleSave} // Automatically saves if user clicks away
          />
        ) : (
          <Text
            style={[
              styles.todoText,
              todo.completed && styles.todoTextCompleted,
            ]}
          >
            {todo.text}
          </Text>
        )}
      </TouchableOpacity>

      {/* Action Buttons Container */}
      <View style={styles.actions}>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.actionTextBlue}>Edit</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
        >
          <Text style={styles.actionTextRed}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TodoList: React.FC<TodoListProps> = ({ searchFilter }) => {
  const { state } = useTodoContext();

  // Apply the debounced string physically against the unified state
  const filteredTodos = state.todos.filter(todo =>
    todo.text.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <FlatList
      data={filteredTodos}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => <TodoItem todo={item} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          {searchFilter ? 'No matches found.' : 'No tasks yet! Add one above.'}
        </Text>
      }
    />
  );
};
