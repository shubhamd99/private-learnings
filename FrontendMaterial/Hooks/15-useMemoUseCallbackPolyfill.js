// This question was asked in the Thoughtspot’s frontend interview where they had asked to write
// the polyfill for the useMemo() and useCallback() hooks.

// In order to write polyfill for any existing methods, we will need to understand the function first.

// useMemo() and useCallback() are memoization hooks that are used to cache values.
// useMemo() caches the value which is returned from the callback function unless the dependency is changed.

// For example, in the above code when the anotherValue is changed we will get the anotherValue + count
// but when the count is changed we will get the last cached value only.

// To create the polyfill for the useMemo(), we will have to store the  previous dependencies and then check with the new dependencies
// if there  is change in the dependencies array, then recompute the value by
// invoking the callback function and cache the new value before returning  it.

import { useRef, useEffect, useState } from "react";

// helper function to deep check dependency
const detectChanges = (prevDeps, deps) => {
  if (prevDeps === null) return false;
  if (prevDeps?.length !== deps.length) return false;

  for (let i = 0; i < deps.length; i++) {
    if (prevDeps[i] !== deps[i]) return false;
  }

  return true;
};

export const useMemoPolyfill = (callback, deps) => {
  // store the cached value
  // using ref instead of state will prevent from unnecessary re-renders
  const memoizedRef = useRef(null);

  // check if the dependency is changed or not
  if (
    !memoizedRef.current ||
    !detectChanges(memoizedRef?.current?.deps, deps)
  ) {
    memoizedRef.current = {
      value: callback(), // store the computed value returned from the callback
      deps: deps,
    };
  }

  // reset the value
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the cached value
  return memoizedRef.current.value;
};

function App() {
  const [count, setCount] = useState(0);
  const [anotherValue, setAnotherValue] = useState(1);

  const memoizedValue = useMemoPolyfill(() => {
    return anotherValue + count;
  }, [anotherValue]);

  return (
    <div className="App">
      <p>Count: {count}</p>
      <p>Memoized: {memoizedValue}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increase count
      </button>
      <button onClick={() => setAnotherValue((prevVal) => prevVal + 1)}>
        Increase Another count
      </button>
    </div>
  );
}

// If you click on the Increase count button, you will see no change in the memoized value,
// whereas if you click on the Increase Another count button you will see the new computed
// value with anotherValue + count.

// useCallback

export const useCallbackPolyfill = (callback, deps) => {
  // store the cached value
  // using ref instead of state will prevent from unnecessary re-renders
  const memoizedRef = useRef(null);

  // check if the dependency is changed or not
  if (
    !memoizedRef.current ||
    !detectChanges(memoizedRef?.current?.deps, deps)
  ) {
    memoizedRef.current = {
      value: callback, // store the callback function
      deps: deps,
    };
  }

  // reset the value
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the cached value
  return memoizedRef.current.value;
};

function App2() {
  const [count, setCount] = useState(0);
  const [anotherValue, setAnotherValue] = useState(1);

  const memoizedFn = useCallbackPolyfill(() => {
    return anotherValue + count;
  }, [anotherValue]);

  return (
    <div className="App">
      <p>Count: {count}</p>
      <p>Memoized: {memoizedFn()}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increase count
      </button>
      <button onClick={() => setAnotherValue((prevVal) => prevVal + 1)}>
        Increase Another count
      </button>
    </div>
  );
}

// Here we invoked the cached function and get the computed value.
