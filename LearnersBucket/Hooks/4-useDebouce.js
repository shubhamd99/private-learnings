// Debouncing is a method or a way to execute a function when it is made sure
// that no further repeated event will be triggered in a given frame of time
// It is one of the prominent optimization technique to reduce the network or function calls.

// Let us see how to create a useDebounce() hook in React with the immediate flag as it will behave normally as well depending upon the flag.

// We will be using useRef() to track the timerId of setTimeout so that
// we can reset it if a subsequent full call is made within the defined time.

// Also, we will wrap the logic inside the useCallback() to avoid needless re-renderings as the callback function returns a memoized function
// that only change when one of the dependency changes.

import { useEffect, useCallback, useRef } from "react";

const useDebounce = (fn, delay, immediate = false) => {
  // ref the timer
  const timerId = useRef();

  // create a memoized debounce
  const debounce = useCallback(
    function () {
      // reference the context and args for the setTimeout function
      let context = this;
      let args = arguments; // arguments is an array-like object that contains the arguments passed to the function

      // should the function be called now? If immediate is true
      // and not already in a timeout then the answer is: Yes
      const callNow = immediate && !timerId.current;

      // base case
      // clear the timeout to assign the new timeout to it.
      // when event is fired repeatedly then this helps to reset
      clearTimeout(timerId.current);

      // set the new timeout
      timerId.current = setTimeout(function () {
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timerId.current = null;

        // check if the function already ran with the immediate flag
        if (!immediate) {
          // call the original function with apply
          fn.apply(context, args);
        }
      });

      // immediate mode and no wait timer? Execute the function immediately
      if (callNow) fn.apply(context, args);
    },
    [(fn, delay, immediate)],
  );

  return debounce;
};

const Example = () => {
  const print = () => {
    console.log("hello");
  };

  const debounced = useDebounce(print, 500);

  useEffect(() => {
    window.addEventListener("mousemove", debounced, false);

    return () => {
      window.removeEventListener("mousemove", debounced, false);
    };
  });

  return <></>;
};

// Output:
// "hello" // after 500 millisecond delay when user stops moving mouse

const Example2 = () => {
  const print = () => {
    console.log("hello");
  };

  // immediate
  const debounced = useDebounce(print, 500, true);

  useEffect(() => {
    window.addEventListener("mousemove", debounced, false);

    return () => {
      window.removeEventListener("mousemove", debounced, false);
    };
  });

  return <></>;
};

// Output:
// "hello" //immediately only once till the mouse moving is not stopped
// "hello" //immediately again once till the mouse moving is not stopped
