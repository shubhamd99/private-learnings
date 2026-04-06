import { useState, useRef } from "react";

export default function App() {
  const textRef = useRef();
  const [todos, setTodos] = useState([
    { id: 1, text: "Walk the dog" },
    { id: 2, text: "Water the plants" },
    { id: 3, text: "Wash the dishes" },
  ]);

  // UNCONTROLLED input — input value is read directly from the DOM via useRef,
  // not tracked in React state. React doesn't know what's typed until you read it.

  // Using index as key can cause incorrect reconciliation when list items
  // change order or are removed. React may reuse DOM nodes incorrectly.
  // It's better to use stable unique IDs.
  const addTodo = () => {
    if (textRef?.current?.value) {
      setTodos((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: textRef.current.value,
        },
      ]);
    }
  };

  const onDelete = (id) => {
    // Mutating state directly can cause React rendering bugs.
    // filter is a good and recommended approach here because it does not mutate the original array
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input ref={textRef} type="text" placeholder="Add your task" />
        <div>
          <button onClick={addTodo}>Submit</button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.text} </span>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---- SIMPLE VERSION (for interviews) ----
//
// ul = unordered list (<ul>) — renders as a bulleted list container
// li = list item (<li>) — each individual item inside the <ul>
//
// What is crypto.randomUUID()?
//   Built-in browser API that generates a unique ID string (e.g. "a1b2-c3d4-...").
//   No library needed. Used here so each todo has a stable, unique key for React.
//   Never use array index as key — if you delete item 0, all keys shift and React re-renders wrong items.
//
// Why useRef in the original?
//   useRef grabs the raw DOM input element so you can read its value directly (textRef.current.value).
//   It does NOT cause a re-render when the value changes — good for performance.
//   Downside: you can't easily clear or control the input value from React state.
//
// Why useState (controlled input) is better for interviews:
//   - value is always in sync with state — easier to reason about
//   - easy to clear input after submit (setInputValue(""))
//   - easier to add validation (trim, length checks)
//   - re-renders on every keystroke, but that's fine for simple forms

function TodoListSimple() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    // Don't add empty todos
    if (!inputValue.trim()) return;

    // Spread existing todos, add new one — never mutate state directly
    setTodos([...todos, { id: crypto.randomUUID(), text: inputValue }]);
    setInputValue(""); // clear input after adding
  };

  const deleteTodo = (id) => {
    // filter returns a new array — safe, no mutation
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Controlled input — value tied to state */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add your task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {/* Always use stable unique ID as key, not array index */}
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
