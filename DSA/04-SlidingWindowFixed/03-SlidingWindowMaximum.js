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

const deque = [];

deque.push(val); // add to back
deque.pop(); // remove from back
deque.shift(); // remove from front - The shift is technically O(n). If you want a true O(1) deque you would need to implement a doubly linked list, but that is overkill for interviews.
deque[0]; // peek front
deque[deque.length - 1]; // peek back

// Monotonic means the values in the deque are always maintained in a specific order, either always increasing or always decreasing.
// In this problem the deque is monotonically decreasing, meaning values from front to back are always in decreasing order.

// monotonic deque stores indices in decreasing order of values
// front of deque is always the maximum of the current window
// remove indices from back if their values are smaller than current element
// remove front if it is outside the current window

// It only has one value when a very large element comes in and wipes out everything behind it
// But when elements are in decreasing order, all of them stay in the deque.
// i=2: deque = [1, 2]  -> values = [3, -1]   <- two values
// i=3: deque = [1, 2, 3]  -> values = [3, -1, -3]  <- three values

// Once i reaches k - 1 for the first time, every position after that also satisfies i >= k - 1.
// So from that point onward you record the maximum on every single iteration.
// k = 3, nums.length = 8

// i=0  -> 0 >= 2? no, skip
// i=1  -> 1 >= 2? no, skip
// i=2  -> 2 >= 2? yes, record   <- first window complete
// i=3  -> 3 >= 2? yes, record
// i=4  -> 4 >= 2? yes, record
// i=5  -> 5 >= 2? yes, record
// i=6  -> 6 >= 2? yes, record
// i=7  -> 7 >= 2? yes, record

// No duplicates because you only push once per iteration, and each iteration represents exactly one window position.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // remove front if it is outside the current window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // remove all indices from back whose values are smaller than current element
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // front of deque is always the maximum, start recording after first window is complete
    // The first complete window of size k is ready when i reaches index k - 1. Array is zero index
    if (i >= k - 1) {
      results.push(nums[deque[0]]);
    }
  }

  return results;
};
