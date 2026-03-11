// A memoize function is a higher-order function
// that takes in a function and returns a memoized version of it

// The memoized function caches the results of expensive function calls and
// returns the cached result when it receives the same inputs again

// This can significantly improve the performance of functions that involve complex
// processing / significant latency and are called with the same arguments repeatedly.

/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = func.call(this, arg);
    cache.set(arg, result);

    return result;
  };
}

// Support for multiple arguments
/**
 * @param {Function} func
 * @returns Function
 */
function memoize2(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.call(this, ...args);
    cache.set(key, result);

    return result;
  };
}

function expensiveFunction(n) {
  console.log("Computing...");
  return n * 2;
}

// Create a memoized version of the function.
const memoizedExpensiveFunction = memoize(expensiveFunction);

// First call (computes and caches the result).
console.log(memoizedExpensiveFunction(5)); // Output: Computing... 10

// Second call with the same argument (returns the cached result).
console.log(memoizedExpensiveFunction(5)); // Output: 10

// Third call with a different argument (computes and caches the new result).
console.log(memoizedExpensiveFunction(10)); // Output: Computing... 20

// Fourth call with the same argument as the third call (returns the cached result).
console.log(memoizedExpensiveFunction(10)); // Output: 20

// Edge cases
// In practice, functions can take in multiple arguments of varying types beyond strings and numbers,
// so the current memoize implementation wouldn't be sufficient for those cases.

// While this can be accessed without issues, the results are memoized solely on the input arguments,
// the same memoized result is returned for the same input arguments even if the this value is different between calls.
