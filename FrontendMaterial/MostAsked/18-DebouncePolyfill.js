// Debounce delays executing a function
// until after a specified time has passed since the last call

// User typing in search box
//   type 'a'     → wait 500ms...
//   type 'ab'    → reset timer, wait 500ms...
//   type 'abc'   → reset timer, wait 500ms...
//   stopped...   → 500ms passed → API call with 'abc'

// Without debounce → API call on every keystroke

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer); // reset timer on every call

    timer = setTimeout(() => {
      fn.apply(this, args); // call after delay
    }, delay);
  };
}

// Usage
function searchAPI(query) {
  console.log("API call with:", query);
}

const debouncedSearch = debounce(searchAPI, 500);

debouncedSearch("a"); // timer starts
debouncedSearch("ab"); // timer resets
debouncedSearch("abc"); // timer resets
// 500ms later → API call with: "abc"

// ### Debounce vs Throttle — visual

// Calls:     ||||||||||||||||||||||||

// Debounce:  ____________________call  ← waits for pause

// Throttle:  call____call____call____  ← fires at intervals
