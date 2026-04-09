// Maximum Subarray (Kadane's Algorithm)
// Find the contiguous subarray with the largest sum.
//
// Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6   → subarray [4, -1, 2, 1]
//
// Input:  [-1, -2, -3]
// Output: -1  → single element (must pick at least one)

// ---- SIMPLE VERSION (for interviews) ----
// Idea: Kadane's algorithm.
// At each position, decide: extend the current subarray or start fresh from here.
// current = max(num, current + num) — start fresh if current sum has gone negative.
// Track the global maximum.

function maxSubArray(nums) {
  let current = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // either extend existing subarray or start new one at i
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }

  return max;
}

// Examples
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 ([4,-1,2,1])
console.log(maxSubArray([1])); // 1
console.log(maxSubArray([-1, -2, -3])); // -1

// Why start fresh? If current sum is negative, adding it to the next number
// only makes things worse — better to start a new subarray from that number.

// Time: O(n)
// Space: O(1)
