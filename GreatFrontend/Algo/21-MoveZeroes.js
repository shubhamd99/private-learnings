// Move Zeroes
// Move all 0s to the end of the array while maintaining the relative order of non-zero elements.
// Must be done in-place.
//
// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
//
// Input:  [0, 0, 1]
// Output: [1, 0, 0]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: two pointers — slow tracks the next position to write a non-zero.
// Fast scans through the array; when a non-zero is found, write it at slow, advance slow.
// After the loop, fill the rest with zeros.

function moveZeroes(nums) {
  let slow = 0; // next write position for non-zero elements

  // pass 1: move all non-zeros to the front (preserving order)
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // pass 2: fill remaining positions with 0
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// Example
const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); // [1, 3, 12, 0, 0]

// Time: O(n)
// Space: O(1) — in-place
