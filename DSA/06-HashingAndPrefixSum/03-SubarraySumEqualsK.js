// https://leetcode.com/problems/subarray-sum-equals-k/description/
// https://www.youtube.com/shorts/HKPP_5G0FXU

// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
// A subarray is a contiguous non-empty sequence of elements within an array.

// Input: nums = [1,1,1], k = 2
// Output: 2 (1 + 1) (1 + 1)
// Input: nums = [1,2,3], k = 3
// Output: 2 (1 + 2 = 3) (3 = 3)

// Important: subarray means continuous part of the array.
// So [1, 3] is not a subarray here because it skips 2.

/*
Logic:
We need to count subarrays whose sum is exactly k.

A subarray is a continuous part of the array.

We use a running sum.
Running sum means total sum from the start up to the current number.

Example:
nums = [1, 2, 3]

Before starting, running sum = 0
After reading 1, running sum = 1
After reading 2, running sum = 3
After reading 3, running sum = 6

To find sum between two points, subtract running sums.

Example:
The subarray [3] starts after running sum 3 and ends at running sum 6.
So its sum is:
6 - 3 = 3

At every index, we ask:
"Is there an old running sum that I can remove from current sum to get k?"

Formula:
currentSum - oldSum = k

So:
oldSum = currentSum - k

If oldSum appeared before, then a subarray ending here has sum k.

The map stores:
runningSum -> how many times this running sum appeared before
*/

// Time: O(n)
// Space: O(n)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const map = new Map();

  // Prefix sum 0 has appeared once before starting.
  map.set(0, 1);

  let sum = 0;
  let count = 0;

  for (const num of nums) {
    // Current prefix sum.
    sum += num;

    // If sum - k appeared before, then a subarray ending here sums to k.
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }

    // Store how many times this prefix sum has appeared.
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
};
