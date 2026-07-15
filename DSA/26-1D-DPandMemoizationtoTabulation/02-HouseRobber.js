// https://leetcode.com/problems/house-robber/description/

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed,
// the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected
// and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money
// you can rob tonight without alerting the police.

// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

/**
 * Approach: We need to find the maximum amount of money we can rob from an array of houses without robbing two adjacent houses.
 *
 * Idea:
 * This problem maps perfectly to 1D Dynamic Programming (Bottom-Up Tabulation)
 * with Space Optimization. The maximum money we can have at any house `i` is
 * the maximum of either: skipping house `i` (keeping the max from `i-1`), OR
 * robbing house `i` (adding its money to the max from `i-2`). Because we only
 * ever need to reference the last two houses, we can optimize our space to O(1)
 * by using just two variables (`rob1` and `rob2`) instead of a full DP array.
 *
 * Steps:
 * 1. Initialize two variables to track the max money from the previous two steps:
 *    - `rob1 = 0` (Max money from 2 houses ago)
 *    - `rob2 = 0` (Max money from 1 house ago)
 * 2. Loop through every `house` in the `nums` array:
 *    - Calculate the new max money if we evaluate this house:
 *      `const temp = Math.max(rob2, house + rob1)`
 *    - Shift our variables forward down the street:
 *      `rob1` becomes `rob2`, and `rob2` becomes `temp`.
 * 3. After the loop finishes evaluating the entire street, `rob2` will hold
 *    the absolute maximum money possible. Return `rob2`.
 *
 * Time Complexity: O(N)
 * - We loop through the array of houses exactly once, doing O(1) math at each step.
 *
 * Space Complexity: O(1)
 * - Because of our Space Optimization, we only use a few variables (`rob1`,
 *   `rob2`, `temp`) regardless of how many houses there are. We completely
 *   avoided an O(N) DP Array!
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // rob1 tracks the max money from 2 houses ago
  // rob2 tracks the max money from 1 house ago
  let rob1 = 0;
  let rob2 = 0;

  // Walk down the street, looking at each house
  for (let i = 0; i < nums.length; i++) {
    const currentHouseMoney = nums[i];

    const currentMax = Math.max(
      rob2, // Choice 1: Skip it
      currentHouseMoney + rob1, // Choice 2: Rob it (Current Cash + Stash from 2 houses ago)
    );

    // Shift our variables forward for the next house!
    rob1 = rob2;
    rob2 = currentMax;
  }

  // By the time we reach the end of the street, rob2 holds our final answer
  return rob2;
};
