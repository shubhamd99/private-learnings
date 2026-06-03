// https://leetcode.com/problems/merge-k-sorted-lists/description/

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.

// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted linked list:
// 1->1->2->3->4->4->5->6

// A K-Way Merge is an algorithm used to merge $k$ sorted arrays (or linked lists) into a single, combined sorted array.
// It is a direct extension of the standard 2-way merge used in Merge Sort.

/**
 * Approach:
 * We need to merge k sorted linked lists into a single sorted linked list.
 *
 * Idea:
 * Since each list is already sorted, the smallest overall node is guaranteed
 * to be among the heads of the k lists.
 * * We use a min heap to track the "frontier" (current heads) of all lists.
 * We repeatedly extract the absolute smallest node from the heap, attach it to our
 * output list, and then replace it in the heap with its immediate next node.
 *
 * Steps:
 * 1. Initialize a Min-Heap.
 * 2. Push the head node of every non-empty linked list into the heap.
 * 3. Create a dummy node and a `tail` tracker to construct the merged result.
 * 4. While the heap is not empty:
 * - Pop the node with the minimum value.
 * - Link this minimum node to `tail.next`.
 * - Move the `tail` pointer forward.
 * - If the extracted node has a next node (`node.next`), push `node.next` into the heap.
 * 5. Return `dummy.next`.
 *
 * Why min heap?
 * At any point, we have up to k candidate nodes. Comparing all k heads manually
 * on every step takes O(k) time. A min heap allows us to extract the minimum and
 * insert a new candidate node in O(log k) time.
 *
 * Time Complexity: O(N log k)
 * - N is the total number of nodes across all k lists.
 * - Each of the N nodes is pushed into and popped from the heap exactly once.
 * - Each heap operation takes O(log k) time where k is the size of the heap.
 *
 * Space Complexity: O(k)
 * - The min heap holds at most k elements (one head node from each list) at any given time.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists || lists.length === 0) return null;

  const heap = new MyMinHeap();

  // 1. Initialize the heap with the head of each non-empty list
  for (let i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      heap.push(lists[i]);
    }
  }

  const dummy = new ListNode(0);
  let tail = dummy;

  // 2. Process nodes one by one from the heap
  while (heap.size() > 0) {
    const minNode = heap.pop();
    tail.next = minNode;
    tail = tail.next;

    // If the popped node has a next element, push it into the heap
    if (minNode.next !== null) {
      heap.push(minNode.next);
    }
  }

  return dummy.next;
};

class MyMinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  push(node) {
    this.data.push(node);
    this.bubbleUp(this.data.length - 1);
  }

  pop(node) {
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

      // Compare by node.val
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

      // Compare by node.val
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
