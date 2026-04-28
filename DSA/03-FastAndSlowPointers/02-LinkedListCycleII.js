// https://leetcode.com/problems/linked-list-cycle-ii/description/

// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

// Logic — Floyd's Cycle Detection (Tortoise and Hare)

// leet code 141 = detect cycle, O(1) space, return boolean
// leet code 142 = detect cycle + find entry node, O(1) space, return node

// mathematical property says:
// distance from head to cycle start = distance from meeting point to cycle start going forward

// Let me restate simply. After the meeting point,
// if you put one pointer at head and keep the other at the meeting point,
// and move both one step at a time, they will collide exactly at the cycle entrance.
// This is a proven mathematical property of the algorithm.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// Time: O(n)
// Space: O(1)
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      break;
    }
  }

  // no cycle
  if (!fast || !fast.next) return null;

  slow = head;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};
