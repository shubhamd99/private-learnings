// Throttling is a technique used to control how many times we allow a function
// to be executed over time.
// When a JavaScript function is said to be throttled with a wait time of X milliseconds,
// it can only be invoked at most once every X milliseconds.
// The callback is invoked immediately and cannot be invoked again for the rest of the wait duration.

// leading edge
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
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

// trailing edge
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
function throttle2(func, wait) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;
  let shouldThrottle = false;

  return function (...args) {
    lastArgs = args;
    lastThis = this;

    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;

    timeoutId = setTimeout(() => {
      shouldThrottle = false;
      timeoutId = null;
      func.apply(lastThis, lastArgs);

      // Clear references to prevent memory leaks
      lastThis = null;
      lastArgs = null;
    }, wait);
  };
}

// Example usage:
// const throttledFunc = throttle(myFunction, 1000);
// throttledFunc();

// ---- SIMPLE VERSION (for interviews) ----
// This is LEADING EDGE throttle — fires immediately on the first call,
// then ignores all calls for `wait` ms, then allows again.
//
// TRAILING EDGE would be the opposite — ignore the first call,
// fire once at the END of the wait window (like debounce but on an interval).
//
// Throttle vs Debounce:
//   Debounce  — wait for the user to STOP calling, then fire once
//   Throttle  — fire immediately, then IGNORE calls for a fixed period

function throttleSimple(func, wait) {
  let isThrottled = false;

  return function (...args) {
    // If we're in the cooldown window, ignore the call
    if (isThrottled) return;

    // Fire immediately — pass `this` context so it works as a method too
    func.apply(this, args);
    // func(...args);

    // Block any further calls for `wait` ms
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, wait);
  };
}
