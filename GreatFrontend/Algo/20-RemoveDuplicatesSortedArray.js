// Remove Duplicates from Sorted Array
// Remove duplicates in-place from a sorted array.
// Return the number of unique elements (k). First k elements must hold unique values.
//
// Input:  [1, 1, 2, 3, 3, 4]
// Output: k = 4, array = [1, 2, 3, 4, _, _]   (first 4 elements are unique)
//
// Input:  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
// Output: k = 5, array = [0, 1, 2, 3, 4, _, _, _, _, _]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: two pointers — slow (write position) and fast (reader).
// Since array is sorted, duplicates are adjacent.
// Advance fast pointer; when a new unique value is found, write it at slow+1.

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // points to last written unique element

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++; // move write head forward
      nums[slow] = nums[fast]; // write new unique value
    }
  }

  return slow + 1; // number of unique elements
}

// Example
const nums = [1, 1, 2, 3, 3, 4];
const k = removeDuplicates(nums);
console.log(k); // 4
console.log(nums.slice(0, k)); // [1, 2, 3, 4]

// Time: O(n)
// Space: O(1) — in-place
