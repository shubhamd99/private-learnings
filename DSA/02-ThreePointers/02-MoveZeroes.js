// https://leetcode.com/problems/move-zeroes/description/

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Two pass approach

// Whenever you see a non-zero at i, you place it at insert and move insert forward.
// Zeros get ignored during this pass and naturally fall behind.
// then fill remaining positions with zeros

// Time Complexity - O(n) Single Pass
// Space Complexity - O(1) In place

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let insert = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insert] = nums[i];
      insert++;
    }
  }

  for (let i = insert; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};
