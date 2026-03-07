// Currying Problem: Create a sum function such a way that it can be called
// with any pattern like show below:
// curriedSum(1, 2, 3),
// curriedSum(1)(2,3),
// curriedSum(1)(2)(3)
// [All 3 cases output will be 6]

// Currying with Any Pattern

// fn.length = number of parameters a function expects
// function sum(a, b, c) {
//   return a + b + c;
// }
// sum.length  // 3  ← has 3 parameters -> fn.length

// With curry helper — generic way
function curry(fn) {
  return function curried(...args) {
    // Case 1 — enough args collected → fire the function
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // Case 2 — not enough args → return a new function and wait
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

// Original sum function
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

// All patterns
curriedSum(1, 2, 3); // 6
curriedSum(1)(2, 3); // 6
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6

// example:
// args = [1] → 1 < 3 → wait for more
// next call (2) → nextArgs = [2]
// curried(1, 2) → still 2 < 3 → wait again
// next call (3) → nextArgs = [3]
// curried(1, 2, 3) → 3 >= 3 → fire!
