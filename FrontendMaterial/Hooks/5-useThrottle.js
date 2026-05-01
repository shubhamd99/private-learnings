// Throttling is a way/technique to restrict the number of function execution/call.

//Excessive function invocations in Javascript applications hamper the performance drastically.

// There are scenarios where we may invoke functions when it isn’t necessary.
// For example, consider a scenario where we want to make an API call to the
// server on a button click.If the user spam the click then this will make an API call on each click.
// This is not what we want, we want to restrict the no of API calls that can be made.
// The other call will be made only after a specified interval of time.

// When leading is enabled the first function will invoke right away and then after the specified delay

// while when trailing is enabled the first function will invoke after the delay and so on.

// We will be using useRef() to track the timerId of setTimeout so that we can reset it as an when required and previous arguments.

// Also, we will wrap the logic inside the useCallback() to avoid needless
// re-renderings as the callback function returns a memoized function that
// only change when one of the dependency changes.

import { useCallback, useRef } from "react";

const useThrottle = (fn, wait, option = { leading: true, trailing: true }) => {
  const timerId = useRef(); // track the timer
  const lastArgs = useRef(); // track the arguments

  // create a memoized debounce
  const throttle = useCallback(
    function (...args) {
      const { trailing, leading } = option;

      // function for delayed call
      const waitFunc = () => {
        // if trailing invoke the function and start the timer again
        // lastArgs.current is not null means there is a pending call
        if (trailing && lastArgs.current) {
          fn.apply(this, lastArgs.current);
          lastArgs.current = null;
          timerId.current = setTimeout(waitFunc, wait);
        } else {
          // else reset the timer
          timerId.current = null;
        }
      };

      // if leading run it right away
      if (!timerId.current && leading) {
        fn.apply(this, args);
        // else store the args
        // will be used in trailing call
      } else {
        lastArgs.current = args;
      }

      // run the delayed call
      if (!timerId.current) {
        timerId.current = setTimeout(waitFunc, wait);
      }
    },
    [fn, wait, option],
  );

  return throttle;
};

const Example = () => {
  const print = () => {
    console.log("hello");
  };

  const throttled = useThrottle(print, 2500, {
    leading: true,
    trailing: false,
  });

  return <button onClick={throttled}> click me</button>;
};

// Output:
// "hello" // immediately
// "hello" // after 2500 milliseconds of last call
// "hello" // after 2500 milliseconds of last call

const Example2 = () => {
  const print = () => {
    console.log("hello");
  };

  const throttled = useThrottle(print, 2500, {
    leading: false,
    trailing: true,
  });

  return <button onClick={throttled}> click me</button>;
};

// Output:
// "hello" // after 2500 milliseconds
// "hello" // after 2500 milliseconds of last call
// "hello" // after 2500 milliseconds of last call

const useThrottle2 = (fn, wait) => {
  const timerId = useRef(null);

  return useCallback(
    (...args) => {
      if (timerId.current) return; // already waiting, ignore

      fn(...args); // call immediately

      timerId.current = setTimeout(() => {
        timerId.current = null; // reset after wait
      }, wait);
    },
    [fn, wait],
  );
};

// const handleScroll = useThrottle(() => {
//   console.log("scroll fired");
// }, 500);

// // attach to scroll event
// <ScrollView onScroll={handleScroll} />
