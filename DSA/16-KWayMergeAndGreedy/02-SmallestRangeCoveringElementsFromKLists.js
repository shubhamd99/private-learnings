// https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/

// You have k lists of sorted integers in non-decreasing order.
// Find the smallest range that includes at least one number from each of the k lists.

// We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

// Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
// Output: [20,24]
// Explanation:
// List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
// List 2: [0, 9, 12, 20], 20 is in range [20,24].
// List 3: [5, 18, 22, 30], 22 is in range [20,24].

/**
 * Approach:
 * We need to find the smallest value range [start, end] that includes at least
 * one number from each of the k sorted lists.
 *
 * Idea:
 * This is a classic variation of the K-Way Merge pattern. At any given moment,
 * we can maintain a window of exactly k elements (one from each list) using a Min-Heap.
 * Tracking the minimum and maximum values inside this k-element window gives us a valid range.
 * To try and find a smaller range, we look at the smallest element in our window,
 * remove it, and replace it with the next element from its respective list. We keep track of
 * the tightest range seen throughout this process.
 *
 * Steps:
 * 1. Initialize a Min-Heap to track elements across lists.
 * 2. Track a global variable `currentMax` to keep tabs on the maximum value currently inside our heap window.
 * 3. Seed the heap with the first element `nums[i][0]` of every list, recording the value, the list index `i`, and element index `0`. Update `currentMax` continuously.
 * 4. Maintain a tracking variable for the `bestRange` (initially spanning from `-Infinity` to `Infinity`).
 * 5. While the heap size equals `k`:
 * - Pop the minimum element from the heap (`minElement`).
 * - Check if the current range `[minElement.val, currentMax]` is narrower than our `bestRange`. If so, update `bestRange`.
 * - Move to the next element in the list that `minElement` came from.
 * - If that list runs out of elements, we terminate the loop because we can no longer maintain a window containing elements from *all* lists.
 * - Otherwise, push the new element into the heap and update `currentMax` if the new element is larger.
 * 6. Return `bestRange`.
 *
 * Why min heap?
 * We constantly need to know the minimum element within our current k-element window to try and shrink the range from the left side. A min heap yields this minimum in O(1) time and accepts the next list item in O(log k) time.
 *
 * Time Complexity: O(N log k)
 * - N is the total number of elements across all lists.
 * - Each element is pushed and popped from the heap at most once, taking O(log k) per operation.
 *
 * Space Complexity: O(k)
 * - The heap stores exactly one element per list, capping its footprint at size k.
 */

/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
  const heap = new MyMinHeap();
  let currentmax = -Infinity;

  // 1. Initialize the window with the first element of each list
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i][0];
    heap.push({ val, listIdx: i, elemIdx: 0 });
    currentmax = Math.max(currentmax, val);
  }

  let rangeStart = -Infinity;
  let rangeEnd = Infinity;

  // 2. Slide the window across lists using the K-Way Merge technique
  while (heap.size() === nums.length) {
    const { val: minVal, listIdx, elemIdx } = heap.pop();

    // Update the best range if the current window is smaller
    if (currentmax - minVal < rangeEnd - rangeStart) {
      rangeStart = minVal;
      rangeEnd = currentmax;
    }

    // If there's a next element in the same list, push it into our window
    if (elemIdx + 1 < nums[listIdx].length) {
      const nextVal = nums[listIdx][elemIdx + 1];
      heap.push({ val: nextVal, listIdx, elemIdx: elemIdx + 1 });
      currentMax = Math.max(currentMax, nextVal);
    }
  }

  return [rangeStart, rangeEnd];
};

class MyMinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  push(item) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.size() === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.data[parent].val <= this.data[index].val) break;

      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.data.length;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < n && this.data[left].val < this.data[smallest].val) {
        smallest = left;
      }

      if (right < n && this.data[right].val < this.data[smallest].val) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [
        this.data[smallest],
        this.data[index],
      ];

      index = smallest;
    }
  }
}
