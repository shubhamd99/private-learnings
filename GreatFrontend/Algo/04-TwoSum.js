// Two Sum — All Variations
// Given an array of numbers and a target, find two numbers that add up to the target.
//
// Input:  nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]   → nums[0] + nums[1] = 2 + 7 = 9

// ---- VARIATION 1: Indices (unsorted array) ----
// Idea: store each number's index in a Map as we iterate.
// For each num, check if (target - num) already exists in the Map.

function twoSum(nums, target) {
  const map = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

// ---- VARIATION 2: Two pointers (sorted array) ----
// Idea: left and right pointers. If sum < target move left right, else move right left.

function twoSumSorted(nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
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
    const complement = target - num;
    if (map.has(complement)) result.push([complement, num]);
    map.set(num, (map.get(num) || 0) + 1); // track frequency for duplicates
  }

  return result;
}

console.log(twoSumAllPairs([1, 2, 3, 4, 3], 6)); // [[2,4],[3,3]]

// ---- SLIDING WINDOW / FREQUENCY COUNTER PATTERN ----
// Idea: use a frequency Map to count chars/numbers in a window.
// Expand right, update freq. When window condition breaks, shrink from left.

// Example: find length of longest subarray with sum <= k
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
