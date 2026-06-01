// https://leetcode.com/problems/find-median-from-data-stream/description/

// The median is the middle value in an ordered integer list.
// If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.

// Implement the MedianFinder class:

// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

/**
 * Approach: Two Heaps
 *
 * We maintain two heaps:
 *
 * 1. small: Max Heap
 *    - Stores the smaller half of the numbers.
 *    - The largest number in this smaller half stays at the top.
 *
 * 2. large: Min Heap
 *    - Stores the larger half of the numbers.
 *    - The smallest number in this larger half stays at the top.
 *
 * Why this works:
 * - Median depends only on the middle value(s).
 * - By keeping the smaller half and larger half balanced,
 *   the median is always available from the top of one or both heaps.
 *
 * Balance rule:
 * - small can have either:
 *   - the same number of elements as large, or
 *   - exactly one more element than large.
 *
 * Cases:
 * - Odd number of elements:
 *   small has one extra element, so median = small.peek()
 *
 * - Even number of elements:
 *   both heaps have equal size, so median =
 *   (small.peek() + large.peek()) / 2
 *
 * Example:
 * Input stream: 1, 2, 3
 *
 * After adding 1:
 * small = [1]
 * large = []
 * median = 1
 *
 * After adding 2:
 * small = [1]
 * large = [2]
 * median = (1 + 2) / 2 = 1.5
 *
 * After adding 3:
 * small = [2, 1]
 * large = [3]
 * median = 2
 *
 * Time Complexity:
 * - addNum(num): O(log n)
 *   Because inserting into a heap takes logarithmic time.
 *
 * - findMedian(): O(1)
 *   Because median is available at the top of the heaps.
 *
 * Space Complexity:
 * - O(n)
 *   Because all numbers are stored across the two heaps.
 */

var MedianFinder = function () {
  this.small = new MyHeap((a, b) => a > b); // max heap
  this.large = new MyHeap((a, b) => a < b); // min heap
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.small.size() === 0 || num <= this.small.peek()) {
    this.small.push(num);
  } else {
    this.large.push(num);
  }

  // This block is rebalancing the two heaps after adding a number.
  // small can have one extra element
  // large should never have more elements than small
  // the size difference should never be more than 1
  // small owns the middle element when count is odd - small > large + 1
  if (this.small.size() > this.large.size() + 1) {
    this.large.push(this.small.pop());
  } else if (this.large.size() > this.small.size()) {
    this.small.push(this.large.pop());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.small.size() > this.large.size()) {
    return this.small.peek();
  }

  return (this.small.peek() + this.large.peek()) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
