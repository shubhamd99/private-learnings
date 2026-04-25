// https://leetcode.com/problems/container-with-most-water/

// Time: O(n) — single pass with two pointers shrinking the window from both ends
// Space: O(1) — only a fixed number of variables regardless of input size

// Area = height * width
// Height = left height - right height
// Width = right - left

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    maxArea = Math.max(maxArea, h * w);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
};
