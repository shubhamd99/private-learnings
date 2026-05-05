// https://leetcode.com/problems/palindrome-linked-list/description/

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
// Input: head = [1,2,2,1]
// Output: true

// Input: head = [1,2]
// Output: false

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/*
Logic:
A linked list is a palindrome if it reads the same forward and backward.

Example:
1 -> 2 -> 2 -> 1 is palindrome
1 -> 2 -> 3 -> 1 is not palindrome

Approach:
1. Use slow and fast pointers to find the middle of the list.
   slow moves 1 step.
   fast moves 2 steps.
   When fast reaches the end, slow is at the middle.

2. Reverse the second half of the list.

3. Compare the first half and reversed second half node by node. If all values match, it is a palindrome.
*/

// Time: O(n)
// Space: O(1)
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let slow = head;
  let fast = head;

  // Find middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // If list length is odd, skip the middle node.
  if (fast) {
    slow = slow.next;
  }

  // reverse second half
  let prev = null;
  let curr = slow;

  while (curr) {
    let nextNode = curr.next;
    curr.next = prev; // unlink/assign prev
    prev = curr;
    curr = nextNode;
  }

  // compare two halves
  let left = head;
  let right = prev;

  while (right) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }

  return true;
};
