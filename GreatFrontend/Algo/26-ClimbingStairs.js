// Climbing Stairs
// You can climb 1 or 2 steps at a time.
// How many distinct ways can you reach the top of n stairs?
//
// Input:  n = 2
// Output: 2   → (1+1) or (2)
//
// Input:  n = 3
// Output: 3   → (1+1+1), (1+2), (2+1)
//
// Input:  n = 5
// Output: 8

// ---- SIMPLE VERSION (for interviews) ----
// Idea: this is Fibonacci in disguise.
// ways(n) = ways(n-1) + ways(n-2)
//   → from step n-1 you take 1 step, from step n-2 you take 2 steps.
// Use two variables instead of an array to keep it O(1) space.

function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways to reach step 1
  let prev1 = 2; // ways to reach step 2

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2; // ways(i) = ways(i-1) + ways(i-2)
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// Examples
console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8

// Trace for n=5:
// step 1: 1 way
// step 2: 2 ways
// step 3: 3 ways (1+2)
// step 4: 5 ways (3+2)
// step 5: 8 ways (5+3)

// Time: O(n)
// Space: O(1)
