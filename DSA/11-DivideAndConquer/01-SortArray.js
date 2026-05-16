// https://leetcode.com/problems/sort-an-array/description/

// Given an array of integers nums, sort the array in ascending order and return it.
// You must solve the problem without using any built-in functions in O(nlog(n)) time complexity
// and with the smallest space complexity possible.

// Input: nums = [5,2,3,1]
// Output: [1,2,3,5]
// Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

// Divide and Conquer / Merge Sort

// Quick Sort partitions first, then sorts parts.
// Merge Sort sorts parts first, then merges them.

// Steps:
// 1. Divide:
// Break the problem into smaller parts.
// 2. Conquer:
// Solve each smaller part, usually using recursion.
// 3. Combine:
// Merge the smaller answers to get the final answer.
// log n levels of splitting
// each level does O(n) work to merge

/*
Logic:
Use merge sort. Merge sort is divide and conquer.

Divide:
Split the array into two halves again and again until each part has only one element.

A single element is already sorted.

Conquer: Sort the left half and right half recursively.

Combine: Merge the two sorted halves into one sorted array.

Example:
[5, 2, 3, 1]

Split:
[5, 2] and [3, 1]

Split again:
[5], [2], [3], [1]

Merge sorted:
[2, 5] and [1, 3]

Merge final:
[1, 2, 3, 5]
*/

// Time: O(n log n)
// Space: O(n)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);

  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));

  return merge(left, right);
};

function merge(left, right) {
  const result = [];

  let i = 0;
  let j = 0;

  // Compare both sorted arrays and take the smaller value.
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining values from left array.
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  // Add remaining values from right array.
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
