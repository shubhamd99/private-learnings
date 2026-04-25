// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// already sorted in non-decreasing order

// Time: O(n) — single pass with two pointers moving toward each other
// Space: O(1) — only two pointer variables, no extra data structures

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
};
