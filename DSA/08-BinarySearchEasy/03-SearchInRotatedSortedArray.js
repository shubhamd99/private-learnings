// https://leetcode.com/problems/search-in-rotated-sorted-array/description/

// There is an integer array nums sorted in ascending order (with distinct values).

// A rotated array is a sorted array that has been shifted at some pivot point.
// Think of it like a circular shift. You take the end portion and move it to the front, or take the front portion and move it to the end.

// The key property is that even after rotation, one half of the array is always fully sorted.
// Either the left half is sorted or the right half is sorted.
// This is what binary search exploits to still work in O(log n) even on a rotated array.

// rotated sorted array always has one sorted half at any point
// check which half is sorted, then check if target is in that half
// if yes search that half, if no search the other half

// Time: O(log n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // left half is sorted
    if (nums[left] <= nums[mid]) {
      // target is in left half
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // right half is sorted
      // target is in right half
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};
