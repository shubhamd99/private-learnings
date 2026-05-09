// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/

// Given an array nums of n integers where nums[i] is in the range [1, n],
// return an array of all the integers in the range [1, n] that do not appear in nums.

// Input: nums = [4,3,2,7,8,2,3,1]
// Output: [5,6]

// Input: nums = [1,1]
// Output: [2]

/*
Logic:
Numbers are from 1 to n.

So every number has a correct index:
1 should be at index 0
2 should be at index 1
3 should be at index 2

In general:
number x should be at index x - 1

We use cyclic sort to place numbers at their correct indexes.

After placement:
If nums[index] !== index + 1,
then index + 1 is missing.

Why index + 1?
Because that is the number that should have been at this index.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  let i = 0;

  while (i < nums.length) {
    // For this problem, numbers are from 1 to n. So number 1 belongs at index 0, number 2 belongs at index 1, etc.
    let correctIndex = nums[i] - 1;

    if (nums[i] !== nums[correctIndex]) {
      let temp = nums[i];
      nums[i] = nums[correctIndex];
      nums[correctIndex] = temp;
    } else {
      i++;
    }
  }

  const missing = [];

  for (let index = 0; index < nums.length; index++) {
    // If the number at this index is not the number that should be here,
    // then the expected number is missing.
    if (nums[index] !== index + 1) {
      missing.push(index + 1);
    }
  }

  return missing;
};
