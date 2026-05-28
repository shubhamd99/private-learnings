// Currying is transforming a function that takes multiple arguments
// into a sequence of functions that each take one argument at a time.
// use cases: partial application (pre-fill some arguments for reuse), function composition,
// event handlers with config, API calls with base url, validation with reusable rules

// ⁠Currying Problem: Define sum function ending with (). Example -> sum(0)(1)(2)(3)(4)(5)()

function sum(a) {
  return function (b) {
    if (b === undefined) {
      return a; // () called → return final result
    }

    return sum(a + b); // accumulate and return new function
  };
}

// Example usage:
console.log(sum(0)(1)(2)(3)(4)(5)()); // Output: 15

// ### How it works

// sum(0)        → returns fn, a = 0
//   (1)         → b = 1, not undefined → return sum(0 + 1) = sum(1)
//   (2)         → b = 2, not undefined → return sum(1 + 2) = sum(3)
//   (3)         → b = 3, not undefined → return sum(3 + 3) = sum(6)
//   (4)         → b = 4, not undefined → return sum(6 + 4) = sum(10)
//   (5)         → b = 5, not undefined → return sum(10 + 5) = sum(15)
//   ()          → b = undefined → return 15

// with arrow
const sum2 = (a) => (b) => (b === undefined ? a : sum2(a + b));

sum2(1)(2)(3)(); // 6

// sum(a) - holds accumulated value in closure
// sum(a + b) - returns a new curried function with updated total
// () - b is undefined → terminates and returns final sum
