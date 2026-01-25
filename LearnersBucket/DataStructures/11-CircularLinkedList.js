// A circular linked list is a variation of linked list in which there is no end to the list.
// The last element of the list will point to the first element instead of pointing to the null.
// All the nodes are connected to form a circle.
// Both single linked list and doubly linked list can be used to create a circular linked list.

// When a circular linked list is implemented with a doubly linked list the first element points to the last
// and last to the first.

// Why do we need circular linked list?
// Any node can be used as a head or starting point.
// We can traverse the whole list from any point and stop when we reach again to the first node.
// Useful for implementation of a queue. Unlike
// It also used widely in applications when we have to go around the list or in the cycle.

// In the operating system it is common when to put multiple running applications in the list
// and cycle through them, giving each of them a slice of time to execute,
// and then making them wait while the CPU is given to another application.
//
// Used by browsers to keep track of the user's history so that user can navigate.

// It is also used in multiplayer games, All the players are kept in circular linked list
// and pointer keeps movings as the player chance ends.

// Circular linked list implemented with the doubly linked list is used to create advanced data structure
// like Fibonacci Heap.

// List of operations performed on circular linked list
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

//Node
class Node {
  constructor(elm, next = null) {
    this.element = elm;
    this.next = next;
  }
}

class CircularLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // Get element at specific index
  getElementAt(index) {
    if (index >= 0 && index <= this.length) {
      let node = this.head;
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  append(element) {
    const node = new Node(element);
    let current;

    // If head is empty
    // Then make new node head
    if (this.head === null) {
      this.head = node;
    } else {
      // Else add the new node as the next node
      // And mark the next of new node to the head
      current = this.getElementAt(this.length - 1);
      current.next = node;
    }

    node.next = this.head;
    this.length++;
  }

  // Insert at given position
  insert(element, index) {
    if (index >= 0 && index <= this.length) {
      const node = new Node(element);
      let current = this.head;

      // Insert at head
      if (index === 0) {
        if (this.head === null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.length - 1);
          this.head = node;
          current.next = this.head;
        }
      } else {
        // Insert at given index (middle or end)
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      this.length++;
      return true;
    }
    return false;
  }

  // Remove at any position
  removeAt(index) {
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

      this.length--;
      return current.element;
    }
    return undefined;
  }

  indexOf(elm) {
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
  }

  //Find the item in the list
  isPresent = (elm) => {
    return this.indexOf(elm) !== -1;
  };

  //Get the head
  getHead = function () {
    return this.head;
  };

  //Delete an item from the list
  delete = (elm) => {
    return this.removeAt(this.indexOf(elm));
  };

  //Delete the first item from the list
  deleteHead = function () {
    this.removeAt(0);
  };

  //Print item of the string
  toString = function () {
    let current = this.head,
      string = "";

    //Keep track of the head
    const temp = this.head.element;

    while (current) {
      //If head is the next element then break
      if (temp === current.next.element) {
        string += current.element + (current.next ? "\n" : "");
        break;
      }

      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  };

  //Convert list to array
  toArray = function () {
    let arr = [],
      current = this.head;

    //Keep track of head
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

  //Check if list is empty
  isEmpty = function () {
    return this.length === 0;
  };

  //Get the size of the list
  size = function () {
    return this.length;
  };
}

// Time Complexity:
// Access (by index) → O(n)
// Search → O(n)
// Insert - O(1)

// Space Complexity:
// Overall space → O(n)

let cLL = new CircularLinkedList();
cLL.append(20);
cLL.append(30);
cLL.append(40);
cLL.append(50);
console.log(cLL.removeAt(3));
cLL.insert(70, 3);
cLL.deleteHead();
cLL.delete(70);
console.log(cLL.toArray());

// Output: (50)[(30, 40)];
