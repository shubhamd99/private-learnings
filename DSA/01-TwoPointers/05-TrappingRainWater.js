// https://leetcode.com/problems/trapping-rain-water/

// Time: O(n) — single pass where each element is visited at most once by either pointer
// Space: O(1) — only four variables (left, right, maxLeft, maxRight) used

// The amount of water trapped on any specific bar is always:
// Water = (The Water Level) - (The Floor Height)
// The Floor Height is simply height[left] or height[right].
// The Water Level is determined by the shorter of the two boundaries
// (the tallest wall to the left and the tallest wall to the right).

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;

  // Track the highest elevation seen from both sides
  let maxLeft = height[left];
  let maxRight = height[right];

  let totalWater = 0;

  while (left < right) {
    // We know the water level is bound by the smaller of the two max heights
    if (maxLeft < maxRight) {
      left++;
      maxLeft = Math.max(maxLeft, height[left]); // Update the max height seen so far on the left
      totalWater += maxLeft - height[left]; // Add trapped water
    } else {
      right--;
      maxRight = Math.max(maxRight, height[right]); // Update the max height seen so far on the right
      totalWater += maxRight - height[right]; // Add trapped water
    }
  }

  return totalWater;
};
