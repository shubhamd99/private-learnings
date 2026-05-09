// https://leetcode.com/problems/missing-number/description/

// Given an array nums containing n distinct numbers in the range [0, n],
// return the only number in the range that is missing from the array.

// Input: nums = [3,0,1]
// Output: 2
// Explanation:
// n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

// Cyclic Sort is a pattern used when an array contains numbers in a known range
// Cyclic sort places each number where it belongs by using the number itself as an index.

// It solves many problems in O(n) time and O(1) space where numbers are in a range.

/*
Logic:
Numbers are from 0 to n.
Array length is n, so one number is missing.

In cyclic sort, we put each number at its correct index.

For this problem:
number x should be at index x.

Example:
0 should be at index 0
1 should be at index 1
2 should be at index 2

But number n cannot be placed because array indices go only from 0 to n - 1.
So if nums[i] === nums.length, we skip it.

After placing numbers:
If nums[i] !== i, then i is the missing number.

If all indexes are correct, then missing number is n.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;

  while (i < nums.length) {
    const correctIndex = nums[i];

    // Only place numbers that have a valid index.
    if (nums[i] < nums.length && nums[i] !== nums[correctIndex]) {
      //   const temp = nums[i];
      //   nums[i] = nums[correctIndex];
      //   nums[correctIndex] = temp;
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]; // destructuring creates a tiny temporary array internally, but for LeetCode/interview Big-O it’s still treated as O(1).
    } else {
      i++;
    }
  }

  for (let index = 0; index < nums.length; index++) {
    if (nums[index] !== index) {
      return index;
    }
  }

  return nums.length;
};

// Math / Sum Formula pattern.
// missing number = expected sum - actual sum

/*
Logic:
Numbers should be from 0 to n.
One number is missing.

Expected sum of 0 to n is:
n * (n + 1) / 2

Actual sum is sum of all numbers in nums.

Missing number = expected sum - actual sum
*/

// Time: O(n)
// Space: O(1)
var missingNumber = function (nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;

  let actual = 0;

  for (const num of nums) {
    actual += num;
  }

  return expected - actual;
};
