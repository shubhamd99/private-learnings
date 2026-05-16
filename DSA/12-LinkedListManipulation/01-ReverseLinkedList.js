// https://leetcode.com/problems/reverse-linked-list/submissions/2004708459/
// Given the head of a singly linked list, reverse the list, and return the reversed list.
// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

/*
Logic: Linked List / Pointer Reversal
Reverse the linked list by changing each node's next pointer.

We use three pointers:

prev = previous node
curr = current node
temp = next node saved before breaking the link

For each node:
1. Save curr.next in temp
2. Point curr.next backward to prev
3. Move prev to curr
4. Move curr to temp

At the end, prev becomes the new head.
*/

// Time - O(n)
// Space - O(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const temp = curr.next;

    curr.next = prev;

    prev = curr;
    curr = temp;
  }

  return prev;
};
