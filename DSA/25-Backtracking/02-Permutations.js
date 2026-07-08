// https://leetcode.com/problems/permutations/description/

// Given an array nums of distinct integers, return all the possible permutations.
// You can return the answer in any order.

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

/**
 * Approach:
 * We need to generate all possible permutations (orderings) of an array of
 * distinct integers.
 *
 * Idea:
 * We use Backtracking. Unlike Subsets, order matters in permutations, so we
 * do not use an `index` to restrict our choices. Our `for` loop will always
 * iterate from 0 to the end of the array. To ensure we don't reuse the same
 * number in a single permutation, we check if our `currentPermutation` array
 * already includes the number. We hit our base case and record the answer when
 * the length of our `currentPermutation` equals the length of `nums`.
 *
 * Steps:
 * 1. Initialize our `result` array.
 * 2. Create our `backtrack` helper function that takes `(currentPermutation)`.
 * 3. Base Case: If `currentPermutation.length === nums.length`, we have a complete
 *    permutation! Push a CLONE of it to `result` (`[...currentPermutation]`) and `return`.
 * 4. Loop `i` from `0` to `nums.length - 1`:
 *    - Skip Check: If `currentPermutation.includes(nums[i])`, `continue`.
 *    - CHOOSE: `currentPermutation.push(nums[i])`
 *    - EXPLORE: `backtrack(currentPermutation)`
 *    - UN-CHOOSE: `currentPermutation.pop()`
 * 5. Call `backtrack([])` to start.
 * 6. Return `result`.
 *
 * Time Complexity: O(N * N!)
 * - There are N! (N factorial) possible permutations. For each permutation, we
 *   do O(N) work to copy it into our result array. Our `.includes()` check also
 *   takes O(N), but since N is extremely small in permutation problems (N <= 6),
 *   this is perfectly efficient.
 *
 * Space Complexity: O(N)
 * - The recursion call stack will go at most O(N) deep, and our `currentPermutation`
 *   array holds at most N elements.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];

  // Our recursive backtracking function
  // Notice we do NOT need an 'index' parameter anymore!
  function backtrack(currentPermutation) {
    // BASE CASE: Is the backpack full?
    if (currentPermutation.length === nums.length) {
      // Make a deep copy and save it!
      result.push([...currentPermutation]);
      return; // Go back and try other combinations
    }

    // Always start from 0 so we can pick numbers we skipped earlier
    for (let i = 0; i < nums.length; i++) {
      // If the number is already in our backpack, skip it!
      if (currentPermutation.includes(nums[i])) {
        continue;
      }

      // 1. CHOOSE: Put the number in our backpack
      currentPermutation.push(nums[i]);

      // 2. EXPLORE: Go deeper to pick the next number
      backtrack(currentPermutation);

      // 3. UN-CHOOSE (Backtrack): Take the number back out so the loop
      // can try putting a different number in this slot.
      currentPermutation.pop();
    }
  }

  // Start the recursion with an empty backpack
  backtrack([]);

  return result;
};

// --- EXAMPLE TRACE: Permutations ---

// Input: nums = [1, 2, 3]

// Initial Call: backtrack(subset: [])
// - Start loop i from 0 to 2.

// ---------------------------------------------------------
// 1. CHOOSE '1' (i = 0)
// ---------------------------------------------------------
// - subset.includes(1) is false.
// - Push nums[0] into subset. (subset = [1])
// - EXPLORE: Call backtrack(subset: [1])
//     - Start loop i from 0 to 2.

//     - i = 0: subset.includes(1) is TRUE. SKIP!

//     -----------------------------------------------------
//     2. CHOOSE '2' (i = 1)
//     -----------------------------------------------------
//     - subset.includes(2) is false.
//     - Push nums[1] into subset. (subset = [1, 2])
//     - EXPLORE: Call backtrack(subset: [1, 2])
//         - Start loop i from 0 to 2.

//         - i = 0: subset.includes(1) is TRUE. SKIP!
//         - i = 1: subset.includes(2) is TRUE. SKIP!

//         -------------------------------------------------
//         3. CHOOSE '3' (i = 2)
//         -------------------------------------------------
//         - subset.includes(3) is false.
//         - Push nums[2] into subset. (subset = [1, 2, 3])
//         - EXPLORE: Call backtrack(subset: [1, 2, 3])
//             - BASE CASE HIT! subset.length === 3.
//             - Save [1, 2, 3] to RESULTS!
//             - Return!

//         - UN-CHOOSE '3': pop() from subset. (subset = [1, 2])
//         -------------------------------------------------
//         - Loop i=2 is finished. Return!

//     - UN-CHOOSE '2': pop() from subset. (subset = [1])

//     -----------------------------------------------------
//     4. CHOOSE '3' (i = 2)   <-- The loop moved forward!
//     -----------------------------------------------------
//     - subset.includes(3) is false.
//     - Push nums[2] into subset. (subset = [1, 3])
//     - EXPLORE: Call backtrack(subset: [1, 3])
//         - Start loop i from 0 to 2.

//         - i = 0: subset.includes(1) is TRUE. SKIP!

//         -------------------------------------------------
//         5. CHOOSE '2' (i = 1) <-- Grabbing a skipped number!
//         -------------------------------------------------
//         - subset.includes(2) is false.
//         - Push nums[1] into subset. (subset = [1, 3, 2])
//         - EXPLORE: Call backtrack(subset: [1, 3, 2])
//             - BASE CASE HIT! subset.length === 3.
//             - Save [1, 3, 2] to RESULTS!
//             - Return!

//         - UN-CHOOSE '2': pop() from subset. (subset = [1, 3])
//         -------------------------------------------------

//         - i = 2: subset.includes(3) is TRUE. SKIP!
//         - Loop finished. Return!

//     - UN-CHOOSE '3': pop() from subset. (subset = [1])
//     -----------------------------------------------------
//     - Loop i=2 is finished. Return!

// - UN-CHOOSE '1': pop() from subset. (subset = [])

// ---------------------------------------------------------
// 6. CHOOSE '2' (i = 1)   <-- The original outer loop moved forward!
// ---------------------------------------------------------
// - Push nums[1] into subset. (subset = [2])
// - EXPLORE: Call backtrack(subset: [2])
//     - Start loop i from 0 to 2.

//     -----------------------------------------------------
//     7. CHOOSE '1' (i = 0) <-- The loop starts at 0 and grabs '1'!
//     -----------------------------------------------------
//     - subset.includes(1) is false.
//     - Push nums[0] into subset. (subset = [2, 1])
//     - EXPLORE: Call backtrack(subset: [2, 1])
//         - ... (This will eventually find [2, 1, 3] and return)
