// HARD
// Given an integer array nums, return an integer array counts where
// counts[i] is the number of smaller elements to the right of nums[i].

// Input: nums = [5,2,6,1]
// Output: [2,1,1,0]
// Explanation:
// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.

// Input: nums = [-1]
// Output: [0]
// Input: nums = [-1,-1]
// Output: [0,0]

// For accepted optimal solutions, use:
// Merge Sort
// Fenwick Tree
// Segment Tree

// Divide and Conquer / Merge Sort
// Quick Sort partitions first, then sorts parts.
// Merge Sort sorts parts first, then merges them.

/*
Logic:
Use modified merge sort. We need count of smaller numbers after each index.

During merge sort:
left half contains earlier indexes.
right half contains later indexes.

If a number from the right half is smaller than a number from the left half,
then it counts as a smaller number after that left number.

Because sorting changes positions, we store:
[value, originalIndex]

Example:
nums = [5, 2, 6, 1]

pairs:
[ [5,0], [2,1], [6,2], [1,3] ]

answer starts:
[0, 0, 0, 0]

During merge:
rightSmallerCount tells how many right-side numbers
have already moved before a left-side number.

When placing a left-side number into merged array:
answer[originalIndex] += rightSmallerCount
*/

// Time: O(n log n)
// Space: O(n)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  const result = new Array(nums.length).fill(0);

  const pairs = nums.map((num, index) => [num, index]);

  mergeSort(pairs, 0, pairs.length - 1, result);

  return result;
};

function mergeSort(pairs, left, right, result) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(pairs, left, mid, result);
  mergeSort(pairs, mid + 1, right, result);

  merge(pairs, left, mid, right, result);
}

function merge(pairs, left, mid, right, result) {
  const temp = [];

  let i = left;
  let j = mid + 1;

  let rightSmallerCount = 0;

  while (i <= mid && j <= right) {
    if (pairs[j][0] < pairs[i][0]) {
      // Right-side value is smaller than left-side value.
      // It moved before left-side values, so count it.
      rightSmallerCount++;
      temp.push(pairs[j]);
      j++;
    } else {
      // All right-side smaller values already moved before this left value.
      const originalIndex = pairs[i][1];
      result[originalIndex] += rightSmallerCount;

      temp.push(pairs[i]);
      i++;
    }
  }

  while (i <= mid) {
    const originalIndex = pairs[i][1];
    result[originalIndex] += rightSmallerCount;

    temp.push(pairs[i]);
    i++;
  }

  while (j <= right) {
    temp.push(pairs[j]);
    j++;
  }

  for (let k = 0; k < temp.length; k++) {
    pairs[left + k] = temp[k];
  }
}
