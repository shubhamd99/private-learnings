// Linked list stores the collection of data,
// but unlike arrays data are not stored in contagious memory,
// instead each element in the linked list consists of a node which stores the data
// and a reference(pointer or link) to the next element.

// Linked lists are used where data size is dynamic and frequent insertions or
// deletions are required, such as browser history, undo-redo systems, and LRU (Least Recently Used) caches.

// Not stored in contagious memory:
// A linked list does not require contiguous memory because of how its nodes are structured and connected
// The pointer stores the address of the next node, so nodes don’t need to be placed next to each other in memory.
// Nodes are allocated individually at runtime (heap)
// OS gives any free memory block available
// No need to find a large continuous block

// There are two ends to the linked list head and tail.
// head: Represent the elements from the beginning of the list.
// tail: Represent the elements from the end of the list.

// Advantage
// We can dynamically increase the size of the list and store any amount of data.
// We don't have to shift elements while adding or removing element from the middle of the list.
// We can just change the reference to other element.

// Disadvantage
// Every time we need to search for any data in the list we will need iterate from the start or (Head) till the desired element.
// We will be storing the reference to the next element, so we need to pay extra attention to make things work properly.

// real-life usages of Linked Lists
// Browser History (Back / Forward) - Doubly Linked List - Current page → previous & next pages. Back and Forward operations are O(1)
// Music / Video Playlists (Spotify, YouTube) - Doubly / Circular Linked List - Next / Previous navigation
// Undo / Redo in Editors (VS Code, Photoshop) - Each action links to previous and next
// OS Memory Management - Singly Linked List - Free memory blocks tracked as a list, Fast allocation & deallocation, Works with fragmented memory

// List of operations performed on linked list
// append(element): Adds a new element in the list.
// removeAt(position): Removes an element from the given position in the list and returns it.
// insert(position, element): Adds an element at the given position in the list.
// toString(): Joins all the elements of the list and returns it as a string.
// toArray(): Converts the linked list to the array and returns it.
// indexOf(element): Returns the position of the given element in the list.
// delete(element): Removes the given element from the list.
// deleteHead(): Removes the first element from the list.
// deleteTail(): Removes the last element from the list.
// isPresent(element): Returns true if element is present in the list, false otherwise.
// isEmpty(): Returns true if the list is empty, false otherwise.
// size(): Returns the size of the list.
// getHead(): Returns the whole list.

// O(1) (Constant Time) → Execution time stays the same regardless of input size.
// O(n) (Linear Time) → Execution time grows proportionally with input size.

// Time Complexity:
// Access (by index) → O(n)
// Search → O(n)
// Insertion at head → O(1)
// Insertion at tail → O(1) (if tail pointer exists)
// Insertion at middle → O(n)
// Deletion at head → O(1)
// Deletion at tail → O(n) (O(1) if doubly linked list with tail)
// Deletion at middle → O(n)

// Space Complexity:
// Overall space → O(n)
// Extra space per node → O(1) (data + pointer)
// Singly Linked List → 1 pointer per node
// Doubly Linked List → 2 pointers per node

// Node
class Node {
  constructor(elm, next = null) {
    this.elm = elm;
    this.next = next;
  }
}

// LinkedList
class LinkedList {
  constructor() {
    // To keep track of the size
    this.length = 0;
    // To keep track of the list
    this.head = null;
  }

  // Add new item in the linkedlist
  append(elm) {
    let node = new Node(elm);
    let current;

    // If head is empty then
    // Add the node at the beginning
    if (this.head === null) {
      this.head = node;
    } else {
      // Else add the node as the
      // Next element of the existing list
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    // Increase the length
    this.length++;
  }

  // Remove item from any position
  removeAt(pos) {
    if (pos > -1 && pos < this.length) {
      let current = this.head;
      let previous;
      let index = 0;

      // If removing the first element
      // then simply point to the next element
      if (pos === 0) {
        this.head = current.next;
      } else {
        // Else find the correct pos
        // and then remove the element.
        // Because current must end exactly at the node to remove, and previous must point to the node before it.
        while (index++ < pos) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
      }

      this.length--;
      return current.elm;
    } else {
      return null;
    }
  }

  // Add item at any position
  insert(pos, elm) {
    if (pos > -1 && pos < this.length) {
      let node = new Node(elm);
      let current = this.head;
      let previous;
      let index = 0;

      if (pos === 0) {
        node.next = current;
        this.head = node;
      } else {
        while (index++ < pos) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;
      }

      this.length++;
      return true;
    } else {
      return false;
    }
  }

  // Get the indexOf item
  indexOf(elm) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.elm === elm) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Find the item in the list
  isPresent(elm) {
    return this.indexOf(elm) !== -1;
  }

  // Delete an item from the list
  delete = (elm) => {
    const index = this.indexOf(elm);
    return this.removeAt(index);
  };

  // Delete first item from the list
  deleteHead() {
    let current = this.head;

    // Already empty
    if (current === null) {
      return true;
    }

    if (current.next) {
      current = current.next;
      this.head = current;
    } else {
      this.head = null;
    }

    return true;
  }

  deleteTail() {
    let current = this.head;

    // Already empty
    if (current === null) {
      return true;
    }

    while (current.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }

    return true;
  }

  // Print item of the string
  toString() {
    let current = this.head;
    let str = "";

    while (current) {
      str += current.elm + (current.next ? "\n" : "");
      current = current.next;
    }

    return str;
  }

  // Convert list to array
  toArray() {
    let arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.elm);
      current = current.next;
    }

    return arr;
  }

  isEmpty() {
    return this.length === 0;
  }

  size = () => {
    return this.length;
  };

  getHead() {
    return this.head;
  }
}

let ll = new LinkedList();
ll.append("prashant");
ll.append("anil");
ll.append("29");
console.log(ll.toArray());

// Remove 'anil' from the list
ll.removeAt(1);
console.log(ll.toArray());

// Remove the first element from the list
ll.deleteHead();
console.log(ll.toArray());

// Output:
// ["prashant", "anil", "29"]
// ["prashant", "29"]
// ["29"]
