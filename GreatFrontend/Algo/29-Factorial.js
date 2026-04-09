// Factorial
// Return n! (n factorial) = n * (n-1) * ... * 1
// By convention, 0! = 1
//
// Input:  5
// Output: 120   → 5 * 4 * 3 * 2 * 1
//
// Input:  0
// Output: 1

// ---- VARIATION 1: Iterative ----
// Idea: multiply from 1 up to n.
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// ---- VARIATION 2: Recursive ----
// Idea: n! = n * (n-1)!  Base case: 0! = 1
function factorialRecursive(n) {
  if (n <= 1) return 1; // base case: 0! = 1! = 1
  return n * factorialRecursive(n - 1);
}

// ---- VARIATION 3: Memoized (if called repeatedly with same n) ----
const cache = new Map();
function factorialMemo(n) {
  if (n <= 1) return 1;
  if (cache.has(n)) return cache.get(n);
  const result = n * factorialMemo(n - 1);
  cache.set(n, result);
  return result;
}

// Examples
console.log(factorial(5)); // 120
console.log(factorialRecursive(5)); // 120
console.log(factorial(0)); // 1

// Time: O(n) all variations
// Space: O(1) iterative, O(n) recursive (call stack), O(n) memoized
