// https://leetcode.com/problems/minimum-size-subarray-sum/description/

// Given an array of positive integers nums and a positive integer target,
// return the minimal length of a subarray whose sum is greater than or equal to target.
// If there is no such subarray, return 0 instead.

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
// Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

/*
Logic:
We need the smallest continuous subarray whose sum is at least target.

Use a sliding window with two pointers:
left = start of current window
right = end of current window

currentSum stores the sum of numbers inside the current window.

Move right forward to make the window bigger and increase the sum.
When currentSum becomes >= target, the window is valid.

Now try to shrink from the left to make the window smaller,
because we want the minimum length.

Every time the window is valid, update the answer.
Then remove nums[left] and move left forward.

If we never find a valid window, return 0.
*/

// Time complexity: O(n)
// Space complexity: O(1)
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let currSum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // Add current number to the window sum.
    currSum += nums[right];

    // While sum is enough, try to make window smaller.
    while (currSum >= target) {
      minLen = Math.min(minLen, right - left + 1);

      // Remove left number and shrink window.
      currSum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
};

// Time complexity: O(n)
// Even though there is a while loop inside the for loop:
// right moves from start to end once
// left also moves from start to end once

// Space complexity: O(1)
// We only use a few variables
