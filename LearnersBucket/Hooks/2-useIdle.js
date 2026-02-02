//  create a hook in React that detects if user is IDLE for a given amount of time

//  It is useful to halt operation if user is IDLE or log them out in case of sensitive
// applications like banking or financial apps.

// A user is considered to be inactive or idle if he is not performing any sort of action
// using interaction hardware like a mouse, or keyboard for desktops and
// laptops and touch on mobile and tablets

// For this, there are a set of events that we can listen to like
// mousemove, mousedown, keypress, DOMMouseScroll, mousewheel, touchmove, MSPointerMove.

// Also, we need to handle edge cases where the window or tab is out of focus,
// for which we will listen to the focus and blur events.

import { useState, useEffect, useRef, useCallback } from "react";

const useIdle = (delay) => {
  const [isIdle, setIsIdle] = useState(false);

  // create a new reference to track timer
  const timeoutId = useRef();

  // assign and remove the listeners
  // When useEffect runs without dependencies, it ensures that the event listeners are always using
  // the most recent version of your resetTimer and startTimer functions
  // In most React scenarios, this is considered a performance "anti-pattern"
  // But here it is fine because we are not creating new functions on every render
  // and also we are cleaning up the listeners on every render
  useEffect(() => {
    setup();

    return () => {
      cleanUp();
    };
  });

  const startTimer = () => {
    // wait till delay time before calling goInactive
    timeoutId.current = setTimeout(goInactive, delay);
  };

  const resetTimer = () => {
    // reset the timer and make user active
    clearTimeout(timeoutId.current);
    goActive();
  };

  const goInactive = () => {
    setIsIdle(true);
  };

  const goActive = () => {
    setIsIdle(false);

    // start the timer to track Inactiveness
    startTimer();
  };

  const setup = () => {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("DOMMouseScroll", resetTimer, false);
    document.addEventListener("mousewheel", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("MSPointerMove", resetTimer, false);

    // edge case
    // if tab is changed or is out of focus
    // The focus event fires the moment the window gains focus
    window.addEventListener("focus", resetTimer, false);
    // The blur event fires the moment the window loses focus
    window.addEventListener("blur", startTimer, false);
  };

  const cleanUp = () => {
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("mousedown", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("DOMMouseScroll", resetTimer);
    document.removeEventListener("mousewheel", resetTimer);
    document.removeEventListener("touchmove", resetTimer);
    document.removeEventListener("MSPointerMove", resetTimer);

    // edge case
    // if tab is changed or is out of focus
    // The focus event fires the moment the window gains focus
    window.addEventListener("focus", resetTimer, false);
    // The blur event fires the moment the window loses focus
    window.addEventListener("blur", startTimer, false);
    // memory leak
    clearTimeout(timeoutId.current);
  };

  // return previous value (happens before update in useEffect above)
  return isIdle;
};

const Example = () => {
  const isIdle = useIdle(2000);

  return (
    <div>
      <h1>IsIdle: {isIdle ? "true" : "false"}</h1>
    </div>
  );
};

export default Example;

// Optimised version with useEffect dependencies

const useIdleOptimised = (delay) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef();

  // 1. Memoize goInactive so it doesn't change on every render
  const goInactive = useCallback(() => {
    setIsIdle(true);
  }, []);

  // 2. Logic to reset the timer
  // We use the functional update 'setIsIdle(prev => ...)' to avoid
  // unnecessary re-renders if the user is already active.
  const handleEvent = useCallback(() => {
    setIsIdle((prev) => {
      if (prev) return false; // If was idle, make active
      return prev; // If already active, do nothing to state
    });

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(goInactive, delay);
  }, [delay, goInactive]);

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "DOMMouseScroll",
      "mousewheel",
      "touchmove",
      "MSPointerMove",
    ];

    // Initial timer start
    timeoutId.current = setTimeout(goInactive, delay);

    // Setup: Attach all listeners once
    events.forEach((event) =>
      window.addEventListener(event, handleEvent, { passive: true }),
    );

    window.addEventListener("focus", handleEvent);
    window.addEventListener("blur", goInactive); // Immediately idle on tab switch

    // Clean up: Remove listeners only when component unmounts
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      events.forEach((event) => window.removeEventListener(event, handleEvent));

      window.removeEventListener("focus", handleEvent);
      window.removeEventListener("blur", goInactive);
    };
  }, [delay, handleEvent, goInactive]);

  return isIdle;
};

const ExampleOptimised = () => {
  const isIdle = useIdleOptimised(2000);

  return (
    <div>
      <h1>IsIdle: {isIdle ? "true" : "false"}</h1>
    </div>
  );
};
