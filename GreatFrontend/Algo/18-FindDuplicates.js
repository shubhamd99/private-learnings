// Find Duplicate Numbers in Array
// Given an array of numbers, return all elements that appear more than once.
//
// Input:  [4, 3, 2, 7, 8, 2, 3, 1]
// Output: [2, 3]
//
// Input:  [1, 1, 2]
// Output: [1]
//
// Input:  [1, 2, 3]
// Output: []   → no duplicates

// ---- SIMPLE VERSION (for interviews) ----
// Idea: frequency map pass to count occurrences.
// Then collect all keys whose count > 1.

function findDuplicates(nums) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const result = [];
  for (const [num, count] of freq) {
    if (count > 1) result.push(num);
  }

  return result;
}

// Examples
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2, 3]
console.log(findDuplicates([1, 1, 2])); // [1]
console.log(findDuplicates([1, 2, 3])); // []

// ---- VARIATION: using a Set (only first duplicate occurrence) ----
function findDuplicatesSet(nums) {
  const seen = new Set();
  const dupes = new Set();

  for (const num of nums) {
    if (seen.has(num)) dupes.add(num);
    else seen.add(num);
  }

  return [...dupes];
}

// Time: O(n)
// Space: O(n)
