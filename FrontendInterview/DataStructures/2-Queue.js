// A queue is an ordered collection of items that follow FIFO (First In First Out) principle also known as 'First come first served'.

// Unlike Stack Items are added at the tail i.e end of the queue and items are removed from the head i.e start of the queue.
// An item must wait until it is their term to be removed or all items before they are removed.

// Queue is used widely in computer science for ordering the processes submitted to an operating system
// or to maintain the order in which document will be printed by a printer
// Also, compilers use the queue to order the response after the execution.

// enqueue(): Adds an item at the tail of the queue.
// dequeue(): Removes an item from the head of the queue.
// front(): Retruns the first item in the queue.
// rear(): Retruns the last item in the queue.
// size(): Returns the size of the queue.
// isEmpty(): Returns true if queue is empty, false otherwise.

// O(1) (Constant Time) → Execution time stays the same regardless of input size.
// O(n) (Linear Time) → Execution time grows proportionally with input size.

// Time complexity
// Access - O(n)
// Search - O(n)
// Insert - O(1)

// Space complexity
// O(n)

class Queue {
  constructor() {
    this.items = [];
  }

  //Add a new element in queue
  enqueue = (elm) => {
    this.items.push(elm);
  };

  //Remove element from the queue
  dequeue = () => {
    // Removes the FIRST element from an array and returns that removed element.
    return this.items.shift();
  };

  //Return the first element from the queue
  front = () => {
    return this.items[0];
  };

  //Return the last element from the queue
  rear = () => {
    return this.items[this.items.length - 1];
  };

  //Check if queue is empty
  isEmpty = () => {
    return this.items.length == 0;
  };

  //Return the size of the queue
  size = () => {
    return this.items.length;
  };

  //Print the queue
  print = () => {
    console.log(this.items.toString());
  };
}

// Queue using ES6 and WeakMap.
// Automatic garbage collection cleanup
// let q = new Queue();
// ...
// q = null;

const items = new WeakMap();
class Queue {
  constructor() {
    items.set(this, []);
  }

  //Add a new element in queue
  enqueue = (elm) => {
    let temp = items.get(this);
    temp.push(elm);
  };

  //Remove element from the queue
  dequeue = () => {
    let temp = items.get(this);
    return temp.shift();
  };

  //Return the first element from the queue
  front = () => {
    let temp = items.get(this);
    return temp[0];
  };

  //Return the last element from the queue
  rear = () => {
    let temp = items.get(this);
    return temp[temp.length - 1];
  };

  //Check if queue is empty
  isEmpty = () => {
    let temp = items.get(this);
    return temp.length == 0;
  };

  //Return the size of the queue
  size = () => {
    let temp = items.get(this);
    return temp.length;
  };

  //Print the queue
  print = () => {
    let temp = items.get(this);
    console.log(temp.toString());
  };
}
