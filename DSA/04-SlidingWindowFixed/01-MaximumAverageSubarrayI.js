// https://leetcode.com/problems/maximum-average-subarray-i/

// You are given an integer array nums consisting of n elements, and an integer k.
// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value
// Any answer with a calculation error less than 10^-5 will be accepted.

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

// Fixed sliding window
// The window size is fixed throughout, it never changes. You slide it across the array one step at a time.

// Core idea
// Instead of recalculating the entire window sum or value from scratch every time you move, you just:
// Add the new element coming into the window from the right
// Remove the old element leaving the window from the left
// This gives you O(n) instead of O(n^2).

// fixed sliding window of size k, add new right element and remove old left element on each slide
// track max sum and divide once at end to get max average

// i - k or i - 1 -> If you did i - 1 you would remove the element just before i
// which is the last element of the current window, not the first element that should be leaving

// i < k -> Because you want to sum exactly k elements, indices 0 to k-1.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = 0;

  // build initial window
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let maxSum = sum;

  // slide window from index k to end
  for (let i = k; i < nums.length; i++) {
    sum += nums[i]; // add new right element
    sum -= nums[i - k]; // remove leftmost element of previous window that is no longer in current window, k is window
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k; // A larger sum always means a larger average when you are dividing by the same k
};
