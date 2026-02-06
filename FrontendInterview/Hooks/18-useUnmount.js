// React is a powerful JavaScript library that helps to create single  page applications. It comes with
// many lifecycle events to manage the  state of the components properly.

// Earlier with the Class component we had a separate lifecycle method
// componentWillUnmount that was invoked when the component was about to be removed from the DOM tree.

// But after React16 we got a useEffect() hook that handles the mount, update,
// and unmount through a single hook.

// useEffect(() => {
//   return () => {
//     console.log("I will be invoked on unmount");
//   };
// }, []);

// We have to return a function form the useEffect() that gets invoked
// when the component is about to unmount or any dependency changes.
// It is often referred as clean up function.

// While it is serves the purpose, many developers often get confused,
// especially when we have multiple useEffect() hooks in place on which will be used for unmounting.
// To solve this, we will create a custom hook useUnmount(() => {}) that will be take a callback function
// and invoke it only on the unmount working like componentWillUnmount method.

import { useEffect, useRef, useState } from "react";

export const useUnmount = (func) => {
  const funcRef = useRef(func);

  useEffect(() => {
    return () => {
      funcRef.current?.();
    };
  }, []);
};

const ComponentA = () => {
  useUnmount(() => {
    console.log("unmounting ComponentA");
  });

  return <h1>Component A</h1>;
};

const ComponentB = () => {
  useUnmount(() => {
    console.log("unmounting ComponentB");
  });

  return <h1>Component B</h1>;
};

export default function App() {
  const [count, setCount] = useState(0);
  useUnmount(() => {
    console.log("unmounting");
  });

  return (
    <div className="App">
      {count % 2 === 0 ? <ComponentA /> : <ComponentB />}
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}

// Note: In strict & dev mode useEffect() clean up method is fired on mount as well,
// thus you will see the log.
