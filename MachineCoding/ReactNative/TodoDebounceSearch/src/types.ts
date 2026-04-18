import React from 'react';

// --- Reducer & Context Types ---
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string } // payload maps to id
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'REMOVE_TODO'; payload: string };

export interface TodoContextProps {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

// --- TodoSearch Types ---
export interface TodoSearchProps {
  onSearch: (searchTerm: string) => void;
}

// --- TodoList Types ---
export interface TodoItemProps {
  todo: Todo;
}

export interface TodoListProps {
  searchFilter: string;
}
