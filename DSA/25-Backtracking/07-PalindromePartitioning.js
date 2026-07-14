// https://leetcode.com/problems/palindrome-partitioning/description/

// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all possible palindrome partitioning of s.

// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]
// Input: s = "a"
// Output: [["a"]]

/**
 * Approach:
 * We need to find all possible ways to partition a string such that every
 * substring is a palindrome.
 *
 * Idea:
 * We use Backtracking to explore all possible partitioning combinations. We use
 * an `index` to represent where our current "slice" starts. In our loop, we
 * expand the end of our slice `i` from the starting `index` to the end of the
 * string. If the slice from `index` to `i` is a valid palindrome, we CHOOSE it
 * (push it to our partition array), EXPLORE the remaining part of the string
 * starting from `i + 1`, and then UN-CHOOSE it (pop it) to try a larger slice.
 * If we reach the end of the string (`index === s.length`), it means every slice
 * we made was valid, so we record the result.
 *
 * Steps:
 * 1. Initialize `result = []`.
 * 2. Create a helper function `isPalindrome(left, right)` to check if a substring
 *    is a palindrome using two pointers.
 * 3. Create `backtrack(index, currentPartition)`:
 *    - Base Case: If `index === s.length`, we successfully partitioned the whole
 *      string! Push `[...currentPartition]` to `result` and return.
 *    - Loop `i` from `index` to `s.length - 1` (expanding the slice size):
 *        - If the substring from `index` to `i` is a palindrome:
 *            - CHOOSE: Extract the substring and push it to `currentPartition`.
 *            - EXPLORE: Call `backtrack(i + 1, currentPartition)` to chop the rest.
 *            - UN-CHOOSE: `currentPartition.pop()` to try a bigger chop instead.
 * 4. Call `backtrack(0, [])` to start chopping from the beginning.
 * 5. Return `result`.
 *
 * Time Complexity: O(N * 2^N)
 * - Where N is the length of the string. In the worst case (e.g., "aaaa"), there
 *   are 2^N possible partitions. For each partition, we might take O(N) time to
 *   check if it's a palindrome and O(N) time to copy it into our result array.
 *
 * Space Complexity: O(N)
 * - The recursion call stack and `currentPartition` array will go at most N deep.
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const result = [];

  // Simple two-pointer helper to check if a substring is a palindrome
  function isPalindrome(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  // Our recursive backtracking function
  function backtrack(index, currentPartition) {
    // BASE CASE: Did our knife reach the very end of the candy?
    if (index === s.length) {
      result.push([...currentPartition]); // Save a deep copy!
      return;
    }

    // Try making different sized chops, starting at 'index' and ending at 'i'
    for (let i = index; i < s.length; i++) {
      // Is this specific chop a palindrome?
      if (isPalindrome(index, i)) {
        // 1. CHOOSE: It's a palindrome! Put it in the backpack.
        // Note: substring() ending index is exclusive, so we use i + 1
        const slice = s.substring(index, i + 1);
        currentPartition.push(slice);

        // 2. EXPLORE: Move the knife to the next letter (i + 1) and keep chopping!
        backtrack(i + 1, currentPartition);

        // 3. UN-CHOOSE: Take the chop out of the backpack, so the loop
        // can expand 'i' and try to make a LARGER chop instead!
        currentPartition.pop();
      }
      // If it's NOT a palindrome, the loop just skips to the next 'i'
      // to see if a bigger slice forms a palindrome.
    }
  }

  // Start chopping at index 0 with an empty backpack
  backtrack(0, []);

  return result;
};
