// https://leetcode.com/problems/add-two-numbers/description/

// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order, and each of their nodes contains a single digit.
// Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

/*
Logic: Linked List / Math / Carry

Digits are stored in reverse order.

Example:
l1 = 2 -> 4 -> 3 means 342
l2 = 5 -> 6 -> 4 means 465

342 + 465 = 807

Answer should also be reversed:
7 -> 0 -> 8

We add digit by digit like normal addition.

At each step:
sum = l1 value + l2 value + carry

digit to store = sum % 10
carry for next step = Math.floor(sum / 10)

Use dummy node to build answer list easily.
*/

// Time: O(max(n, m))
// Space: O(max(n, m)) Space is for the new answer list.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    const sum = val1 + val2 + carry;

    const digit = sum % 10;
    carry = Math.floor(sum / 10);

    tail.next = new ListNode(digit);
    tail = tail.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
};

// sum = 10
// Current node should store: 0
// Carry should be: 1
// 10 % 10 = 0
// Math.floor(10 / 10) = 1
