// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

// Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
// For example, the array nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
// Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.

// Input: nums = [3,4,5,1,2]
// Output: 1
// Explanation: The original array was [1,2,3,4,5] rotated 3 times.

// Input: nums = [4,5,6,7,0,1,2]
// Output: 0
// Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

/*
Logic:
The array is sorted but rotated.

Example: [4, 5, 6, 7, 0, 1, 2]

The minimum is the rotation point: 0

Use binary search.

Compare nums[mid] with nums[right].

Case 1:
nums[mid] > nums[right]

Example:
[4, 5, 6, 7, 0, 1, 2]
          mid        right
           7           2

mid is bigger than right, so the drop/rotation point must be on the right side.
Move left to mid + 1.

Case 2:
nums[mid] <= nums[right]

This means the right side from mid to right is sorted. So the minimum is either at mid or on the left side.
Move right to mid.

We use while (left < right) because when left === right, only one number is left, and that is the minimum.
*/

// Time: O(log n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
};
