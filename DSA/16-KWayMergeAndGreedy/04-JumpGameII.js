// https://leetcode.com/problems/jump-game-ii/description/
// A greedy algorithm always picks what looks best right now, without worrying about the future.

// You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words,
// if you are at index i, you can jump to any index (i + j) where:
// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.

// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

// Input: nums = [2,3,0,1,4]
// Output: 2

/**
 * Approach:
 * We need to find the minimum number of jumps required to reach the last index.
 * The problem guarantees that reaching the end is always possible.
 *
 * Idea:
 * We use a Greedy BFS-like approach. Instead of calculating the exact jump
 * for every step or trying every combination, we can think of jumps in "windows".
 * - The 1st jump lets us reach a certain window of indices.
 * - From that window of indices, we find the absolute furthest we can reach for our 2nd jump.
 * - We repeat this until our "furthest reach" covers the end of the array.
 *
 * Steps:
 * 1. Initialize `jumps = 0` (our jump counter).
 * 2. Initialize `currentWindowEnd = 0`. This marks the boundary of the furthest
 *    index we can reach with our CURRENT number of jumps.
 * 3. Initialize `farthest = 0`. This keeps track of the absolute furthest index
 *    we can reach for our NEXT jump based on what we've seen so far.
 * 4. Iterate through the array from `0` to `nums.length - 2`:
 *    - Why `nums.length - 2`? Because if we are already at the last index, we don't
 *      need to jump anymore. If we process the last index, we might accidentally add an extra jump.
 *    - Update `farthest = Math.max(farthest, i + nums[i])`.
 *    - If `i` reaches `currentWindowEnd`, it means we have explored all options
 *      for our current jump window. It's time to actually make the jump!
 *    - Increment `jumps++`.
 *    - Update `currentWindowEnd = farthest` to mark the boundary of the next jump window.
 * 5. Return `jumps`.
 *
 * Time Complexity: O(N)
 * - N is the length of the array. We iterate through the array exactly once.
 *
 * Space Complexity: O(1)
 * - We only use three variables (`jumps`, `currentWindowEnd`, `farthest`), requiring
 *   constant extra space.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let jumps = 0;
  let currentWindowEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    // Keep track of the furthest we can reach from the current window
    farthest = Math.max(farthest, i + nums[i]);

    // When we finish exploring all options for the current jump, we MUST jump

    if (i === currentWindowEnd) {
      jumps++;
      currentWindowEnd = farthest;
    }
  }

  return jumps;
};
