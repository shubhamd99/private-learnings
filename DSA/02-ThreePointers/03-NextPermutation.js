// https://leetcode.com/problems/next-permutation/description/

// Given an array of integers nums, find the next permutation of nums.
// The replacement must be in place and use only constant extra memory.
// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].

// example: [1, 3, 2]
// suffix [3, 2] is descending, already at its maximum, no point rearranging it
// so we go one step left, pivot is 1 at index 0, it is the first element that can be increased
// from the right, smallest element greater than pivot(1) is 2, swap them -> [2, 3, 1]
// suffix after pivot [3, 1] is still descending, reverse it to get smallest suffix -> [2, 1, 3]
// [2, 1, 3] is the next permutation, just barely larger than [1, 3, 2]

// Pivot is the turning point. The element where the pattern changes and you need to act on it.

// find pivot: first index from right where nums[i] < nums[i+1], meaning it is not fully descending
// find swap candidate: first index from right that is greater than pivot value
// swap pivot with candidate, then reverse everything after pivot to get smallest possible suffix
// if no pivot found, entire array is descending (last permutation), just reverse the whole array

// Time Complexity - O(n)
// Space Complexity - O(1) In place

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const n = nums.length; // n stores raw length, indices are derived as n-1, n-2 when needed
  let pivot = -1;

  // step 1: find pivot, walk from right to left
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }

  // no pivot found, array is fully descending, reverse entire array
  if (pivot === -1) {
    nums.reverse();
    return;
  }

  // step 2: find first element from right that is greater than pivot value
  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] > nums[pivot]) {
      [nums[i], nums[pivot]] = [nums[pivot], nums[i]];
      break;
    }
  }

  // step 3: reverse everything after pivot to get smallest possible suffix
  let left = pivot + 1;
  let right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};
