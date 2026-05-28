// https://leetcode.com/problems/top-k-frequent-elements/

// Given an integer array nums and an integer k, return the k most frequent elements.
// You may return the answer in any order.

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

import MyMinHeap from "./00-MinHeap";

// Our solution - Hash Map + Min Heap - Time: O(n log k) Space: O(n + k)
// Optimal solution - Hash Map + Bucket Sort - Time: O(n) Space: O(n)

/*
Logic:
We need k most frequent numbers.

Use frequency map first:
number -> how many times it appears

Then use a min-heap of size k.

Heap stores: [freq, num]

Min-heap means smallest frequency is at the top.

For every number:
1. Push [freq, num] into heap.
2. If heap size > k, remove the smallest frequency.

At the end: heap contains k numbers with highest frequency.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const freqMap = new Map();

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const heap = new MinHeapByFreq();

  for (const [num, freq] of freqMap) {
    heap.push([freq, num]);

    if (heap.size() > k) {
      heap.pop();
    }
  }

  const result = [];

  while (heap.size() > 0) {
    const [freq, num] = heap.pop();
    result.push(num);
  }

  return result;
};

class MinHeapByFreq {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(pair) {
    this.heap.push(pair);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent][0] <= this.heap[index][0]) break;

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];

      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < n && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }

      if (right < n && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
  }
}
