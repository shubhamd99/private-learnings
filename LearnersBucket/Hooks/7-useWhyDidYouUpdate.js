//  create a hook in React to detect what has caused the component to update that triggered re-rendering.

import React, { useEffect, useRef, useState } from "react";

// Performance optimization is the key to making any web app resilient especially this time around when the front end
// is becoming more and more complex.

// One you to achieve this in React is by avoiding unnecessary re-renders
// and to track this we need to monitor what has changed in the props or states within the component.

// With useWhyDidYouUpdate() hook we can determine what has changed that has triggered the re-rendering.
// Let us see how can we create this in React

// The idea is simple we will use extend the usePrevious() hook and
// compare the previous values with new values and see what has changed.

function useWhyDidYouUpdate(name, props) {
  // create a reference to track the previous data
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // merge the keys of previous and current data
      const keys = Object.keys({ ...previousProps.current, ...props });

      // to store what has change
      const changesObj = {};

      // check what values have changed between the previous and current
      keys.forEach((key) => {
        // if both are object
        if (
          typeof props[key] === "object" &&
          typeof previousProps.current[key] === "object"
        ) {
          if (
            JSON.stringify(previousProps.current[key]) !==
            JSON.stringify(props[key])
          ) {
            // add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        } else {
          // if both are non-object
          if (previousProps.current[key] !== props[key]) {
            // add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        }
      });

      // if changesObj not empty, print the cause
      if (Object.keys(changesObj).length) {
        console.log("This is causing re-renders", name, changesObj);
      }
    }

    // update the previous props with the current
    previousProps.current = props;
  });
}

const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [testCase, setTestCase] = useState(null);

  const counterStyle = {
    fontSize: "3rem",
    color: "red",
  };

  return (
    <div>
      <div className="counter">
        <Counter
          count={count}
          style={counterStyle}
          testCaseWithArray={testCase}
          function={() => console.log(count)}
        />
        <button
          onClick={() => {
            setCount(count + 1);
            setTestCase([count + 1]);
          }}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

// Output:
// This is causing re-renders Counter
// {count: {…}, testCaseWithArray: {…}, function: {…}}

// count:
// from: 0
// to: 1

// This is being printed because every time the component re-renders,
// a new function is created, even though the function looks identical.

// function:
// from: () => console.log(count) // 0
// to: () => console.log(count)  // 1

// testCaseWithArray:
// from: null
// to: [1]
