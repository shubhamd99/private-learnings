// https://leetcode.com/problems/combination-sum/description/

// Given an array of distinct integers candidates and a target integer target, return a list of all unique
// combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]

/**
 * Approach:
 * We need to find all unique combinations of numbers that sum to a specific target,
 * where we can reuse the same number infinitely.
 *
 * Idea:
 * We use Backtracking. We maintain a `currentSum` to track our progress.
 * If `currentSum` exceeds the target, we stop exploring that path (pruning).
 * If `currentSum` perfectly matches the target, we record the combination.
 * To prevent duplicate combinations (like [2,3] and [3,2]), we use an `index`
 * to force the loop to only look forward. To allow unlimited reuse of the SAME
 * number, our recursive call passes `i` instead of `i + 1`.
 *
 * Steps:
 * 1. Initialize `result = []`.
 * 2. Create `backtrack(index, currentCombo, currentSum)`:
 *    - Base Case 1 (Bust): If `currentSum > target`, return immediately.
 *    - Base Case 2 (Jackpot): If `currentSum === target`, push `[...currentCombo]`
 *      into `result` and return.
 *    - Loop `i` starting from `index` up to `candidates.length`:
 *        - CHOOSE: `currentCombo.push(candidates[i])`
 *        - EXPLORE: Call `backtrack` passing `i` (allowing reuse) and the new sum.
 *        - UN-CHOOSE: `currentCombo.pop()`
 * 3. Call `backtrack(0, [], 0)` to start the process.
 * 4. Return `result`.
 *
 * Time Complexity: O(N ^ (T/M))
 * - Where N is the number of candidates, T is the target, and M is the smallest
 *   candidate. In the worst case, the recursion tree can go as deep as T/M levels.
 *   Each node has N branches.
 *
 * Space Complexity: O(T/M)
 * - The recursion call stack and `currentCombo` array can go as deep as T/M levels.
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  // Our recursive backtracking function
  function backtrack(index, currentCombo, currentSum) {
    // BASE CASE 1 (Bust): We went over the target
    if (currentSum > target) {
      return; // Dead end, track back!
    }

    // BASE CASE 2 (Jackpot): We hit the exact target
    if (currentSum === target) {
      result.push([...currentCombo]);
      return;
    }

    // Loop through choices, starting from `index` to avoid backwards duplicates
    for (let i = index; i < candidates.length; i++) {
      // 1. CHOOSE: Put the candidate in our backpack
      currentCombo.push(candidates[i]);

      // 2. EXPLORE: Go deeper!
      // Notice we pass `i`, NOT `i + 1`. This allows us to reuse the
      // exact same candidate again on the next level!
      backtrack(i, currentCombo, currentSum + candidates[i]);

      // 3. UN-CHOOSE: Take it out to try the next candidate
      currentCombo.pop();
    }
  }

  // Start at index 0, with an empty backpack, and a sum of 0
  backtrack(0, [], 0);

  return result;
};

// --- EXAMPLE TRACE: Combination Sum ---

// Input: candidates = [2, 3, 6, 7], target = 7

// Initial Call: backtrack(index: 0, subset: [], sum: 0)
// - Start loop i from 0 to 3.

// ---------------------------------------------------------
// 1. CHOOSE '2' (i = 0)
// ---------------------------------------------------------
// - subset = [2], sum = 2
// - EXPLORE: Call backtrack(index: 0, subset: [2], sum: 2)   <-- Notice index is still 0!
//     - Start loop i from 0 to 3.

//     -----------------------------------------------------
//     2. CHOOSE '2' (i = 0)
//     -----------------------------------------------------
//     - subset = [2, 2], sum = 4
//     - EXPLORE: Call backtrack(index: 0, subset: [2, 2], sum: 4)
//         - Start loop i from 0 to 3.

//         -------------------------------------------------
//         3. CHOOSE '2' (i = 0)
//         -------------------------------------------------
//         - subset = [2, 2, 2], sum = 6
//         - EXPLORE: Call backtrack(index: 0, subset: [2, 2, 2], sum: 6)

//             - i = 0: CHOOSE '2' -> sum = 8. BUST! (8 > 7). Return.
//             - i = 1: CHOOSE '3' -> sum = 9. BUST! (9 > 7). Return.
//             - i = 2: CHOOSE '6' -> sum = 12. BUST!
//             - i = 3: CHOOSE '7' -> sum = 13. BUST!

//         - UN-CHOOSE '2': (subset = [2, 2], sum = 4)
//         -------------------------------------------------

//         -------------------------------------------------
//         4. CHOOSE '3' (i = 1)  <-- The loop finally moves forward!
//         -------------------------------------------------
//         - subset = [2, 2, 3], sum = 7
//         - EXPLORE: Call backtrack(index: 1, subset: [2, 2, 3], sum: 7)
//             - BASE CASE HIT! sum === target.
//             - Save [2, 2, 3] to RESULTS!
//             - Return!

//         - UN-CHOOSE '3': (subset = [2, 2], sum = 4)
//         -------------------------------------------------

//         - i = 2: CHOOSE '6' -> sum = 10. BUST!
//         - i = 3: CHOOSE '7' -> sum = 11. BUST!

//     - UN-CHOOSE '2': (subset = [2], sum = 2)
//     -----------------------------------------------------

//     -----------------------------------------------------
//     5. CHOOSE '3' (i = 1)
//     -----------------------------------------------------
//     - subset = [2, 3], sum = 5
//     - EXPLORE: Call backtrack(index: 1, subset: [2, 3], sum: 5)
//         - i = 1: CHOOSE '3' -> sum = 8. BUST!
//         - i = 2: CHOOSE '6' -> sum = 11. BUST!
//         - i = 3: CHOOSE '7' -> sum = 12. BUST!

//     - UN-CHOOSE '3': (subset = [2], sum = 2)
//     -----------------------------------------------------

//     - i = 2: CHOOSE '6' -> sum = 8. BUST!
//     - i = 3: CHOOSE '7' -> sum = 9. BUST!

// - UN-CHOOSE '2': (subset = [], sum = 0)
// ---------------------------------------------------------

// ---------------------------------------------------------
// 6. CHOOSE '3' (i = 1)   <-- Original outer loop moves forward!
// ---------------------------------------------------------
// - subset = [3], sum = 3
// - EXPLORE: Call backtrack(index: 1, subset: [3], sum: 3)
//     - Because index is now 1, this loop CAN NEVER look backward at '2' again!
//     - i = 1: CHOOSE '3' -> sum = 6.
//         - EXPLORE: (i = 1, sum = 9). BUST!
//         - EXPLORE: (i = 2, sum = 12). BUST!
//     - i = 2: CHOOSE '6' -> sum = 9. BUST!

// - UN-CHOOSE '3': (subset = [], sum = 0)

// ---------------------------------------------------------
// 7. CHOOSE '6' (i = 2)
// ---------------------------------------------------------
// - subset = [6], sum = 6
// - EXPLORE:
//     - i = 2: CHOOSE '6' -> sum = 12. BUST!
//     - i = 3: CHOOSE '7' -> sum = 13. BUST!

// ---------------------------------------------------------
// 8. CHOOSE '7' (i = 3)
// ---------------------------------------------------------
// - subset = [7], sum = 7
// - EXPLORE: Call backtrack(index: 3, subset: [7], sum: 7)
//     - BASE CASE HIT! sum === target.
//     - Save [7] to RESULTS!
//     - Return!

// - UN-CHOOSE '7': (subset = [], sum = 0)
// ---------------------------------------------------------

// The outer loop is completely finished.
// Final Results: [[2, 2, 3], [7]]
