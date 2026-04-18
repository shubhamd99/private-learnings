import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { TodoState, TodoAction, TodoContextProps } from '../types';

// 2. The pure Reducer function to deterministically process array mutations.
// Using Reducers here prevents race conditions that frequently occur when
// utilizing `setTodos(prev => ...)` rapidly across multiple independent callbacks.
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          { id: Date.now().toString(), text: action.payload, completed: false },
          ...state.todos,
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// 4. Expose unified Context hook bound with safety checks
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      'useTodoContext must be strictly used within a TodoProvider',
    );
  }
  return context;
};
