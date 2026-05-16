// https://leetcode.com/problems/kth-largest-element-in-an-array/submissions/2004681815/
// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Can you solve it without sorting?

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

// Divide and Conquer / Quick Select Sort
// Quickselect is like quicksort, but we only search one side.

// Quick Sort partitions first, then sorts parts.
// Merge Sort sorts parts first, then merges them.

/*
Logic:
Use Quickselect.

We need kth largest.
It is easier to think in sorted ascending order.

Example:
nums = [3, 2, 1, 5, 6, 4]
k = 2

Sorted ascending:
[1, 2, 3, 4, 5, 6]

2nd largest is 5.
Its index in sorted ascending array is:
nums.length - k = 6 - 2 = 4

So we need the number that would be at index 4
if the array was sorted.

Quickselect idea:
1. Pick a pivot.
2. Move all smaller numbers to the left of pivot.
3. Move all bigger numbers to the right of pivot.
4. Now pivot is at its correct sorted position.
5. If pivot index is target index, return pivot.
6. If target is smaller, search left side.
7. If target is bigger, search right side.
*/

// Average Time: O(n)
// Worst Time: O(n^2)
// Space: O(1)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const targetIndex = nums.length - k;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(nums, left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    }

    if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }
};

function partition(nums, left, right) {
  // Use rightmost element as pivot.
  const pivot = nums[right];

  // storeIndex is where the next smaller/equal value should go.
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (nums[i] <= pivot) {
      [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
      storeIndex++;
    }
  }

  // Put pivot in its final sorted position.
  [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

  return storeIndex;
}

// nums = [3, 2, 1, 5, 6, 4]
// k = 2
// We want 2nd largest.
// Sorted ascending would be: [1, 2, 3, 4, 5, 6]

// targetIndex = nums.length - k
// targetIndex = 6 - 2 = 4 - So we want the value that belongs at index 4.

// Now run Quickselect.
// nums = [3, 2, 1, 5, 6, 4]
// left = 0
// right = 5

// pivot = nums[right] = 4

// Partition means:
// Put numbers <= 4 on left side.
// Put numbers > 4 on right side.
// Then put 4 in the middle/correct position.

// Start: storeIndex = 0

// i = 0, nums[i] = 3
// 3 <= 4 yes
// swap nums[0] with nums[storeIndex 0]
// array stays [3, 2, 1, 5, 6, 4]
// storeIndex = 1

// i = 1, nums[i] = 2
// 2 <= 4 yes
// swap nums[1] with nums[storeIndex 1]
// array stays [3, 2, 1, 5, 6, 4]
// storeIndex = 2

// i = 2, nums[i] = 1
// 1 <= 4 yes
// swap nums[2] with nums[storeIndex 2]
// array stays [3, 2, 1, 5, 6, 4]
// storeIndex = 3

// i = 3, nums[i] = 5
// 5 <= 4 no
// do nothing

// i = 4, nums[i] = 6
// 6 <= 4 no
// do nothing

// Now put pivot 4 at storeIndex.
// nums[storeIndex] with nums[right]
// nums[3] with nums[5]

// Before - [3, 2, 1, 5, 6, 4]
// After - [3, 2, 1, 4, 6, 5]
// Now pivot 4 is at index 3.

// pivotIndex = 3
// targetIndex = 4
// pivotIndex < targetIndex

// our answer is on the right side. Search only: [6,5]

// left = pivotIndex + 1 = 4
// right = 5

// Second partition:
// nums = [3, 2, 1, 4, 6, 5]
// left = 4
// right = 5
// pivot = nums[5] = 5
// storeIndex = 4

// i = 4, nums[i] = 6
// 6 <= 5 no
// do nothing

// Now place pivot at storeIndex. nums[4] with nums[5]

// Before: [3, 2, 1, 4, 6, 5]
// After: [3, 2, 1, 4, 5, 6]

// Pivot 5 is now at index 4.
// answer
