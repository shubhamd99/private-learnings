// https://leetcode.com/problems/longest-consecutive-sequence/description/

// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

/*
Logic:

Use a Set so we can quickly check if a number exists.

Important idea:
Only start counting from the beginning of a chain.

A number is the beginning if num - 1 does not exist.

Example:
1 is a beginning because 0 does not exist.
2 is not a beginning because 1 exists.
3 is not a beginning because 2 exists.
4 is not a beginning because 3 exists.

So we start from 1, then count 2, 3, 4.
This avoids counting the same chain again from 2, 3, and 4.
*/

// Time: O(n)
// Space: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let maxlen = 0;

  for (const num of set) {
    // Start only if this is the first number of a sequence.
    if (!set.has(num - 1)) {
      let current = num;
      let length = 1;

      // Keep counting while next consecutive number exists.
      while (set.has(current + 1)) {
        current++;
        length++;
      }

      maxlen = Math.max(maxlen, length);
    }
  }

  return maxlen;
};
