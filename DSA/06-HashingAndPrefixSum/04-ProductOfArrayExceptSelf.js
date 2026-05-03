// https://leetcode.com/problems/product-of-array-except-self/description/

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// You must write an algorithm that runs in O(n) time and without using the division operation.

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

// If division was allowed
// total product of all numbers / current number
// nums = [1,2,3,4]
// 1 * 2 * 3 * 4 = 24
// for 1 -> 24 / 1 = 24
// for 2 -> 24 / 2 = 12
// for 3 -> 24 / 3 = 8
// for 4 -> 24 / 4 = 6

/*
Logic:
We need answer[i] = product of all numbers except nums[i].
But we cannot use division.

So for every index:
answer[i] = product of numbers before i * product of numbers after i

Example:
nums = [1, 2, 3, 4]

For nums[2] = 3:
numbers before it = 1 * 2 = 2
numbers after it = 4
answer[2] = 2 * 4 = 8

We do this in two passes:

1. Left pass:
Store product of all numbers before each index in answer.

After left pass:
answer = [1, 1, 2, 6]

Meaning:
before index 0: nothing, so 1
before index 1: 1
before index 2: 1 * 2
before index 3: 1 * 2 * 3

2. Right pass:
Move from right to left.
Keep rightProduct = product of all numbers after current index.
Multiply answer[i] by rightProduct.

This gives product before i * product after i.
*/

// Time: O(n)
// Extra space: O(1) if output array is not counted
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const answer = new Array(nums.length);

  let leftProduct = 1;

  for (let i = 0; i < nums.length; i++) {
    // Store product of all numbers before index i.
    answer[i] = leftProduct;

    // Update leftProduct to include current number for next index.
    answer[i] *= nums[i];
  }

  let rightProduct = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    // Multiply by product of all numbers after index i.
    answer[i] *= rightProduct;

    // Update rightProduct to include current number for previous index.
    rightProduct *= nums[i];
  }

  return answer;
};
