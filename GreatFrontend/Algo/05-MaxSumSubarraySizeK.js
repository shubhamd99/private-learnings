// Maximum Sum Subarray of Size K
// Find the maximum sum of any contiguous subarray of size k.
//
// Input:  nums = [2, 1, 5, 1, 3, 2], k = 3
// Output: 9   → subarray [5, 1, 3]
//
// Input:  nums = [2, 3, 4, 1, 5], k = 2
// Output: 7   → subarray [3, 4]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: fixed-size sliding window.
// Build the first window of size k, then slide: add right element, remove left element.
// Track the maximum sum seen.

function maxSumSubarray(nums, k) {
  let windowSum = 0;
  let maxSum = 0;

  // build first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  maxSum = windowSum;

  // slide window: add next element, drop leftmost element
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // slide in O(1)
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Examples
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2)); // 7 (3+4)

// Time: O(n) — single pass after initial window
// Space: O(1)
