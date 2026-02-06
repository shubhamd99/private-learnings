//  create useResponsive() hook in React that will return the device type
// (isMobile, isTablet, isDesktop) depending upon the window width.

import { useState, useEffect, useCallback, useRef } from "react";

// utility hook
const useDebounce = (fn, delay, immediate = false) => {
  const timerId = useRef();
  const debounce = useCallback(
    function () {
      let context = this;
      let args = arguments;
      const callNow = immediate && !timerId.current;
      clearTimeout(timerId.current);
      timerId.current = setTimeout(function () {
        timerId.current = null;
        if (!immediate) {
          fn.apply(context, args);
        }
      });
      if (callNow) fn.apply(context, args);
    },
    [(fn, delay, immediate)],
  );

  return debounce;
};

// Many times we require to conditionally render components depending upon the device
// rather than hiding and showing through CSS we can use this hook.

// For this, we will assign an event listener to the window object and
// listen to the resize event on the function onResizeHandler() that will
// update the state when ever user resizes the screen

const useResponsive = () => {
  // screen resolutions
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // update the state on the initial load
    onResizeHandler();

    // assign the event
    Setup();

    return () => {
      // remove the event
      Cleanup();
    };
  }, []);

  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
    const isDesktop = window.innerWidth > 990;

    setState({ isMobile, isTablet, isDesktop });
  };

  // debounce the resize call
  const debouncedCall = useDebounce(onResizeHandler, 500);

  // add event listener
  const Setup = () => {
    window.addEventListener("resize", debouncedCall, false);
  };

  // remove the listener
  const Cleanup = () => {
    window.removeEventListener("resize", debouncedCall, false);
  };

  return state;
};

// The function onResizeHandler() is debounced using useDebounce() hook
// as we won't to avoid the continuous state updates as user keeps resizing,
// rather update once when the user is done resizing.Resize the screen to see the outputs.

const Example = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  console.log(isMobile, isTablet, isDesktop);

  return <></>;
};

export default Example;

// Output:
// false, false, true
