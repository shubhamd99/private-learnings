// Create a cache fun that takes a function as parameter and cache the result,
// if parameter changes then only the parameter function is called otherwise
// cached result is returned.

function cache(fn) {
  const memo = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in memo) {
      console.log("Returning cached result for:", args);
      return memo[key];
    }

    console.log("Calculating result for:", args);
    memo[key] = fn(...args);
    return memo[key];
  };
}

// Example with a slow/expensive function
function slowAdd(a, b) {
  // Imagine heavy computation here
  return a + b;
}

const cachedAdd = cache(slowAdd);

console.log(cachedAdd(2, 3)); // Computing result → 5
console.log(cachedAdd(2, 3)); // Cached result   → 5  ✅
console.log(cachedAdd(4, 5)); // Computing result → 9  (new args)
console.log(cachedAdd(4, 5)); // Cached result   → 9  ✅

// ### How it works
// ```
// First call  → key not in memo → run fn() → store in memo → return result
// Same args   → key found in memo → return cached result (fn never called)
// New args    → key not in memo → run fn() → store in memo → return result
