// A circular doubly linked list is a variation of linked list in which there is no end to the list.
// The last element of the list will point to the first element instead of pointing to the null
// and the first element will point to the last element. All the nodes are connected to form a circle.

// Both single linked list and doubly linked list can be used to create a circular linked list.
// We have already implemented a circular single linked list and have listed its advantages and disadvantages.

// List of operations performed on circular doubly linked list

// append(element): Adds a new element in the list.
// removeAt(position): Removes an element from the given position in the list and returns it.
// insert(position, element): Adds an element at the given position in the list.
// getElementAt(position): Returns the node at the given position in the list.
// toString(): Joins all the elements of the list and returns it as a string.
// toArray(): Converts the linked list to the array and returns it.
// indexOf(element): Returns the position of the given element in the list.
// delete(element): Removes the given element from the list.
// deleteHead(): Removes the first element from the list.
// isPresent(element): Returns true if element is present in the list, false otherwise.
// isEmpty(): Returns true if the list is empty, false otherwise.
// size(): Returns the size of the list.
// getHead(): Returns the whole list to iterate in forward direction.
// getTail(): Returns the whole list to iterate in reverse direction.

// Node
class Node {
  constructor(elm, next = null, prev = null) {
    this.element = elm;
    this.next = next;
    this.prev = prev;
  }
}

class CircularLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // Get element at specific index
  getElementAt = function (index) {
    if (index >= 0 && index <= this.length) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  };

  append = function (element) {
    let node = new Node(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    // Mark head's prev element as last element
    this.head.prev = this.tail;

    this.tail.next = this.head;
    this.length++;
  };

  // Add element at any position
  insert = function (position, element) {
    // Check of out-of-bound values
    if (position >= 0 && position <= this.length) {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;

      // Insert at head
      if (position === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
        // Insert at end
      } else if (position === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;

        // New
        current.prev = node;
        node.prev = previous;
      }

      // Mark head's prev element as last element
      this.head.prev = this.tail;

      // Mark tail's next element as first element
      this.tail.next = this.head;

      this.length++;
      return true;
    }

    return false;
  };

  // Remove at any position
  removeAt = function (index) {
    if (index >= 0 && index < this.length) {
      let current = this.head;

      // Remove from head
      if (index === 0) {
        if (this.length === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.length - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        // Remove at given index (middle or end)
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      if (this.head) {
        // Mark head's prev element as last element
        this.head.prev = this.tail;

        // Mark tail's next element as first element
        this.tail.next = this.head;
      }

      this.length--;
      return current.element;
    }

    return undefined;
  };

  indexOf = function (elm) {
    let current = this.head;
    let index = -1;

    // If element found then return its position
    while (current) {
      if (elm === current.element) {
        return ++index;
      }

      index++;
      current = current.next;
    }

    // Else return -1
    return -1;
  };

  isPresent = (elm) => {
    return this.indexOf(elm) !== -1;
  };

  getHead = function () {
    return this.head;
  };

  getTail = function () {
    return this.tail;
  };

  delete = (elm) => {
    return this.removeAt(this.indexOf(elm));
  };

  deleteHead = function () {
    this.removeAt(0);
  };

  deleteTail = function () {
    this.removeAt(this.length - 1);
  };

  toString = function () {
    let current = this.head;
    let string = "";
    const temp = this.head.element;

    while (current) {
      if (temp === current.next.element) {
        string += current.element + (current.next ? "\n" : "");
        break;
      }

      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  };

  toArray = function () {
    let arr = [];
    let current = this.head;
    const temp = this.head.element;

    while (current) {
      //Break if first element detected
      if (temp === current.next.element) {
        arr.push(current.element);
        break;
      }

      arr.push(current.element);
      current = current.next;
    }

    return arr;
  };

  isEmpty = function () {
    return this.length === 0;
  };

  size = function () {
    return this.length;
  };
}

let cLL = new CircularLinkedList();
cLL.append(10);
cLL.append(20);
cLL.append(30);
cLL.insert(3, 50);
cLL.removeAt(0);
console.log(cLL.toArray());

// Output:
// [20, 30, 50]
