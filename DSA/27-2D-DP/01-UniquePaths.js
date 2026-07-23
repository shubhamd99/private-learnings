// https://leetcode.com/problems/unique-paths/description/

// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]).
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either
// down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that
// the robot can take to reach the bottom-right corner.
// The test cases are generated so that the answer will be less than or equal to 2 * 109.

// Input: m = 3, n = 7
// Output: 28

/**
 * Approach:
 * We need to find the total number of unique paths a robot can take from the
 * top-left to the bottom-right of an m x n grid, moving only Right or Down.
 *
 * Idea:
 * This is the quintessential 2D Dynamic Programming (Bottom-Up Tabulation) problem.
 * We build a 2D `dp` matrix where `dp[r][c]` stores the total number of unique
 * paths to reach row `r` and column `c`. Because the robot only moves Right or
 * Down, the number of ways to reach the current cell is simply the sum of the
 * ways to reach the cell directly ABOVE it and the cell directly LEFT of it.
 * The top row and left column act as our base cases: they can only be reached
 * in exactly 1 way (moving straight Right or straight Down).
 *
 * Steps:
 * 1. Initialize a 2D `dp` array of size `m` by `n`. Fill the entire grid with
 *    `1`s. This efficiently pre-fills our base cases for the top row (r=0)
 *    and left column (c=0).
 * 2. Loop `r` (rows) starting from 1 up to `m`:
 *    - Loop `c` (columns) starting from 1 up to `n`:
 *        - DP Formula: `dp[r][c] = dp[r - 1][c] + dp[r][c - 1]`
 *          (Current = Cell Above + Cell Left)
 * 3. Return the value in the bottom-right corner: `dp[m - 1][n - 1]`.
 *
 * Time Complexity: O(M * N)
 * - We iterate through almost every cell in the M x N grid exactly once,
 *   performing an O(1) addition at each step.
 *
 * Space Complexity: O(M * N)
 * - We create a 2D matrix of size M x N to store our tabulation data.
 *   (Note: This can actually be optimized to O(N) by only storing the previous
 *   row, but the 2D approach is the standard, most readable way to learn it!)
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 1. Create a 2D DP Table filled with 1s
  // Array(m) creates the rows. .map() fills each row with an array of size n.
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(1));

  // 2. Loop through the grid
  // Notice we start at r = 1 and c = 1!
  // We skip the 0th row and 0th column because they are our Base Cases (always 1).
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      // The Magic 2D Formula:
      // To get here, I must have come from Above OR from the Left!
      const waysFromAbove = dp[r - 1][c];
      const waysFromLeft = dp[r][c - 1];

      dp[r][c] = waysFromAbove + waysFromLeft;
    }
  }

  // 3. The bottom-right corner holds the final answer
  return dp[m - 1][n - 1];
};
