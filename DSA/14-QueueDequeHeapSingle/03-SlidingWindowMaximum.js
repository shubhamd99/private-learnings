// https://leetcode.com/problems/sliding-window-maximum/description/

// You are given an array of integers nums,
// there is a sliding window of size k which is moving from the very left of the array to the very right.
// You can only see the k numbers in the window.
// Each time the sliding window moves right by one position.
// Return the max sliding window.

// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation:
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

/*
Logic: Use a monotonic deque. Monotonic means values move in only one direction:

Deque stores indexes, not values.

Why indexes?
Because we need to know if an element is outside the current window.

The deque keeps values in decreasing order:
nums[deque front] is always the maximum.

For every index i:
1. Remove front index if it is outside the current window.
2. Remove indexes from back while nums[back] is smaller than nums[i].
   Those smaller values are useless because current value is bigger and newer.
3. Push current index.
4. When window size reaches k, add nums[front] to result.
*/

import Deque from "./00-Deque";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const deque = new Deque();
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indexes that are outside current window.
    // Current window starts at i - k + 1.
    if (!deque.isEmpty() && deque.front() <= i - k) {
      deque.popFront();
    }

    // Maintain decreasing order in deque.
    // Remove smaller values from back.
    while (!deque.isEmpty() && nums[deque.back()] < nums[i]) {
      deque.popBack();
    }

    // Add current index.
    deque.pushBack(i);

    // First full window ends at index k - 1.
    if (i >= k - 1) {
      result.push(nums[deque.front()]);
    }
  }

  return result;
};

// nums = [1, 3, -1, -3, 5, 3, 6, 7]
// k = 3

// Important:
// Deque stores indexes, not values.

// nums[deque.front()] is always the max of current window.

// Window becomes full when i >= k - 1, meaning i >= 2.

// --------------------------------------------------
// i = 0, nums[i] = 1

// Remove outside window:
// i - k = 0 - 3 = -3
// deque empty, nothing remove.

// Remove smaller from back:
// deque empty, nothing remove.

// Push index 0:
// deque indexes = [0]
// deque values  = [1]

// Window not full yet.
// result = []

// --------------------------------------------------
// i = 1, nums[i] = 3

// Remove outside window:
// i - k = 1 - 3 = -2
// front index 0 <= -2? no.

// Remove smaller from back:
// nums[deque.back()] = nums[0] = 1
// 1 < 3, remove index 0.

// deque empty.

// Push index 1:
// deque indexes = [1]
// deque values  = [3]

// Window not full yet.
// result = []

// --------------------------------------------------
// i = 2, nums[i] = -1

// Remove outside window:
// i - k = 2 - 3 = -1
// front index 1 <= -1? no.

// Remove smaller from back:
// nums[deque.back()] = nums[1] = 3
// 3 < -1? no.

// Push index 2:
// deque indexes = [1, 2]
// deque values  = [3, -1]

// Window is full: indexes [0, 1, 2]
// Max is nums[deque.front()] = nums[1] = 3

// result = [3]

// --------------------------------------------------
// i = 3, nums[i] = -3

// Remove outside window:
// i - k = 3 - 3 = 0
// front index 1 <= 0? no.

// Remove smaller from back:
// nums[deque.back()] = nums[2] = -1
// -1 < -3? no.

// Push index 3:
// deque indexes = [1, 2, 3]
// deque values  = [3, -1, -3]

// Window is indexes [1, 2, 3]
// Max = nums[1] = 3

// result = [3, 3]

// --------------------------------------------------
// i = 4, nums[i] = 5

// Remove outside window:
// i - k = 4 - 3 = 1
// front index 1 <= 1? yes.
// Remove index 1.

// deque indexes = [2, 3]
// deque values  = [-1, -3]

// Remove smaller from back:
// nums[3] = -3 < 5, remove index 3.
// nums[2] = -1 < 5, remove index 2.

// deque empty.

// Push index 4:
// deque indexes = [4]
// deque values  = [5]

// Window is indexes [2, 3, 4]
// Max = nums[4] = 5

// result = [3, 3, 5]

// --------------------------------------------------
// i = 5, nums[i] = 3

// Remove outside window:
// i - k = 5 - 3 = 2
// front index 4 <= 2? no.

// Remove smaller from back:
// nums[4] = 5 < 3? no.

// Push index 5:
// deque indexes = [4, 5]
// deque values  = [5, 3]

// Window is indexes [3, 4, 5]
// Max = nums[4] = 5

// result = [3, 3, 5, 5]

// --------------------------------------------------
// i = 6, nums[i] = 6

// Remove outside window:
// i - k = 6 - 3 = 3
// front index 4 <= 3? no.

// Remove smaller from back:
// nums[5] = 3 < 6, remove index 5.
// nums[4] = 5 < 6, remove index 4.

// deque empty.

// Push index 6:
// deque indexes = [6]
// deque values  = [6]

// Window is indexes [4, 5, 6]
// Max = nums[6] = 6

// result = [3, 3, 5, 5, 6]

// --------------------------------------------------
// i = 7, nums[i] = 7

// Remove outside window:
// i - k = 7 - 3 = 4
// front index 6 <= 4? no.

// Remove smaller from back:
// nums[6] = 6 < 7, remove index 6.

// deque empty.

// Push index 7:
// deque indexes = [7]
// deque values  = [7]

// Window is indexes [5, 6, 7]
// Max = nums[7] = 7

// result = [3, 3, 5, 5, 6, 7]

// --------------------------------------------------

// Final answer:
// [3, 3, 5, 5, 6, 7]
