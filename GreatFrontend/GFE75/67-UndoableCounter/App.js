// Build a counter with a history of the changes and ability to undo/redo actions.

// Requirements
// The counter starts at 0.
// There buttons "/2", "-1", "+1", "x2" apply the respective operations to the current count.
// A row is added to the history table, showing the operation, count before the operation, count after
// The "Undo" button undoes the last action and updates the count.
// The "Redo" button applies the last undo-ed action, if any.
// Clicking on the modification buttons should clear any undo-ed actions and they cannot be redo-ed.
// The "Reset" button resets the counter to 0 and clears all history

import { useState } from "react";

/**
 * 🛠️ OPERATIONS CONFIG
 * Definies the mathematical operations supported by the counter.
 * Using a configuration object makes it easy to extend or modify operations later.
 */
const OPERATIONS = {
  "/2": { type: "divide", number: 2 },
  "-1": { type: "decrement", number: 1 },
  "+1": { type: "increment", number: 1 },
  x2: { type: "multiply", number: 2 },
};

/**
 * ⚡ HELPER: performOperation
 * Takes the current counter value and the operation label,
 * then calculates the result based on the OPERATIONS config.
 */
function performOperation(counter, operationLabel) {
  const operation = OPERATIONS[operationLabel];
  switch (operation.type) {
    case "increment":
      return counter + operation.number;
    case "decrement":
      return counter - operation.number;
    case "multiply":
      return counter * operation.number;
    case "divide":
      return counter / operation.number;
    default:
      return counter;
  }
}

/**
 * 📋 COMPONENT: UndoableCounterHistory
 * Renders the history of operations in a table format.
 * If there's no history, it returns null to keep the UI clean.
 */
function UndoableCounterHistory({ history }) {
  if (history.length === 0) {
    return null;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={index}>
            <td>{item.operation}</td>
            <td>{item.oldCounter}</td>
            <td>{item.newCounter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * 🏗️ MAIN COMPONENT: UndoableCounter
 * Manages the state for the counter and the undo/redo mechanism.
 */
export default function UndoableCounter() {
  // 1. Current value of the counter
  const [counter, setCounter] = useState(0);
  // 2. Stack of past actions (for Undo)
  const [history, setHistory] = useState([]);
  // 3. Stack of undone actions (for Redo)
  const [undoHistory, setUndoHistory] = useState([]);

  /**
   * 🔄 RESET: Wipes out the counter and all stacks.
   */
  function onReset() {
    setCounter(0);
    setHistory([]);
    setUndoHistory([]);
  }

  /**
   * ⏪ UNDO: Reverts to the previous state.
   * Logic: Pop the latest item from 'history', move it to 'undoHistory',
   * and update the counter to the 'oldCounter' of that item.
   */
  function onUndo() {
    if (history.length === 0) return; // Guard clause
    const [latest, ...earlierHistory] = history;
    setCounter(latest.oldCounter);
    setUndoHistory([latest, ...undoHistory]);
    setHistory(earlierHistory);
  }

  /**
   * ⏩ REDO: Re-applies an undone state.
   * Logic: Pop the latest item from 'undoHistory', move it back to 'history',
   * and update the counter to the 'newCounter' of that item.
   */
  function onRedo() {
    if (undoHistory.length === 0) return; // Guard clause
    const [latest, ...earlierUndoHistory] = undoHistory;
    setCounter(latest.newCounter);
    setUndoHistory(earlierUndoHistory);
    setHistory([latest, ...history]);
  }

  /**
   * ✨ ACTION: Handles clicks on +1, -1, x2, /2.
   * CRITICAL: When a NEW operation is performed, the 'undoHistory' must be cleared.
   */
  function onClickOperation(operation) {
    const oldCounter = counter;
    const newCounter = performOperation(counter, operation);

    // Update counter
    setCounter(newCounter);

    // Add to top of history stack
    setHistory([{ operation, oldCounter, newCounter }, ...history]);

    // Clear redo stack on any new modification
    setUndoHistory([]);
  }

  return (
    <div className="container">
      {/* 🚀 Actions: Undo, Redo, Reset */}
      <div className="row">
        <button disabled={history.length === 0} onClick={onUndo}>
          Undo ⏪
        </button>
        <button disabled={undoHistory.length === 0} onClick={onRedo}>
          Redo ⏩
        </button>
        <button className="reset-btn" onClick={onReset}>
          Reset 🔄
        </button>
      </div>

      <hr />

      {/* 🔢 Display & Main Operations */}
      <div className="row">
        <button className="op-btn" onClick={() => onClickOperation("/2")}>
          /2
        </button>
        <button className="op-btn" onClick={() => onClickOperation("-1")}>
          -1
        </button>
        <div className="counter-display">{counter}</div>
        <button className="op-btn" onClick={() => onClickOperation("+1")}>
          +1
        </button>
        <button className="op-btn" onClick={() => onClickOperation("x2")}>
          x2
        </button>
      </div>

      <hr />

      {/* 📜 Operation History Table */}
      <div className="row">
        <UndoableCounterHistory history={history} />
      </div>
    </div>
  );
}
