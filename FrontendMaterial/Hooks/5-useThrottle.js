// Throttling is a way/technique to restrict the number of function execution/call.
// Excessive function invocations in Javascript applications hamper the performance drastically.

// There are scenarios where we may invoke functions when it isn’t necessary.
// For example, consider a scenario where we want to make an API call to the
// server on a button click. If the user spam the click then this will make an API call on each click.
// This is not what we want, we want to restrict the no of API calls that can be made.
// The other call will be made only after a specified interval of time.

// When leading is enabled the first function will invoke right away and then after the specified delay

// while when trailing is enabled the first function will invoke after the delay and so on.

import { useRef, useCallback } from "react";

// By wrapping the returned logic in useCallback(),
// we guarantee that React returns the exact same function reference across re-renders,
// keeping the rest of the application optimized and stable!

function useThrottle(callback, delay) {
  // Use a ref to track whether we are currently on "cooldown"
  const isWaiting = useRef(false);

  return useCallback(
    (...args) => {
      // 1. If we are on cooldown, ignore the click entirely
      if (isWaiting.current) return;

      // 2. We are not on cooldown! Execute the function immediately
      callback(...args);

      // 3. Put the function on cooldown
      isWaiting.current = true;

      // 4. Remove the cooldown after the delay has passed
      setTimeout(() => {
        isWaiting.current = false;
      }, delay);
    },
    [callback, delay],
  );
}

function Checkout() {
  const buyItem = () => {
    console.log("API Call: Purchasing item...");
  };

  // The button can only trigger the API once every 3 seconds
  const throttledBuy = useThrottle(buyItem, 3000);

  return <button onClick={throttledBuy}>Buy Now</button>;
}
