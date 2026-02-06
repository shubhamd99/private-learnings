// What is Deque data structure?
// Deque or Double-ended queue is a generalized version of queue in which data can be added and removed from both the ends
// It performs both the combined operations of stack and queue together and can be used as any of them.

// Why is deque data structure needed?
// It supports clockwise and anti-clockwise rotations in O(1) time which can be very useful in certain applications
// and also the problem where elements need to be removed and added from both the ends can be solved easily

// List of operations performed on Deque
// insertFront(): Inserts an element at the front.
// insertBack(): Inserts an element at the back.
// removeFront(): Removes an element from the front.
// removeBack(): Removes an element from the back.
// getFront(): Returns the element at the front.
// getBack(): Returns the element at the back.
// isEmpty(): Checks if the deque is empty or not.
// size(): Returns the size of the deque.
// clear(): Clears the deque.
// toString(): Returns all the elements concatenated as a string from front to back.

// A Deque can be implemented either using a doubly-linked list or circular array.
// In both implementation, we can implement all operations in O(1) time.

// Time Complexity (Average and Worst)
// Search - O(n)
// Access - O(1)
// Insert - O(1)

// Space Complexity (Worst)
// O(n)

// Implementing a deque data structure using array in javascript
// Javascript arrays are very flexible and they natively support all the operations of the Deque.
// Still, we will implement a Deque with circular array approach.
// We will use two different variables count and lowestCount to keep track of the elements on both the end and items to store the data.

class Deque {
  constructor() {
    // To track the elements from back
    // count is NOT the number of elements.
    // It is the index of the next free slot at the back.
    this.count = 0;

    // To track the elements from the front
    // index of FRONT element
    this.lowestCount = 0;

    // To store the data
    this.items = {};
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  isEmpty() {
    return this.size() === 0;
  }

  insertBack(elm) {
    // Postfix Increment: value++ - Returns the OLD value → increments after
    this.items[this.count++] = elm;
  }

  insertFront(elm) {
    if (this.isEmpty()) {
      // If empty then add on the back
      this.insertBack(elm);
    } else if (this.lowestCount > 0) {
      // There is space BEFORE front. No shifting needed. O(1).
      //       free space
      //       ↓
      // [ , , , A, B, C ]
      //         ↑
      //   lowestCount = 4
      this.items[--this.lowestCount] = elm;
    } else {
      // No space at front → must shift everything. lowestCount === 0. To insert at front, we must shift
      // [A, B, C] - length 3 (0, 1, 2 index)
      // [ 'A', 'B', 'C', 'C' ] index 3
      // [ 'A', 'B', 'B', 'C' ] index 2
      // [ 'A', 'A', 'B', 'C' ] index 1
      // [ 'A', 'A', 'B', 'C' ] index 0
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }

      // [X, A, B, C]
      this.count++;
      this.items[0] = elm;
    }
  }

  removeFront() {
    // if empty return null
    if (this.isEmpty()) {
      return null;
    }

    // Get the first item and return it
    // items = { 0: "A", 1: "B", 2: "C" }
    // lowestCount = 0
    // count = 3
    // delete A
    // items = { 1: "B", 2: "C" }
    // lowestCount = 1 (first slot)
    // count = 3 (next free slot)
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    // if empty return null
    if (this.isEmpty()) {
      return null;
    }

    // Get the last item and return it
    this.count--; // next free slot index at the back
    const result = this.items[this.count];
    delete this.items[this.count]; // delete its value so it becomes next free slot
    return result;
  }

  getFront() {
    // If empty then return null
    if (this.isEmpty()) {
      return null;
    }

    //Return first element
    return this.items[this.lowestCount];
  }

  getBack() {
    // If empty then return null
    if (this.isEmpty()) {
      return null;
    }

    // Return first element
    return this.items[this.count - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let objString = `${this.items[this.lowestCount]}`; // first item
    // second item till last item
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }
}

let deque = new Deque();
deque.insertBack(5);
deque.insertBack(10);
console.log(deque.getBack());
deque.removeBack();
console.log(deque.getBack());
deque.insertFront(15);
console.log(deque.getFront());
deque.removeFront();
console.log(deque.getFront());

// Output:
// 10
// 5
// 15
// 5

// Time Complexity (Average and Worst)
// Search - O(n)
// Access - O(1)
// Insert - O(1)
