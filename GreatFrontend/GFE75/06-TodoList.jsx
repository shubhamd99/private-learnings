import { useState, useRef } from "react";

export default function App() {
  const textRef = useRef();
  const [todos, setTodos] = useState([
    { id: 1, text: "Walk the dog" },
    { id: 2, text: "Water the plants" },
    { id: 3, text: "Wash the dishes" },
  ]);

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
