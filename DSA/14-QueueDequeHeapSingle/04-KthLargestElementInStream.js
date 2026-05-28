// https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

// Input:
// ["KthLargest", "add", "add", "add", "add", "add"]
// [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

// Output: [null, 4, 5, 5, 8, 8]

// Explanation:

// KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
// kthLargest.add(3); // return 4
// kthLargest.add(5); // return 5
// kthLargest.add(10); // return 5
// kthLargest.add(9); // return 8
// kthLargest.add(4); // return 8

/*
Logic:
We need to keep track of the kth largest number in a stream.

Use a min-heap of size k.

Why min-heap?
The heap stores the k largest numbers seen so far.

The smallest number inside those k largest numbers is the kth largest.
In a min-heap, the smallest number is always at the top.

So:
heap.peek() = kth largest

When adding a new value:
1. Push it into heap.
2. If heap size becomes bigger than k, remove the smallest.
3. Return heap top.

Example:
k = 3
nums = [4, 5, 8, 2]

Keep only 3 largest:
[4, 5, 8]

Smallest among them is 4.
So kth largest is 4.
*/

import MyMinHeap from "./00-MinHeap";

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = new MyMinHeap();

  for (const num of nums) {
    this.add(num);
  }
};

// Time: O(n log k)
// Space: O(k)
/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.heap.push(val);

  // pop removes the smallest, because it is a min-heap.
  // smallest value is always at the top
  if (this.heap.size() > this.k) {
    this.heap.pop();
  }

  return this.heap.peek();
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
