// A queue is an ordered collection of data in which data is stored in FIFO (First In First Out) order.
// We will see how to implement it using single linked list in Javascript.

// List of operations performed on queue
// enqueue: Adds new data at the end of the queue.
// dequeue: Removes data from the front of the queue and returns it.
// front: Returns the first data from the front of the queue.
// rear: Returns the first data from the end of the queue.
// toArray: Returns the queue as the array.
// size: Returns the length of the queue.
// isEmpty: Returns true if queue is empty, false otherwise.
// clear: Clears the queue.

// Queue using linkedlist

// Node
class Node {
  constructor(elm, next = null) {
    this.element = elm;
    this.next = next;
  }
}

class QueueUsingLL {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  enqueue(elm) {
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

  dequeue() {
    let current = this.head;

    // If there is item then remove it
    // and make the next element as the first
    if (current) {
      let elm = current.element;

      current = current.next;
      this.head = current;
      this.length--;

      return elm;
    }

    return null;
  }

  front() {
    if (this.head) {
      return this.head.element;
    }

    return null;
  }

  // Return the last element in the queue
  rear() {
    let current = this.head;

    // If head is empty
    // Return null
    if (current === null) {
      return null;
    }

    // Return the last elememnt
    while (current.next) {
      current = current.next;
    }

    return current.element;
  }

  toArray() {
    let arr = [];
    let current = this.head;

    // We want to process the current node, even if it is the last node. Don't use current.next
    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  }

  size() {
    return this.length;
  }

  // Check if queue is empty
  isEmpty() {
    return this.size === 0;
  }

  // Clear the queue
  clear() {
    this.head = null;
    this.length = 0;
  }
}

let queue = new QueueUsingLL();
console.log(queue.isEmpty());
queue.enqueue("pranav");
queue.enqueue("sachin");
queue.enqueue("yogesh");
console.log(queue.toArray());
queue.dequeue();
queue.dequeue();
console.log(queue.toArray());
queue.enqueue("prashant");
queue.enqueue("yadav");
queue.dequeue();
console.log(queue.toArray());
console.log(queue.size());
console.log(queue.front());
console.log(queue.rear());

// Output:
// true
// ["pranav", "sachin", "yogesh"]
// ["yogesh"]
// ["prashant", "yadav"]
// 2
// "prashant"
// "yadav"
