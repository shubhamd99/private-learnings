// https://leetcode.com/problems/subsets/description/

// Backtracking is in computer science. It is an algorithm that tries to build a solution step-by-step.
// The moment it realizes a specific path is a dead end (or violates the rules), it undoes its last step and
// tries a different option.
// You use Backtracking whenever a problem asks you to find "All possible ways", "All combinations", or "All permutations".

// Given an integer array nums of unique elements, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.

// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
// Input: nums = [0]
// Output: [[],[0]]

/**
 * Approach:
 * We need to generate the "power set" (all possible subsets) of a given array.
 *
 * Idea:
 * This is a textbook Backtracking problem. We will use a recursive function to
 * explore all combinations. At any given step, we add the current state of our
 * subset to our final results array. Then, we loop through the remaining numbers.
 * For each number, we CHOOSE it (push it to our subset array), EXPLORE further
 * down that path (recursive call), and then UN-CHOOSE it (pop it off the array)
 * so the loop can move on and try the next number.
 *
 * Steps:
 * 1. Initialize our `result` array to hold all subsets.
 * 2. Create our `backtrack` helper function that takes `(index, currentSubset)`.
 *    - `index` tells us which numbers we are allowed to look at next (to prevent
 *      going backwards and creating duplicates like [1,2] and [2,1]).
 *    - `currentSubset` is our backpack.
 * 3. Inside `backtrack`:
 *    - Immediately push a CLONE of the `currentSubset` to `result`.
 *      (e.g., `result.push([...currentSubset])`).
 *    - Loop `i` from `index` to the end of `nums`.
 *    - CHOOSE: `currentSubset.push(nums[i])`
 *    - EXPLORE: `backtrack(i + 1, currentSubset)` (Move forward to the next index)
 *    - UN-CHOOSE: `currentSubset.pop()` (Take the number out to try the next one)
 * 4. Call `backtrack(0, [])` to kick off the recursion.
 * 5. Return `result`.
 *
 * Time Complexity: O(N * 2^N)
 * - For an array of size N, there are exactly 2^N possible subsets (because every
 *   element has 2 choices: in or out). In the worst case, copying the subset into
 *   our result array takes O(N) time.
 *
 * Space Complexity: O(N)
 * - The recursion call stack will go at most O(N) deep. Our `currentSubset` array
 *   will hold at most O(N) elements at a time. (We do not count the `result`
 *   array space in standard complexity analysis for output).
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  // Our recursive backtracking function
  function backtrack(index, currentSubset) {
    // At every single step, we have a valid subset!
    // We MUST use [...currentSubset] to make a deep copy.
    // If we don't, our .pop() later will erase our answers!

    result.push([...currentSubset]);

    // Loop through all remaining choices
    for (let i = index; i < nums.length; i++) {
      // 1. CHOOSE: Put the number in our backpack
      currentSubset.push(nums[i]);

      // 2. EXPLORE: Move to the next index and repeat the process
      backtrack(i + 1, currentSubset);

      // 3. UN-CHOOSE (Backtrack): Take the number back out of the backpack
      // so the for-loop can try putting the next number in instead.
      currentSubset.pop();
    }
  }

  // Start the recursion at index 0 with an empty backpack
  backtrack(0, []);

  return result;
};

// --- EXAMPLE TRACE: Subsets ---

// Input: nums = [1, 2, 3]

// Initial Call: backtrack(index: 0, subset: [])
// - Push [] to results.
// - RESULTS: [ [] ]
// - Start loop i from 0 to 2.

// ---------------------------------------------------------
// 1. CHOOSE '1' (i = 0)
// ---------------------------------------------------------
// - Push nums[0] into subset. (subset = [1])
// - EXPLORE: Call backtrack(index: 1, subset: [1])
//     - Push [1] to results.
//     - RESULTS: [ [], [1] ]
//     - Start loop i from 1 to 2.

//     -----------------------------------------------------
//     2. CHOOSE '2' (i = 1)
//     -----------------------------------------------------
//     - Push nums[1] into subset. (subset = [1, 2])
//     - EXPLORE: Call backtrack(index: 2, subset: [1, 2])
//         - Push [1, 2] to results.
//         - RESULTS: [ [], [1], [1, 2] ]
//         - Start loop i from 2 to 2.

//         -------------------------------------------------
//         3. CHOOSE '3' (i = 2)
//         -------------------------------------------------
//         - Push nums[2] into subset. (subset = [1, 2, 3])
//         - EXPLORE: Call backtrack(index: 3, subset: [1, 2, 3])
//             - Push [1, 2, 3] to results.
//             - RESULTS: [ [], [1], [1, 2], [1, 2, 3] ]
//             - Loop fails (i=3 is out of bounds). Return!

//         - UN-CHOOSE '3': pop() from subset. (subset = [1, 2])
//         -------------------------------------------------
//         - Loop i=2 is finished. Return!

//     - UN-CHOOSE '2': pop() from subset. (subset = [1])

//     -----------------------------------------------------
//     4. CHOOSE '3' (i = 2)   <-- The loop moved forward!
//     -----------------------------------------------------
//     - Push nums[2] into subset. (subset = [1, 3])
//     - EXPLORE: Call backtrack(index: 3, subset: [1, 3])
//         - Push [1, 3] to results.
//         - RESULTS: [ [], [1], [1, 2], [1, 2, 3], [1, 3] ]
//         - Loop fails. Return!

//     - UN-CHOOSE '3': pop() from subset. (subset = [1])
//     -----------------------------------------------------
//     - Loop i=2 is finished. Return!

// - UN-CHOOSE '1': pop() from subset. (subset = [])

// ---------------------------------------------------------
// 5. CHOOSE '2' (i = 1)   <-- The original outer loop moved forward!
// ---------------------------------------------------------
// - Push nums[1] into subset. (subset = [2])
// - EXPLORE: Call backtrack(index: 2, subset: [2])
//     - Push [2] to results.
//     - RESULTS: [ [], [1], [1, 2], [1, 2, 3], [1, 3], [2] ]
//     - Start loop i from 2 to 2.

//     -----------------------------------------------------
//     6. CHOOSE '3' (i = 2)
//     -----------------------------------------------------
//     - Push nums[2] into subset. (subset = [2, 3])
//     - EXPLORE: Call backtrack(index: 3, subset: [2, 3])
//         - Push [2, 3] to results.
//         - RESULTS: [ [], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3] ]
//         - Loop fails. Return!

//     - UN-CHOOSE '3': pop() from subset. (subset = [2])
//     -----------------------------------------------------
//     - Loop i=2 is finished. Return!

// - UN-CHOOSE '2': pop() from subset. (subset = [])

// ---------------------------------------------------------
// 7. CHOOSE '3' (i = 2)   <-- The original outer loop moves one last time!
// ---------------------------------------------------------
// - Push nums[2] into subset. (subset = [3])
// - EXPLORE: Call backtrack(index: 3, subset: [3])
//     - Push [3] to results.
//     - RESULTS: [ [], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3] ]
//     - Loop fails. Return!

// - UN-CHOOSE '3': pop() from subset. (subset = [])
// ---------------------------------------------------------

// The outer loop is completely finished. The program exits!
