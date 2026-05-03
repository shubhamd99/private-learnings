// https://leetcode.com/problems/maximum-product-subarray/description/

// Given an integer array nums, find a subarray that has the largest product, and return the product.
// Note that the product of an array with a single element is the value of that element.

// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] 2 x 3 has the largest product 6.

/*
Logic:
This is similar to Kadane's algorithm, but for product.

For sum, we only track the maximum sum ending at current index.
For product, we must track both:
1. maxProduct = biggest product ending at current index
2. minProduct = smallest product ending at current index

Why track minProduct?
Because a negative number can turn the smallest negative product into the biggest positive product.

Example:
-10 * -2 = 20

At every number, we have three choices:
1. Start new subarray from current number
2. Multiply current number with previous maxProduct
3. Multiply current number with previous minProduct

Take the max of these for new maxProduct.
Take the min of these for new minProduct.

Update answer with maxProduct.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxProduct = nums[0];
  let minProduct = nums[0];
  let answer = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    const tempMax = maxProduct;

    // Biggest product ending at current index.
    maxProduct = Math.max(num, num * maxProduct, num * minProduct);

    // Smallest product ending at current index.
    // Use tempMax because maxProduct was already updated above.
    minProduct = Math.min(num, num * tempMax, num * minProduct);

    answer = Math.max(answer, maxProduct);
  }

  return answer;
};
