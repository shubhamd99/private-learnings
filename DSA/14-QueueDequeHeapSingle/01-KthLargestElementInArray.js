// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Can you solve it without sorting?

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

// HEAP
// A heap is a special tree-like structure used to quickly get the smallest or largest value.

/*
Logic:
Keep only the k largest numbers in a min-heap.

Min-heap means the smallest value is always at the top.

For kth largest:
If we keep exactly k largest numbers,
the smallest among those k is the kth largest.

Example:
nums = [3,2,1,5,6,4], k = 2

Keep top 2 largest:
[6,5]

Smallest among them is 5.
So 5 is the 2nd largest.
*/

import MyMinHeap from "./00-MinHeap";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const heap = new MyMinHeap();

  for (const num of nums) {
    heap.push(num);

    // Keep heap size only k.
    // If more than k numbers, remove smallest.
    if (heap.size() > k) {
      // minheap - smallest element is always at the top and pop() removes the top element
      heap.pop();
    }
  }

  return heap.peek();
};
