// https://leetcode.com/problems/climbing-stairs/description/

// "1D DP" just stands for One-Dimensional Dynamic Programming.
// It simply means that to solve the problem, you only need to use a single,
// flat Array (one dimension) to store your answers.

// Memoization is great, but recursion is dangerous. If you have 10,000 stairs,
// the computer will call the function 10,000 times inside itself and crash with a "Stack Overflow".

// Tabulation fixes this by throwing away recursion entirely! Instead of starting at the Top,
// we start at the very Bottom (Step 1). We create an empty table (an array) and just use a simple
// for loop to fill out the table from left to right.

// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

/**
 * Approach:
 * We need to find the total number of distinct ways to climb `n` stairs, taking
 * either 1 or 2 steps at a time.
 *
 * Idea:
 * This problem maps exactly to the Fibonacci sequence. We solve this using
 * 1D Dynamic Programming. Specifically, we use the Bottom-Up Tabulation
 * technique heavily upgraded with Space Optimization.
 * Instead of using recursion (Top-Down Memoization) which is slow and risks
 * a Stack Overflow, we use a simple `for` loop to build our answer from the
 * bottom (Step 1) to the top (Step n). Furthermore, because we only ever need
 * to know the values of the two previous steps, we don't even need a full
 * 1D Array (Table). We can optimize our space to O(1) by using just two variables.
 *
 * Steps:
 * 1. Base Cases: If `n === 1`, there is 1 way. If `n === 2`, there are 2 ways.
 * 2. Initialize two variables to track the previous two steps:
 *    - `twoStepsBefore = 1` (Ways to reach step 1)
 *    - `oneStepBefore = 2`  (Ways to reach step 2)
 * 3. Loop from step 3 up to `n`:
 *    - Calculate the `currentStep` by adding the two previous steps.
 *    - Shift our variables forward: `twoStepsBefore` becomes `oneStepBefore`,
 *      and `oneStepBefore` becomes `currentStep`.
 * 4. After the loop finishes at `n`, `oneStepBefore` will hold our final answer!
 *
 * Time Complexity: O(N)
 * - We have a single loop that runs from 3 to N, doing O(1) math at each step.
 *
 * Space Complexity: O(1)
 * - Because of our Space Optimization, we only use a few variables
 *   (`oneStepBefore`, `twoStepsBefore`, `currentStep`) regardless of how massive
 *   N is. We completely avoided using an O(N) Array or Call Stack!
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  let twoStepsBefore = 1; // Ways to reach step 1
  let oneStepBefore = 2; // Ways to reach step 2

  // Start climbing from step 3 all the way up to step n
  for (let i = 3; i <= n; i++) {
    // The magic DP formula: Ways(n) = Ways(n-1) + Ways(n-2)
    const currentStep = oneStepBefore + twoStepsBefore;

    // Shift our variables forward for the next loop iteration
    twoStepsBefore = oneStepBefore;
    oneStepBefore = currentStep;
  }

  // By the time the loop reaches 'n', oneStepBefore holds the final answer
  return oneStepBefore;
};

// why <= n not < n?

// That is a fantastic question! It has everything to do with how the problem is counting.
// In 99% of LeetCode problems, you are looping over an Array. Arrays are 0-indexed, meaning an array of size 5 has slots 0, 1, 2, 3, 4. Because there is no slot 5, you MUST use < n.
// However, in this problem, we are not looping over an array! We are looping over literal, physical stairs.
// If the problem asks: "How many ways to reach step 5?"
// n = 5
// We literally need to calculate the math for Step 5!
// If we used i < n, the loop would stop at i = 4. It would calculate the answer for Step 4, and then completely skip Step 5.
// Because we need the math to run on the exact final number n, we must use <= n so the loop runs when i is exactly 5.
