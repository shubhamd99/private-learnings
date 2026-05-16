// https://leetcode.com/problems/merge-two-sorted-lists/description/
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.

/*
Logic: Linked List / Two Pointers / Dummy Node
We have two sorted linked lists.

Example:
list1 = 1 -> 2 -> 4
list2 = 1 -> 3 -> 4

We want:
1 -> 1 -> 2 -> 3 -> 4 -> 4

Use two pointers:
l1 points to current node in list1
l2 points to current node in list2

Compare l1.val and l2.val.
Attach the smaller node to the result list.
Move that pointer forward.

Use a dummy node to make building the result list easier.

dummy is a fake starting node.
tail always points to the last node in the result list.

At the end:
One list may still have nodes left.
Since it is already sorted, attach it directly.
*/

// Time - O(n + m) where n and m are lengths of the two lists.
// Space - O(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(-1);
  let tail = dummy;

  let l1 = list1;
  let l2 = list2;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      // Attach l1 node because it is smaller/equal.
      tail.next = l1;
      l1 = l1.next;
    } else {
      // Attach l2 node because it is smaller.
      tail.next = l2;
      l2 = l2.next;
    }

    // Move tail to the newly attached node.
    tail = tail.next;
  }

  // Attach remaining nodes from whichever list is not empty.
  tail.next = l1 || l2;

  // Why not return dummy?
  // Because dummy is fake. It has value -1, not part of the answer.
  return dummy.next;
};

// Take this example:

// list1 = 1 -> 2
// list2 = 1 -> 3

// dummy = -1
// tail = dummy

// at start
// dummy/tail
//    |
//   -1 -> null

// Now compare first nodes:
// list1 has 1
// list2 has 1
// tail.next = list1 node
// tail = tail.next

// dummy        tail
//   |           |
//  -1 -> 1 -> null

// end

// dummy                       tail
//   |                          |
//  -1 -> 1 -> 1 -> 2 -> 3
