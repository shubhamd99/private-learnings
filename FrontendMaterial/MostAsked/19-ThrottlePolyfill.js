// Throttle ensures a function is called at most once in a specified time interval

// Write Throttle function without the use of setTimeout() and clearTimeout()
// Use timestamp instead of setTimeout.

// User scrolling page
//   scroll event fires 100 times/second

// Without throttle → handler runs 100 times
// With throttle    → handler runs once every 300ms

function throttle(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    // enough time passed?
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args); // call the function
    }
  };
}

// Usage
function handleScroll() {
  console.log("Scroll handler called at", Date.now());
}

const throttledScroll = throttle(handleScroll, 300);

// fires 5 times rapidly
throttledScroll(); //  called  (lastCall = 0, now > 300)
throttledScroll(); //  ignored (not enough time passed)
throttledScroll(); //  ignored
throttledScroll(); //  ignored
// 300ms later
throttledScroll(); //  called  (300ms passed)

// ### Debounce vs Throttle — visual

// Calls:     ||||||||||||||||||||||||

// Debounce:  ____________________call  ← waits for pause

// Throttle:  call____call____call____  ← fires at intervals

function throttle2(func, wait) {
  let timeoutId = null;
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    clearTimeout(timeoutId);
    shouldThrottle = true;

    timeoutId = setTimeout(() => {
      shouldThrottle = false;
      timeoutId = null; // Not strictly necessary but good to do this.
    }, wait);

    func.apply(this, args);
  };
}
