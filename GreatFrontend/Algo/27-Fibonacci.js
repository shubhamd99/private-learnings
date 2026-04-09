// Fibonacci
// Return the nth Fibonacci number.
// F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
//
// Input:  n = 6
// Output: 8   → sequence: 0, 1, 1, 2, 3, 5, 8
//
// Input:  n = 10
// Output: 55

// ---- VARIATION 1: Naive Recursion (bad — exponential) ----
// Recomputes same subproblems repeatedly. O(2^n) time.
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// ---- VARIATION 2: Memoized Recursion (top-down DP) ----
// Idea: cache results of subproblems so each is computed only once.
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n); // cache hit

  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result); // cache before returning
  return result;
}

// ---- VARIATION 3: Iterative (bottom-up DP) — preferred ----
// Idea: build up from base cases using just two variables. No stack, no map.
function fib(n) {
  if (n <= 1) return n;

  let prev2 = 0; // F(0)
  let prev1 = 1; // F(1)

  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// Examples
console.log(fib(6)); // 8
console.log(fib(10)); // 55
console.log(fibMemo(10)); // 55

// Time: O(2^n) naive, O(n) memoized/iterative
// Space: O(n) memoized (call stack + map), O(1) iterative
