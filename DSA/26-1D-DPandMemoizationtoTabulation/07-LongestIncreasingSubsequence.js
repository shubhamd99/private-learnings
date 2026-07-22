// https://leetcode.com/problems/longest-increasing-subsequence/description/

// Given an integer array nums, return the length of the longest strictly increasing subsequence.

// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

// Input: nums = [0,1,0,3,2,3] -> 0,1,2,3 = 4
// Output: 4

// Input: nums = [7,7,7,7,7,7,7] -> 7
// Output: 1

/**
 * Approach:
 * We need to find the length of the longest strictly increasing subsequence
 * in an integer array.
 *
 * Idea:
 * This is a classic 1D Dynamic Programming (Bottom-Up Tabulation) problem.
 * Because an increasing sequence can jump over elements, we must use a full
 * DP array where `dp[i]` represents the length of the longest subsequence that
 * STRICTLY ENDS at index `i`. We initialize the array with 1s (because every
 * element is a valid sequence of length 1). For every element `i`, we look back
 * at every previous element `j`. If `nums[i] > nums[j]`, we can extend the
 * sequence from `j`. We update `dp[i]` to be the maximum of its current value
 * or `dp[j] + 1`. We track the global maximum length found anywhere in the array.
 *
 * Steps:
 * 1. Initialize a `dp` array of size `nums.length`, filled with `1`.
 * 2. Initialize `maxLIS = 1` to track the absolute longest sequence we find.
 * 3. Outer Loop `i` from 1 to `nums.length`: (Our current number)
 *    - Inner Loop `j` from 0 to `i`: (Looking at all previous numbers)
 *        - If `nums[i] > nums[j]`: (We found a valid strictly increasing step!)
 *            - DP Formula: `dp[i] = Math.max(dp[i], dp[j] + 1)`
 *    - Update global tracker: `maxLIS = Math.max(maxLIS, dp[i])`
 * 4. Return `maxLIS`.
 *
 * Time Complexity: O(N^2)
 * - Where N is the length of the array. We have nested loops checking every
 *   pair of (i, j) combinations.
 *
 * Space Complexity: O(N)
 * - We create a `dp` array of size N to store the longest sequence ending at
 *   each index.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length === 0) return 0;

  // Create our DP Table and fill it with 1s
  // (Every number by itself is a valid sequence of length 1)
  const dp = new Array(nums.length).fill(1);

  // Track the absolute longest sequence found ANYWHERE in the array
  let maxLIS = 1;

  // i is our "current" box that we are trying to add to a chain
  for (let i = 1; i < nums.length; i++) {
    // j looks backward at EVERY single box that came before i
    for (let j = 0; j < i; j++) {
      // Does the current box strictly increase from the past box?
      if (nums[i] > nums[j]) {
        // The Magic Formula:
        // Keep the current chain length, OR take the chain length
        // from box 'j' and add 1 (for our current box 'i')!
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    // The longest sequence might not end at the very last index of the array!
    // We must track the absolute highest number we ever generate.
    maxLIS = Math.max(maxLIS, dp[i]);
  }

  return maxLIS;
};
