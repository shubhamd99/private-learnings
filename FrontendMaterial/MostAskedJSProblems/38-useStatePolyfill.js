// Build useState from scratch

// Although this polyfill lacks some of the advanced features of the real useState,
// such as support for multiple components and effects

// Article #1 - https://medium.com/@contactvyash5075/creating-a-custom-usestate-polyfill-in-react-77c5ff4e028d
// Article #2 - https://rahuulmiishra.medium.com/creating-a-polyfill-for-usestate-in-reactjs-a-step-by-step-guide-20dcee6cef74

// Does React do the same?
// Yes! However, React doesn't use a simple array with a number index.
// React uses a Linked List attached to something called a "Fiber Node."

// But the concept is identical:

// When React begins rendering a component, it takes an internal pointer and
// resets it to point to the very first hook in the list (the equivalent of index = 0).

// Every time you call a hook, React reads the data, and then moves the pointer to the next hook in the list
// (the equivalent of index++).

// --------------- With useReducer ----------------------
import { useReducer } from "react";

// We are maintaining hookIdTracker (which we called index in our earlier code) because it is the only way
// React knows which state belongs to which variable when you use multiple hooks in the same component.
// const [age, setAge] = useMyState(25);
// const [name, setName] = useMyState("Alice");
let hookIdTracker = 0;
let states = [];

export function useMyState(initialValue) {
  const localHookId = hookIdTracker;

  if (states[localHookId] === undefined) {
    states[localHookId] = initialValue;
  }

  const currentState = states[localHookId];

  // simply a lightweight, dummy trigger. By calling rerender(), you trick React into doing a full re-render of
  // the component without actually having to manage any real state variables.
  const [, rerender] = useReducer(() => ({}), {});

  const forceUpdate = () => {
    hookIdTracker = 0;
    rerender({});
  };

  function setValue(newValue) {
    const isValueChanged = !Object.is(newValue, states[localHookId]);
    if (isValueChanged) {
      states[localHookId] = newValue;
      forceUpdate();
    }
  }

  hookIdTracker++;

  return [currentState, setValue];
}

// --------------- With Vanilla JS ----------------------

let hooks = [];
let index = 0;

function useState(initialValue) {
  const localIndex = index;

  if (hooks[localIndex] === undefined) {
    hooks[localIndex] = initialValue;
  }

  const setState = (newValue) => {
    // Only re-render if the value actually changed!
    const isValueChanged = !Object.is(hooks[localIndex], newValue);

    if (isValueChanged) {
      hooks[localIndex] = newValue;
      render(); // Trigger re-render
    }
  };

  index++;
  return [hooks[localIndex], setState];
}

// Simulates React's internal scheduler
function render() {
  index = 0;
  App();
}
