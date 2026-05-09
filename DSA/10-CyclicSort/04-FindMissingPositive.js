// https://leetcode.com/problems/first-missing-positive/description/ - HARD

// Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums.
// You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

// Input: nums = [1,2,0]
// Output: 3
// Explanation: The numbers in the range [1,2] are all in the array.

// Input: nums = [3,4,-1,1]
// Output: 2
// Explanation: 1 is in the array but 2 is missing.

// Input: nums = [7,8,9,11,12]
// Output: 1
// Explanation: The smallest positive integer 1 is missing.

/*
Logic:
We need the smallest missing positive number.

Positive numbers start from:
1, 2, 3, 4...

For length n, the answer must be between 1 and n + 1.

Why?
If array contains 1 to n, then missing number is n + 1.

Use cyclic sort:
Put each useful number in its correct index.

number x should be at index x - 1

Examples:
1 should be at index 0
2 should be at index 1
3 should be at index 2

Ignore numbers:
- less than or equal to 0
- greater than nums.length

Because they cannot be the first missing positive in range 1 to n.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let i = 0;

  while (i < nums.length) {
    const correctIndex = nums[i] - 1;

    // Input can have invalid values, Need check for 1 to n.
    if (
      nums[i] > 0 &&
      nums[i] < nums.length &&
      nums[i] !== nums[correctIndex]
    ) {
      let temp = nums[i];
      nums[i] = nums[correctIndex];
      nums[correctIndex] = temp;
    } else {
      i++;
    }
  }

  for (let index = 0; index < nums.length; index++) {
    // Because after sorting, index i should contain i + 1, so if it doesn’t, i + 1 is the missing positive.
    if (nums[index] !== index + 1) {
      return index + 1;
    }
  }

  // Because if every index has the correct value 1 to n, then the smallest missing positive is the next number: n + 1.
  return nums.length + 1;
};
