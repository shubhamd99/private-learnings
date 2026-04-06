// Debouncing is a technique used to control how many times
// we allow a function to be executed over time

//  When a JavaScript function is debounced with a wait time of X milliseconds,
// it must wait until after X milliseconds have elapsed since the debounced
// function was last called.

/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  let timeoutId = null;

  return function (...args) {
    // Keep a reference to `this` so that
    // func.apply() can access it.
    const context = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null; // Not strictly necessary but good to do this.
      func.apply(context, args);
    }, wait);
  };
}

// ---- SIMPLE VERSION (for interviews) ----
// Idea: every time the function is called, reset the timer.
// Only fire when the timer finally runs out (user stopped calling it).

function debounceSimple(func, wait) {
  let timer;

  return function (...args) {
    // Cancel the previous timer (if user called again before wait ended)
    clearTimeout(timer);

    // Start a fresh timer — fire func only after `wait` ms of silence
    // Use apply to pass `this` context so it works correctly as a method
    const context = this;
    timer = setTimeout(() => {
      func.apply(context, args);
      // func(...args);
    }, wait);
  };
}
