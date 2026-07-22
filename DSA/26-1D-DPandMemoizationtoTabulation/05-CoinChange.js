// https://leetcode.com/problems/coin-change/description/

// You are given an integer array coins representing coins of different denominations and
// an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount.
// If that amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin.

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

// Input: coins = [2], amount = 3
// Output: -1

/**
 * Approach:
 * We need to find the absolute minimum number of coins required to sum up to
 * a specific target amount.
 *
 * Idea:
 * This is a classic 1D Dynamic Programming (Bottom-Up Tabulation) problem.
 * Because coin denominations can be arbitrarily large, we cannot optimize space
 * to O(1). We must maintain a full `dp` array where `dp[i]` stores the minimum
 * coins needed to make amount `i`. We initialize the array with `Infinity`.
 * For every amount from 1 to `target`, we test every available coin. If a coin
 * is smaller than or equal to the amount, we check if `1 + dp[amount - coin]`
 * yields a smaller number than what we currently have in `dp[amount]`.
 *
 * Steps:
 * 1. Initialize a `dp` array of size `amount + 1` filled with `Infinity`.
 * 2. Base Case: `dp[0] = 0` (It takes 0 coins to make a total of 0).
 * 3. Loop `a` (current amount) from 1 up to `amount`:
 *    - Loop through every `coin` in the `coins` array:
 *        - If the coin fits (`a - coin >= 0`):
 *            - DP Formula: `dp[a] = Math.min(dp[a], 1 + dp[a - coin])`
 * 4. After filling the table, check `dp[amount]`.
 *    - If it is still `Infinity`, it means the amount was impossible to make
 *      with the given coins. Return `-1`.
 *    - Otherwise, return `dp[amount]`.
 *
 * Time Complexity: O(A * C)
 * - Where A is the target `amount` and C is the number of `coins`. We have an
 *   outer loop running A times, and an inner loop running C times.
 *
 * Space Complexity: O(A)
 * - We create a `dp` array of size `amount + 1`.
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // Create our DP Table and fill it with Infinity
  // (Because we are searching for the Minimum!)
  const dp = new Array(amount + 1).fill(Infinity);

  // Base Case: 0 coins needed to make $0
  dp[0] = 0;

  // Build the table from $1 all the way up to the target amount
  for (let a = 1; a <= amount; a++) {
    // At the current amount, try every single coin in our pocket
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];

      // Does this coin even fit? (e.g. Can't use a $5 bill to make $2)
      if (a - coin >= 0) {
        // The Magic Formula:
        // Is it better to keep our current answer for dp[a],
        // OR use 1 of this coin + the best answer for the remaining amount?
        dp[a] = Math.min(dp[a], 1 + dp[a - coin]);
      }
    }
  }

  // Did we find a valid combination for the target amount?
  if (dp[amount] === Infinity) {
    return -1; // Impossible to make this amount
  } else {
    return dp[amount]; // We found the minimum coins!
  }
};

// --- EXAMPLE TRACE: Coin Change ---

// Input: coins = [1, 2, 5], amount = 11

// Initial Setup:
// dp = [0, Inf, Inf, Inf, Inf, Inf, Inf, Inf, Inf, Inf, Inf, Inf]
// (It takes 0 coins to make $0. The rest start as Infinity).

// ---------------------------------------------------------
// 1. Amount (a = 1)
// ---------------------------------------------------------
// - Try Coin 1: Fits! (1 - 1 = 0).
//   Is (1 coin + dp[0]) better than Infinity? (1 + 0 = 1). Yes! -> dp[1] = 1
// - Try Coin 2: Doesn't fit. (1 - 2 < 0)
// - Try Coin 5: Doesn't fit. (1 - 5 < 0)
// * RESULT: dp[1] = 1

// ---------------------------------------------------------
// 2. Amount (a = 2)
// ---------------------------------------------------------
// - Try Coin 1: Fits!
//   Is (1 coin + dp[1]) better than Infinity? (1 + 1 = 2). Yes! -> dp[2] = 2
// - Try Coin 2: Fits!
//   Is (1 coin + dp[0]) better than our current best of 2? (1 + 0 = 1). Yes! -> dp[2] = 1
// - Try Coin 5: Doesn't fit.
// * RESULT: dp[2] = 1  <-- Notice how it overwrote 2 pennies with a single $2 bill!

// ---------------------------------------------------------
// 3. Amount (a = 3)
// ---------------------------------------------------------
// - Try Coin 1: Fits! (1 + dp[2] -> 1 + 1 = 2). dp[3] = 2
// - Try Coin 2: Fits! (1 + dp[1] -> 1 + 1 = 2). dp[3] = 2
// * RESULT: dp[3] = 2

// ---------------------------------------------------------
// 4. Amount (a = 4)
// ---------------------------------------------------------
// - Try Coin 1: Fits! (1 + dp[3] -> 1 + 2 = 3). dp[4] = 3
// - Try Coin 2: Fits! (1 + dp[2] -> 1 + 1 = 2). dp[4] = 2
// * RESULT: dp[4] = 2  <-- Uses two $2 bills!

// ---------------------------------------------------------
// 5. Amount (a = 5)  <-- THE BIG JUMP
// ---------------------------------------------------------
// - Try Coin 1: Fits! (1 + dp[4] -> 1 + 2 = 3). dp[5] = 3
// - Try Coin 2: Fits! (1 + dp[3] -> 1 + 2 = 3). dp[5] = 3
// - Try Coin 5: Fits!
//   Is (1 coin + dp[0]) better than our current best of 3? (1 + 0 = 1). Yes!!!
// * RESULT: dp[5] = 1  <-- It instantly replaced 3 coins with a single $5 bill!

// ... (The computer speeds through $6 up to $10, building on these answers) ...
// * dp[6] = 2  (5 + 1)
// * dp[7] = 2  (5 + 2)
// * dp[8] = 3  (5 + 2 + 1)
// * dp[9] = 3  (5 + 2 + 2)
// * dp[10] = 2 (5 + 5)

// ---------------------------------------------------------
// Final Step: Amount (a = 11)
// ---------------------------------------------------------
// - Try Coin 1: Fits!
//   Is (1 coin + dp[10]) better than Infinity? (1 + 2 = 3). Yes! -> dp[11] = 3

// - Try Coin 2: Fits!
//   Is (1 coin + dp[9]) better than our current best of 3? (1 + 3 = 4). No! 3 is better.

// - Try Coin 5: Fits!
//   Is (1 coin + dp[6]) better than our current best of 3? (1 + 2 = 3). It's a tie! Keeps 3.

// * RESULT: dp[11] = 3
// ---------------------------------------------------------

// The loop finishes! We check dp[11] and return 3.
