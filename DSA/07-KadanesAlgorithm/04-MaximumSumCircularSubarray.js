// https://leetcode.com/problems/maximum-sum-circular-subarray/description/

// Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.
// A circular array means the end of the array connects to the beginning of the array.

// Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].
// A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j],
// there does not exist i <= k1, k2 <= j with k1 % n == k2 % n

// Input: nums = [1,-2,3,-2]
// Output: 3
// Explanation: Subarray [3] has maximum sum 3.

// Input: nums = [5,-3,5]
// Output: 10
// Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

/*
Logic:
This is Maximum Subarray Sum, but the array is circular.
Circular means the subarray can wrap from the end back to the start.

Example:
nums = [5, -3, 5]

Normal best subarray:
[5] or [5] = 5

Circular best subarray:
[5] from end + [5] from start = 10

How do we get circular sum?

For circular case, think opposite:
Instead of directly finding the wrapped subarray,
we remove the worst middle part.

Example:
nums = [5, -3, 5]

totalSum = 5 + (-3) + 5 = 7

Minimum subarray is:
[-3]

If we remove [-3], remaining circular part is:
[5] + [5] = 10

So:
circularMax = totalSum - minSum

There are two possible answers:
1. Normal max subarray, using Kadane max.
2. Circular max subarray = totalSum - minimum subarray.

We calculate both and return the bigger one.

Special case:
If all numbers are negative, totalSum - minSum becomes 0,
which is wrong because empty subarray is not allowed.
So if maxSum < 0, return maxSum directly.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  let totalSum = nums[0];

  // Kadane for maximum subarray.
  let currMax = nums[0];
  let currMin = nums[0];

  // Kadane for minimum subarray.
  // Needed because circular answer removes the minimum-sum middle part.
  let maxSum = nums[0];
  let minSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    totalSum += num;

    currMax = Math.max(num, currMax + num);
    maxSum = Math.max(currMax, maxSum);

    currMin = Math.min(num, currMin + num);
    minSum = Math.min(currMin, minSum);
  }

  // If all numbers are negative, normal max is the answer. Circular formula would incorrectly give 0.
  if (maxSum < 0) return maxSum;

  // Return best of:
  // 1. normal non-circular max subarray
  // 2. circular max subarray = total sum - minimum subarray
  return Math.max(maxSum, totalSum - minSum);
};
