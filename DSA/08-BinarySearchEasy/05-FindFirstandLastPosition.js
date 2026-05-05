// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

// Given an array of integers nums sorted in non-decreasing order,
// find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]

// nums = [1], target = 1
// output = [0, 0]

// nums = [1, 2, 3, 4, 5], target = 3
// output = [2, 2]

/*
Logic:
The array is sorted, so all target values are together.

Example:
nums = [5, 7, 7, 8, 8, 10]
target = 8
The target appears from index 3 to index 4.

We use binary search twice:

1. Find the first occurrence:
   When nums[mid] === target, save mid,
   but continue searching on the left side.

2. Find the last occurrence:
   When nums[mid] === target, save mid,
   but continue searching on the right side.

Normal binary search returns immediately when it finds target.
Here we do not return immediately because we need the boundary.
*/

// Time: O(log n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const first = findFirst(nums, target);
  const last = findLast(nums, target);

  return [first, last];
};

function findFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      // Found target, but there may be another one on the left.
      answer = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

function findLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      // Found target, but there may be another one on the right.
      answer = mid;
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}
