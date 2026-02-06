// This question was asked in Tekion's Staff frontend interview.
// Question: Create a hook in React that remembers the previous value of the state.

// usePrevious hook will take the current value as input and hold it and
// will return it whenever it will get a new value.
// For the initial render, it will return undefined as there will not be any previous value for it

// To create the usePrevious hook we will need to use the useRef and useEffect hook together.

// useRef()
// Between renderings, you can maintain values using the useRef() Hook which means the value won’t change or be lost when the React components re-render.
// This will help us to persist the previous value.

// useEffect()
// With the useEffect() hook, we can manage the side effects
// in the components during the lifecycle events.

import { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  // create a new reference
  const ref = useRef();

  // store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // only re-run if value changes

  // return previous value (happens before update in useEffect above)
  return ref.current;
}

const Example = () => {
  const [count, setCount] = useState(0);

  // get the previous value passed into the hook on the last render
  const prevCount = usePrevious(count);

  // show both current and previous value
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Example;

// The Lifecycle of usePrevious
// To understand this, you have to look at the sequence of events during a single re-render:

// Render Phase: React executes your functional component. It calls usePrevious(value).

// The Return: The hook returns ref.current. Since useEffect hasn't run yet for this render,
// ref.current still holds the value from the previous render.

// Browser Paint: React updates the DOM.

// Commit Phase (useEffect): After the browser paints,
// the useEffect inside your hook finally runs and updates ref.current to the new value.
