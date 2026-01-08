// Why do we need doubly linked list?

// Linked list stores the collection of data, but unlike arrays data are not stored in contagious memory,
// instead, each element in the linked list consists of a node which stores the data
// and a reference(pointer or link) to the next element.

// However, in the single linked list we can only move forward to the next element but cannot go back.
// But in the doubly linked list, we maintain two pointers
// For the next element.
// For the previous element.
// This way we will be able to iterate backward any time we want.

// List of operations performed on linked list

class Node {
  constructor(elm, prev = null, next = null) {
    this.element = elm;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // [A] ⇄ [B] ⇄ [C]
  // append - [D]
  // node.prev = tail -> [D].prev → [C]   (New node’s prev should point to the old last node.)
  // tail.next = node -> [C].next → [D]   (Old tail’s next should point to the new node)
  // tail = node      -> tail → [D]       (Update the list’s tail reference to point to the new last node.)
  append(elm) {
    const node = new Node(elm);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  //   Index: 0    1    2    3
  //          A ⇄  B ⇄  C ⇄  D
  // We want: A ⇄ B ⇄ X ⇄ C ⇄ D
  // head → [A] ⇄ [B] ⇄ [C] ⇄ [D] ← tail
  // [A] ⇄ [B]     [C] ⇄ [D]
  //        ↑       ↑
  //   previous  current
  // Connect X → C
  // [X].next → [C]
  // Connect B → X
  // [B].next → [X]
  // Connect C → X (backward)
  // [C].prev → [X]
  // Connect X → B (backward)
  // [X].prev → [B]
  // Final:
  // head → [A] ⇄ [B] ⇄ [X] ⇄ [C] ⇄ [D] ← tail
  insert(position, element) {
    // Check of out-of-bound values - Insert allows inserting at the end
    if (position >= 0 && position <= this.length) {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;

      // first index
      if (position === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
        // last index
      } else if (position === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        // Postfix Increment: value++ - Returns the OLD value → increments after
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;

        // new
        current.prev = node;
        node.prev = previous;
      }

      this.length++;
      return true;
    }

    return false;
  }

  removeAt(position) {
    // look for out-of-bounds value - Remove can only remove existing elements
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let previous;
      let index = 0;

      // Removing first item
      if (position === 0) {
        // if there is only one item
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = current.next;
          this.head.prev = null;
        }
        // Removing last item
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        // Postfix Increment: value++ - Returns the OLD value → increments after
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        // link previous with current's next - skip it
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.length--;
      return current.element;
    }

    return null;
  }

  indexOf(elm) {
    let current = this.head;
    let index = -1;

    // If element found then return its position
    while (current) {
      if (elm === current.element) {
        // Prefix Increment: ++value = Increments first → returns the NEW value
        return ++index;
      }

      index++;
      current = current.next;
    }

    // Else return -1
    return -1;
  }

  isPresent(elm) {
    return this.indexOf(elm) !== -1;
  }

  delete(elm) {
    return this.removeAt(this.indexOf(elm));
  }

  deleteHead() {
    this.removeAt(0);
  }

  deleteTail() {
    this.removeAt(this.length - 1);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toString() {
    let current = this.head;
    let string = "";

    while (current) {
      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  }

  toArray() {
    let current = this.head;
    let arr = [];

    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  }
}

let dll = new DoubleLinkedList();
dll.append("prashant");
dll.append("surag");
dll.append("sachin");
dll.insert(1, "omkar");
dll.deleteHead();
dll.deleteTail();
dll.deleteHead();
console.log(dll.toArray());

// Output:
// ["surag"]

// Time Complexity (Average and Worst)
// Search - O(n)
// Access - O(n)
// Insert - O(1)

// Space Complexity (Worst)
// O(n)
