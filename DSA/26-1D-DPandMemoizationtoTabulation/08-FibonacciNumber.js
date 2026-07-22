// https://leetcode.com/problems/fibonacci-number/description/

// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
// such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

/**
 * Approach:
 * We need to calculate the nth number in the Fibonacci sequence.
 *
 * Idea:
 * This is the most fundamental 1D Dynamic Programming (Bottom-Up Tabulation)
 * problem in existence. Because `F(n) = F(n-1) + F(n-2)`, we only ever need to
 * know the previous two numbers in the sequence. We can optimize our space
 * complexity to O(1) by using two variables instead of a full DP array. This
 * perfectly mirrors the Space Optimization technique we used in Climbing Stairs
 * and House Robber!
 *
 * Steps:
 * 1. Base Cases: If `n === 0`, return 0. If `n === 1`, return 1.
 * 2. Initialize two variables to track the previous two numbers:
 *    - `twoStepsBefore = 0` (represents F(0))
 *    - `oneStepBefore = 1`  (represents F(1))
 * 3. Loop from 2 up to `n`:
 *    - Calculate `current` by adding the two previous numbers.
 *    - Shift our variables forward: `twoStepsBefore` becomes `oneStepBefore`,
 *      and `oneStepBefore` becomes `current`.
 * 4. After the loop finishes at `n`, `oneStepBefore` holds the final Fibonacci number.
 *
 * Time Complexity: O(N)
 * - We have a single loop that runs from 2 to N, doing O(1) math at each step.
 *
 * Space Complexity: O(1)
 * - Because of our Space Optimization, we only use a few variables regardless
 *   of how massive N is. We completely avoided an O(N) Array or Call Stack!
 */

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  // F(0)
  let twoStepsBefore = 0;

  // F(1)
  let oneStepBefore = 1;

  // Start calculating from F(2) all the way up to F(n)
  for (let i = 2; i <= n; i++) {
    // The magic DP formula: F(n) = F(n-1) + F(n-2)
    const current = oneStepBefore + twoStepsBefore;

    // Shift our variables forward for the next loop iteration
    twoStepsBefore = oneStepBefore;
    oneStepBefore = current;
  }

  // By the time the loop reaches 'n', oneStepBefore holds the final answer
  return oneStepBefore;
};
