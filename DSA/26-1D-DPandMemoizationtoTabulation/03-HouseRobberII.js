// https://leetcode.com/problems/house-robber-ii/description/

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.
// All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one.
// Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police
// if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you
// can rob tonight without alerting the police.

// Input: nums = [2,3,2]
// Output: 3
// Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

/**
 * Approach:
 * We need to find the max money we can rob from houses arranged in a circle,
 * meaning the first and last houses are adjacent.
 *
 * Idea:
 * Since we cannot rob both the first and last house, the optimal solution must
 * lie in one of two linear subarrays: either robbing from house 0 to n-2 (ignoring
 * the last house), or robbing from house 1 to n-1 (ignoring the first house).
 * We can reuse our exact O(1) space 1D Dynamic Programming logic from House
 * Robber I. We just run that logic twice on both subarrays and return the maximum
 * of the two results.
 *
 * Steps:
 * 1. Edge Case: If there is only 1 house, return its value immediately. (If we
 *    tried to split an array of size 1, we would get empty arrays).
 * 2. Define a helper function `robLinear(start, end)` that contains our exact
 *    logic from House Robber I. It will loop from `start` up to `end`.
 * 3. Calculate Scenario A: `robLinear(0, nums.length - 2)`
 * 4. Calculate Scenario B: `robLinear(1, nums.length - 1)`
 * 5. Return `Math.max(Scenario A, Scenario B)`.
 *
 * Time Complexity: O(N)
 * - We loop through the array twice (once for each scenario), doing O(1) math
 *   at each step. O(2N) simplifies to O(N).
 *
 * Space Complexity: O(1)
 * - Because we pass the start and end indices into our helper function instead
 *   of creating new sliced arrays, we only use a few variables (`rob1`, `rob2`)
 *   just like before!
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;

  // Base Case: Only 1 house on the block! Just rob it.
  if (n === 1) {
    return nums[0];
  }

  // This is the EXACT same logic from House Robber I!
  function robLinear(start, end) {
    let rob1 = 0;
    let rob2 = 0;

    for (let i = start; i <= end; i++) {
      const currentHouseMoney = nums[i];

      // The DP Choice: Skip it (rob2) OR Rob it (currentHouse + rob1)
      const currentMax = Math.max(rob2, currentHouseMoney + rob1);

      // Shift our variables forward!
      rob1 = rob2;
      rob2 = currentMax;
    }

    return rob2;
  }

  // Scenario A: We look at the first house, but ignore the last house
  const scenarioA = robLinear(0, n - 2);

  // Scenario B: We ignore the first house, but look at the last house
  const scenarioB = robLinear(1, n - 1);

  // Return the robbery that made us the most money!
  return Math.max(scenarioA, scenarioB);
};

// In House Robber:

// rob1 (The smaller number) holds the older value (from 2 houses ago).
// rob2 (The bigger number) holds the newer value (from 1 house ago).
// The numbers count UP as you get closer to the present.

// In Decode Ways:

// twoStepsBefore (The bigger number) holds the older value.
// oneStepBefore (The smaller number) holds the newer value.
// The numbers count DOWN as you get closer to the present.
