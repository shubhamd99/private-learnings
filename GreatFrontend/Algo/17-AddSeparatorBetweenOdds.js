// Add Separator Between Odd Numbers
// Given an array of numbers and a separator value,
// insert the separator between every pair of adjacent odd numbers.
//
// Input:  nums = [1, 3, 2, 5, 7], separator = 0
// Output: [1, 0, 3, 2, 5, 0, 7]   → 0 inserted between (1,3) and (5,7)
//
// Input:  nums = [2, 4, 6], separator = 0
// Output: [2, 4, 6]   → no odd pairs, nothing inserted

// ---- SIMPLE VERSION (for interviews) ----
// Idea: iterate the array, always push the current element.
// Before pushing, check if both the previous and current elements are odd —
// if so, push the separator first.

function addSeparator(nums, separator) {
  if (nums.length === 0) return [];

  const result = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    const prev = nums[i - 1];
    const curr = nums[i];

    // insert separator between two adjacent odd numbers
    if (prev % 2 !== 0 && curr % 2 !== 0) {
      result.push(separator);
    }

    result.push(curr);
  }

  return result;
}

// Examples
console.log(addSeparator([1, 3, 2, 5, 7], 0)); // [1, 0, 3, 2, 5, 0, 7]
console.log(addSeparator([2, 4, 6], 0)); // [2, 4, 6] (no odd pairs)
console.log(addSeparator([1, 3, 5], "-")); // [1, "-", 3, "-", 5]

// Time: O(n)
// Space: O(n)
