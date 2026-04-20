// Two Sum — All Variations
// Given an array of numbers and a target, find two numbers that add up to the target.
//
// Input:  nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]   → nums[0] + nums[1] = 2 + 7 = 9

// ---- VARIATION 1: Indices (unsorted array) ----
// Idea: store each number's index in a Map as we iterate.

// If you have a Target and you are currently looking at a number (Current), the complement is simply:
// Complement = Target - Current

function twoSum(nums, target) {
  const map = new Map(); // key -> value : value -> index

  for (let i = 0; i < nums.length; i++) {
    const remainder = target - nums[i];
    if (map.has(remainder)) {
      return [map.get(remainder), i];
    }
    map.set(nums[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
// ---- VARIATION 2: Two pointers algo (sorted array) ----
// Idea: left and right pointers. If sum < target move left right, else move right left.

// The problem statement for Two Sum II specifically says:
// "Return the indices of the two numbers... as an integer array [index1, index2] of length 2, where ."
// return [left + 1, right + 1]; instead of return [left, right];

function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]

// ---- VARIATION 3: All pairs (duplicates allowed) ----
// Idea: same Map approach but collect all valid pairs instead of returning first.

function twoSumAllPairs(nums, target) {
  const map = new Map();
  const result = [];

  for (const num of nums) {
    const remainder = target - num;
    if (map.has(remainder)) {
      result.push([remainder, num]);
    }

    map.set(num, (map.get(num) || 0) + 1); // track frequency for duplicates
  }

  return result;
}

console.log("twoSumAllPairs", twoSumAllPairs([1, 2, 3, 4, 3], 6)); // [[2,4],[3,3]]

// ---- SLIDING WINDOW / FREQUENCY COUNTER PATTERN ----
// Dynamic Sliding Window pattern.
// Idea: use a frequency Map to count chars/numbers in a window.
// Expand right, update freq. When window condition breaks, shrink from left.

// Example: find length of longest subarray with sum <= k
// https://leetcode.com/problems/subarray-sum-equals-k/
function longestSubarrayWithSumAtMostK(nums, k) {
  let left = 0,
    sum = 0,
    max = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > k) {
      sum -= nums[left];
      left++;
    }
    max = Math.max(max, right - left + 1);
  }

  return max;
}

// Time: O(n) for all variations above

// Maximum subarray - Kadane's Algo
// Time - O(n)
// Space - O(1)
// https://leetcode.com/problems/maximum-subarray/submissions/1983842522/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // We initialize with the first number because the sum could be negative
  let currentSum = nums[0];
  let maxSum = nums[0];

  // Start loop from the second element (index 1)
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // KADANE'S STRATEGY:
    // Do I add current number to the existing sum?
    // Or is the current number better off on its own?
    currentSum = Math.max(num, currentSum + num);

    // Keep track of the best sum we've ever seen
    maxSum = Math.max(currentSum, maxSum);
  }

  return maxSum;
};
