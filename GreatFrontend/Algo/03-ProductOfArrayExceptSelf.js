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

// Time: O(n) — two linear passes
// Space: O(1) extra — output array doesn't count
// Excluding the output array (which is required by the problem return type),
// we only use a constant amount of extra space for the leftProduct and rightProduct variables.
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = (nums) => {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // First Pass: Calculate prefix products (left side)
  // At each index, result[i] will contain the product of all numbers to the left
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Second Pass: Calculate suffix products (right side) and multiply
  // Multiply the existing left product (in result[i]) by the suffix product
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
};

// The logic relies on a clever mathematical observation:
// the product of everything except nums[i]
// is simply (everything to the left of i)
// multiplied by (everything to the right of i).

// Since we aren't allowed to use division (which would be the "easy" way: total product / nums[i]),
// we calculate these two sides separately.

/**
 * Let's explain the logic step-by-step using an example: [1, 2, 3, 4]
 *
 * CORE IDEA:
 * For any index 'i', the answer is: (Product of everything LEFT of i) * (Product of everything RIGHT of i)
 * The Sum: 2 + 3 + 4 = 9;
 * The Product: 2 x 3 x 4 = 24
 */

// --- PHASE 1: THE FORWARD PASS (LEFT PRODUCTS) ---
// We walk forward and store the product of all elements to the LEFT of 'i'.

// i = 0: result[0] = 1 (nothing to the left)     -> leftProduct becomes 1 * nums[0] (1)
// i = 1: result[1] = 1 (left is 1)               -> leftProduct becomes 1 * nums[1] (2)
// i = 2: result[2] = 2 (left is 1*2)             -> leftProduct becomes 2 * nums[2] (6)
// i = 3: result[3] = 6 (left is 1*2*3)           -> leftProduct becomes 6 * nums[3] (24)

// After this loop, result = [1, 1, 2, 6]

// --- PHASE 2: THE BACKWARD PASS (RIGHT PRODUCTS) ---
// We walk backward. We take the "Left Product" already in result[i]
// and multiply it by a running "Right Product".

// i = 3: result[3] (6) * rightProduct (1)  = 6   -> rightProduct becomes 1 * nums[3] (4)
// i = 2: result[2] (2) * rightProduct (4)  = 8   -> rightProduct becomes 4 * nums[2] (12)
// i = 1: result[1] (1) * rightProduct (12) = 12  -> rightProduct becomes 12 * nums[1] (24)
// i = 0: result[0] (1) * rightProduct (24) = 24  -> rightProduct becomes 24 * nums[0] (24)

// Final result = [24, 12, 8, 6]
