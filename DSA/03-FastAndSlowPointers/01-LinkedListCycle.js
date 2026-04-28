// https://leetcode.com/problems/linked-list-cycle/description/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// Logic — Floyd's Cycle Detection (Tortoise and Hare)
// You have two pointers starting at the same position. Slow moves one step at a time, fast moves two steps at a time.

// If there is no cycle, fast will eventually hit null and you return false.

// If there is a cycle, fast will loop around and come back.
// Since fast is moving quicker, it will eventually catch up to slow from behind
// and they will meet at the same node
// Like two runners on a circular track, the faster one will always lap the slower one

// Time Complexity - O(n)
// Space Complexity - O(1)
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
};

// Non-Optimal Approach

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// Time Complexity - O(n) In the worst case fast travels around the cycle at most once before catching slow.
// Space Complexity - O(n) Just two pointers, no extra data structure.
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const set = new Set();
  let curr = head;

  while (curr) {
    // Object reference
    if (set.has(curr)) {
      return true;
    }

    set.add(curr);
    curr = curr.next;
  }

  return false;
};
