// https://leetcode.com/problems/find-peak-element/

// A peak element is an element that is strictly greater than its neighbors.
// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
// You must write an algorithm that runs in O(log n) time.

// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.

// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

/*
Logic:
A peak is an element bigger than its neighbors.

We can use binary search by checking the slope.

Compare nums[mid] with nums[mid + 1].

If nums[mid] < nums[mid + 1]:
We are going uphill to the right.
So there must be a peak on the right side.
Move left = mid + 1.

Else:
nums[mid] > nums[mid + 1]
We are going downhill to the right.
So mid could be a peak, or a peak exists on the left side.
Move right = mid.

We use while (left < right) because when left === right,
only one index is left, and that index is a peak.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid + 1]) {
      // Going up, peak is on the right.
      left = mid + 1;
    } else {
      // Going down, peak is at mid or on the left.
      right = mid;
    }
  }

  return left;
};
