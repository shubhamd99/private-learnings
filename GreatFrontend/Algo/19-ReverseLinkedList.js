// Reverse Linked List
// Reverse a singly linked list in-place.
//
// Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
// Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
//
// Input:  1 -> 2 -> null
// Output: 2 -> 1 -> null

// Node definition
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// ---- SIMPLE VERSION (for interviews) ----
// Idea: three pointers — prev, current, next.
// At each step: save next, point current.next to prev, advance both pointers.
// When current is null, prev is the new head.

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next; // save next before overwriting
    current.next = prev; // reverse the pointer
    prev = current; // advance prev
    current = next; // advance current
  }

  return prev; // prev is now the new head
}

// ---- RECURSIVE VERSION ----
// Idea: recurse to the end, then re-link on the way back.

function reverseListRecursive(head) {
  if (!head || !head.next) return head; // base case: empty or single node

  const newHead = reverseListRecursive(head.next); // recurse to tail
  head.next.next = head; // make next node point back to current
  head.next = null; // cut original forward link
  return newHead;
}

// Example: 1 -> 2 -> 3 -> 4 -> null  becomes  4 -> 3 -> 2 -> 1 -> null

// Time: O(n)
// Space: O(1) iterative, O(n) recursive (call stack)
