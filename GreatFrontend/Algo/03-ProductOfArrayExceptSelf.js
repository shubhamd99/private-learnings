// Product of Array Except Self
// Return an array where output[i] is the product of all elements except nums[i].
// Must run in O(n) without using division.
//
// Input:  [1, 2, 3, 4]
// Output: [24, 12, 8, 6]
//   → output[0] = 2*3*4=24, output[1] = 1*3*4=12, output[2] = 1*2*4=8, output[3] = 1*2*3=6

// ---- SIMPLE VERSION (for interviews) ----
// Idea: two passes — prefix and suffix products.
// Pass 1 (left to right): result[i] = product of all elements to the LEFT of i.
// Pass 2 (right to left): multiply result[i] by product of all elements to the RIGHT of i.

function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  // prefix pass: result[i] holds product of everything left of i
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // suffix pass: multiply in product of everything right of i
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}

// Example
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]

// Time: O(n) — two linear passes
// Space: O(1) extra — output array doesn't count
