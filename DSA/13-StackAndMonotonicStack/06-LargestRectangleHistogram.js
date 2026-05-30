// https://leetcode.com/problems/largest-rectangle-in-histogram/description/

// Given an array of integers heights representing the histogram's bar
// height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

// Input: heights = [2,1,5,6,2,3]
// Output: 10
// Explanation: The above is a histogram where width of each bar is 1.
// The largest rectangle is shown in the red area, which has an area = 10 units.

/*
Logic: Use a monotonic increasing stack.

Stack stores indexes of bars.
Heights in stack are increasing.

Why increasing?
When we find a smaller height, it means previous taller bars cannot continue to the right anymore.
So we pop them and calculate rectangle area.

For each popped bar:
height = heights[poppedIndex]

Right boundary is current index - 1.
Left boundary is stack top after popping.

Width:
if stack is empty:
  width = current index
else:
  width = current index - stackTop - 1

Area = height * width

We add a 0 at the end to force all remaining bars to be processed.
*/

// Time: O(n)
// Space: O(n)
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const stack = [];
  let maxArea = 0;

  heights.push(0);

  for (let i = 0; i < heights.length; i++) {
    // If current height is smaller than stack top height, pop and calculate area
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const poppedIndex = stack.pop();
      const height = heights[poppedIndex];

      // Because the stack top after popping is the index of the previous smaller bar,
      // and current i is the index of the next smaller bar.
      // Why -1? Because both boundary bars are excluded.
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  heights.pop();

  return maxArea;
};

// heights = [2, 1, 5, 6, 2, 3]

// We add sentinel 0 at end:
// heights = [2, 1, 5, 6, 2, 3, 0]

// stack stores indexes
// Stack keeps heights in increasing order
// maxArea = 0

// --------------------------------------------------
// i = 0, height = 2

// stack is empty.
// Push index 0.

// stack indexes = [0]
// stack heights = [2]

// maxArea = 0

// --------------------------------------------------
// i = 1, height = 1

// Current height 1 is smaller than stack top height 2.

// Pop index 0:
// height = 2

// After popping, stack is empty.

// Width:
// stack empty, so width = i = 1

// Area:
// height * width = 2 * 1 = 2

// maxArea = 2

// Now push index 1.

// stack indexes = [1]
// stack heights = [1]

// --------------------------------------------------
// i = 2, height = 5

// Current height 5 is not smaller than stack top height 1.
// Push index 2.

// stack indexes = [1, 2]
// stack heights = [1, 5]

// maxArea = 2

// --------------------------------------------------
// i = 3, height = 6

// Current height 6 is not smaller than stack top height 5.
// Push index 3.

// stack indexes = [1, 2, 3]
// stack heights = [1, 5, 6]

// maxArea = 2

// --------------------------------------------------
// i = 4, height = 2

// Current height 2 is smaller than stack top height 6.
// So pop and calculate area.

// Pop index 3:
// height = 6

// After popping:
// stack indexes = [1, 2]
// stack top index = 2

// Width:
// i - stackTop - 1
// = 4 - 2 - 1
// = 1

// Area:
// 6 * 1 = 6

// maxArea = 6

// Now compare current height 2 with new stack top height 5.

// 2 is smaller than 5.
// Pop index 2:
// height = 5

// After popping:
// stack indexes = [1]
// stack top index = 1

// Width:
// i - stackTop - 1
// = 4 - 1 - 1
// = 2

// Area:
// 5 * 2 = 10

// maxArea = 10

// Now compare current height 2 with new stack top height 1.

// 2 < 1? no.

// Push index 4.

// stack indexes = [1, 4]
// stack heights = [1, 2]

// maxArea = 10

// --------------------------------------------------
// i = 5, height = 3

// Current height 3 is not smaller than stack top height 2.
// Push index 5.

// stack indexes = [1, 4, 5]
// stack heights = [1, 2, 3]

// maxArea = 10

// --------------------------------------------------
// i = 6, height = 0

// Sentinel 0 forces all remaining bars to pop.

// Current height 0 is smaller than stack top height 3.
// Pop index 5:
// height = 3

// After popping:
// stack indexes = [1, 4]
// stack top index = 4

// Width:
// i - stackTop - 1
// = 6 - 4 - 1
// = 1

// Area:
// 3 * 1 = 3

// maxArea stays 10

// Now compare 0 with stack top height 2.

// 0 is smaller than 2.
// Pop index 4:
// height = 2

// After popping:
// stack indexes = [1]
// stack top index = 1

// Width:
// i - stackTop - 1
// = 6 - 1 - 1
// = 4

// Area:
// 2 * 4 = 8

// maxArea stays 10

// Now compare 0 with stack top height 1.

// 0 is smaller than 1.
// Pop index 1:
// height = 1

// After popping:
// stack is empty.

// Width:
// stack empty, so width = i = 6

// Area:
// 1 * 6 = 6

// maxArea stays 10

// Push index 6.

// stack indexes = [6]
// stack heights = [0]

// --------------------------------------------------

// End.

// Remove sentinel 0.

// Final maxArea = 10
