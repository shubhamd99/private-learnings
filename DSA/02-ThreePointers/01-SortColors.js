// https://leetcode.com/problems/sort-colors/

// The array only has three values: 0, 1, and 2. The goal is to sort them in place.
// [0...low-1] [low...mid-1] [mid...high] [high+1...end]
//   all 0s       all 1s      unseen        all 2s

// nums[mid] === 0: This 0 belongs at the front. Swap it with nums[low]. Move both low and mid forward
// We move mid forward too because we know the value that was at low before the swap was a 1, so after the swap mid is sitting on a 1 which is already correct.

// nums[mid] === 1: Already in the right region. Just move mid forward.

// nums[mid] === 2: This 2 belongs at the end. Swap it with nums[high]
// Move high backward, Do not move mid forward because the value that just came from high is unknown and unseen

// Why mid <= high as the condition
// Once mid crosses high, the unseen region is empty. Every element has been placed in its correct region so you stop

// Time Complexity - O(n) Single Pass
// Space Complexity - O(1) In place

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (mid === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
};
