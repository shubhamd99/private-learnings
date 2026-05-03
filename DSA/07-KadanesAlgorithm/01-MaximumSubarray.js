// Given an integer array nums, find the subarray with the largest sum, and return its sum.

// Kadane’s Algorithm is a dynamic programming algorithm used to find the maximum sum of any
// contiguous subarray in an array in O(n) time.
// Kadane solves it by keeping only two things while scanning the array:
// currentSum = best subarray sum ending at current index
// maxSum = best subarray sum seen so far

// At every number, you make one decision:
// Should I add this number to the previous subarray,
// or start a new subarray from this number?

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

/*
Logic:

At every number, we have two choices:

1. Start a new subarray from this number.
2. Add this number to the previous subarray.

We choose whichever gives a bigger sum.

currentSum means: Best subarray sum that ends at the current index.

maxSum means: Best subarray sum found anywhere so far.

If the previous currentSum is negative or not helpful, starting fresh from current number is better.

Example:
nums = [-2, 1]

At 1:
continue old subarray: -2 + 1 = -1
start new subarray: 1

Choose 1.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    currentSum = Math.max(num, currentSum + num);

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};
