// https://leetcode.com/problems/jump-game/

// You are given an integer array nums. You are initially positioned at the array's first index,
// and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.

// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

// A greedy algorithm always picks what looks best right now, without worrying about the future.

// The Jump Game is a classic problem that can be solved very efficiently using a Greedy Approach.
// While you could solve it with Dynamic Programming (checking every possible jump),
// DP is usually O(n^2) and will result in a Time Limit Exceeded (TLE) error for large inputs.
// The Greedy approach allows us to solve it in O(n) time and O(1) space.

/**
 * Approach:
 * We need to determine if we can reach the last index of an array where each
 * element represents the maximum jump length from that position.
 *
 * Idea:
 * We can use a Greedy approach. Instead of checking every possible jump path
 * (which would be too slow), we keep track of the maximum index we can possibly
 * reach at any given step. As we iterate through the array, if the current index
 * is within our reach, we see if jumping from this index allows us to reach further
 * than our current maximum reach. If our maximum reach ever equals or exceeds the
 * last index, we know it's possible to reach the end.
 *
 * Steps:
 * 1. Initialize `maxReach = 0` to track the furthest index we can jump to.
 * 2. Iterate through each index `i` from `0` to `nums.length - 1`.
 * 3. At each index, check if `i > maxReach`. If true, it means we can't even
 *    reach the current index, so we are stuck. Return `false`.
 * 4. Otherwise, update `maxReach` to be the maximum of its current value and
 *    `i + nums[i]` (the furthest we can reach from the current position).
 * 5. Optimization: If `maxReach` is greater than or equal to the last index,
 *    we can return `true` immediately.
 * 6. If we successfully loop through the entire array without getting stuck, return `true`.
 *
 * Time Complexity: O(N)
 * - N is the length of the array. We iterate through the array exactly once.
 *
 * Space Complexity: O(1)
 * - We only use a single variable (`maxReach`) to keep track of the furthest
 *   reachable index, regardless of the input array size.
 */

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
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    // If we can't reach the current index, we are stuck.
    if (i > maxReach) {
      return false;
    }

    // Greedily update the furthest index we can reach.
    maxReach = Math.max(maxReach, i + nums[i]);

    // If we can already reach the end, exit early.
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return true;
};

// Let's play a winning game: [2, 3, 1, 1, 4]
// The board has 5 squares (Indexes 0, 1, 2, 3, 4). The finish line is Index 4.

// Step 0: You start on the first square. It says 2.

// From index 0, jumping 2 spaces gets you to index 2.
// Furthest Unlocked: Index 2.
// (We know we can at least reach index 2 safely).
// Step 1: You step forward to the next square. It says 3.

// You are currently standing on index 1. If you jump 3 spaces from here (1 + 3), you land on index 4!
// Furthest Unlocked: Index 4.
// Wait! Index 4 is the finish line! You don't even need to look at the rest of the board. You know for a fact you can win. Return True.

// Let's play a losing game: [3, 2, 1, 0, 4]
// The finish line is still Index 4.

// Step 0: First square says 3.

// From index 0, jumping 3 spaces gets you to index 3.
// Furthest Unlocked: Index 3.
// Step 1: Next square says 2.

// From index 1, jumping 2 spaces gets you to index 3 (1 + 2).
// Furthest Unlocked: Still Index 3.
// Step 2: Next square says 1.

// From index 2, jumping 1 space gets you to index 3 (2 + 1).
// Furthest Unlocked: Still Index 3.
// Step 3: Next square says 0.

// You are on index 3. You can jump 0 spaces.
// Furthest Unlocked: Still Index 3.
// Uh oh. You are standing on a 0. You cannot jump forward. You look at your notes: the absolute furthest square you have ever unlocked is Index 3, which is exactly where you are standing.

// You are completely out of gas. You can't move, and you haven't reached the end. Return False.
