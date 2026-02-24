import { useState, useRef } from "react";
import "./App.css";

// In the item component, we will maintain the state to handle the double-click
// and show the input box to edit the text
// As at any given time, only one item can be edited (it will hide if the input goes out of focus)
// We can safely have the state in the child component.

const Item = ({
  text,
  completed,
  id,
  updateCompleted,
  deleteTodo,
  updateText,
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(text);

  return (
    <div className="item">
      <div className="circle" onClick={() => updateCompleted(id)}>
        {completed ? <span>&#10003;</span> : ""}
      </div>
      <div
        className={completed ? "strike" : ""}
        onDoubleClick={() => {
          if (!completed) {
            setEdit(true);
          }
        }}
      >
        {edit ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            onBlur={() => {
              setEdit(false);
              updateText(id, editText);
            }}
          />
        ) : (
          text
        )}
      </div>
      <div className="close" onClick={() => deleteTodo(id)}>
        X
      </div>
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.target.value && e.key === "Enter") {
      setTodos([
        ...todos,
        {
          text: e.target.value,
          completed: false,
          id: Date.now(),
        },
      ]);
      inputRef.current.value = "";
    }
  };

  // toggle completed
  const handleCompleted = (id) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(updatedList);
  };

  // delete item
  const handleDelete = (id) => {
    const updatedList = todos.filter((todo) => todo.id !== id);
    setTodos(updatedList);
  };

  // handle text update
  const handleUpdateText = (id, text) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }

      return todo;
    });

    setTodos(updatedList);
  };

  // We are using Date.now() as an id and
  // iterating all the list items below the input box.

  return (
    <div className="App">
      <input type="text" onKeyUp={handleKeyPress} ref={inputRef} />
      {todos.map((todo) => (
        <Item
          {...todo}
          key={todo.id}
          updateCompleted={handleCompleted}
          deleteTodo={handleDelete}
          updateText={handleUpdateText}
        />
      ))}
    </div>
  );
}

export default App;
