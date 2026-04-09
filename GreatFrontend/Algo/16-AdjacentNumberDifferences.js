// Adjacent Number Differences
// Given an array of numbers, return a new array of absolute differences
// between each pair of adjacent elements.
//
// Input:  [1, 3, 6, 2, 9]
// Output: [2, 3, 4, 7]   → |3-1|=2, |6-3|=3, |2-6|=4, |9-2|=7
//
// Input:  [5, 5, 5]
// Output: [0, 0]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: iterate from index 1, compute Math.abs(nums[i] - nums[i-1]) for each pair.

function adjacentDifferences(nums) {
  const result = [];

  for (let i = 1; i < nums.length; i++) {
    result.push(Math.abs(nums[i] - nums[i - 1]));
  }

  return result;
}

// Examples
console.log(adjacentDifferences([1, 3, 6, 2, 9])); // [2, 3, 4, 7]
console.log(adjacentDifferences([5, 5, 5])); // [0, 0]
console.log(adjacentDifferences([1])); // []

// Time: O(n)
// Space: O(n)
