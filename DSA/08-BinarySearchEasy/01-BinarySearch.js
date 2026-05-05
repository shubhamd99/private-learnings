// https://leetcode.com/problems/binary-search/description/

// Given an array of integers nums which is sorted in ascending order, and an integer target,
// write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4

// Binary search works on the principle of divide and conquer.
// Because the array is sorted, at every step you can eliminate half the remaining search space
// by comparing the middle element with the target.

/*
Logic:
The array is sorted, so we do not need to check every number.

We keep two pointers:
left = start of current search area
right = end of current search area

Each time:
1. Find the middle index.
2. If nums[mid] is the target, return mid.
3. If nums[mid] is smaller than target, search the right half.
4. If nums[mid] is bigger than target, search the left half.

Every step removes half of the remaining numbers.

If left becomes greater than right, the target does not exist.
Return -1.
*/

// Time: O(log n) each iteration halves the search space.
// Space: O(1);
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  // Use <= because when left === right, there is still one element left to check.
  while (left <= right) {
    // Find the middle index
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};
