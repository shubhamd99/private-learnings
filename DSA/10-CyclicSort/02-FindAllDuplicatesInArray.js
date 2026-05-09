// https://leetcode.com/problems/find-all-duplicates-in-an-array/description/

// Given an integer array nums of length n where all the integers of nums are in the range [1, n] and
// each integer appears at most twice, return an array of all the integers that appears twice.

// You must write an algorithm that runs in O(n) time and uses only constant auxiliary space,
// excluding the space needed to store the output

// Input: nums = [4,3,2,7,8,2,3,1]
// Output: [2,3]
// Input: nums = [1]
// Output: []

/*
Logic:
Numbers are from 1 to n.

So each number has a correct position:
number 1 should be at index 0
number 2 should be at index 1
number 3 should be at index 2

In general:
number x should be at index x - 1

We use cyclic sort:
Try to put every number at its correct index.

If nums[i] is not at its correct position,
swap it with the number at its correct position.

If the correct position already has the same number,
then this number is duplicate, so we move forward.

After placement:
If index i does not contain i + 1,
then nums[i] is a duplicate.
*/

// nums = [4,3,2,7,8,2,3,1]
// After cyclic sort, it can become:
// [1,2,3,4,3,2,7,8]

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  let i = 0;

  while (i < nums.length) {
    // For this problem, numbers are from 1 to n. So number 1 belongs at index 0, number 2 belongs at index 1, etc.
    let correctIndex = nums[i] - 1;

    // For Find All Duplicates, values are guaranteed from 1 to n, so every value has a valid index, So you don’t need the valid-index check.
    if (nums[i] !== nums[correctIndex]) {
      let temp = nums[i];
      nums[i] = nums[correctIndex];
      nums[correctIndex] = temp;
    } else {
      i++;
    }
  }

  const duplicates = [];

  for (let index = 0; index < nums.length; index++) {
    // After cyclic sort, every number should be at its correct index:
    // nums[index] should be index + 1. Because numbers are from 1 to n.
    // index 0 should have 1, index 1 should have 2
    if (nums[index] !== index + 1) {
      duplicates.push(nums[index]);
    }
  }

  return duplicates;
};
