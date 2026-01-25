// As queues are widely used in computer programming and in real lives as well,
// there was a need for some different models of original queue data structure
// to process the data more efficiently.

// A priority queue is one of the variants of the original queue.
// In this elements are added and removed based on their priorities.

// An Abstract Data Type (ADT) is a logical, user-defined model that defines a
// data structure's behavior—specifically, its operations (what it does) and data type—without specifying
// its implementation details (how it does it). It focuses on "what" rather than "how,"
// enabling modularity, data abstraction, and, often, cleaner code.

// It is an abstract data type that captures the idea of a container
// whose elements have priorities attached to them

//  An element of highest priority always appears at the front of the queue.
// If that element is removed, the next highest priority element advances to the front.

// A real-life example of the priority queue are the patients in the hospitals,
// the one with at most priority are treated first and then the others.

// Another example is people standing in a queue at the boarding line at the airport,
// first and second class (Business class) passengers get priority over the coach class (Economy).

// Why do we need priority queue?

// Dijkstra’s Shortest Path Algorithm using priority queue:
// When the graph is stored in the form of an adjacency list or matrix,
// a priority queue can be used to extract minimum efficiently when implementing Dijkstra’s algorithm.

// Prim's algorithm: to store keys of nodes and extract minimum key node at every step.

// Data compression: It is used in Huffman Codes which is used to compresses data.

// Operating system: It is used by operating systems for load balancing.

// List of operations performed on priority queue
// enqueue(): Adds an item at the tail of the queue.
// dequeue(): Removes an item from the head of the queue.
// front(): Returns the first item in the queue.
// rear(): Returns the last item in the queue.
// size(): Returns the size of the queue.
// isEmpty(): Returns true if queue is empty, false otherwise.

// There are two ways of implementing a priority queue.
// Add elements at appropriate place based on their priorities.
// Queue elements as they are added and remove them according to their priorities.

// Container
class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // Add a new element in queue
  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);

    // To check if element is added
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      // We are using giving priority to higher numbers
      // If new element has more priority then add it at that place
      if (queueElement.priority > this.items[i].priority) {
        // This inserts queueElement at index i.
        this.items.splice(i, 0, queueElement);

        // Mark the flag true
        added = true;
        break;
      }
    }

    // If element is not added
    // Then add it to the end of the queue
    if (!added) {
      this.items.push(queueElement);
    }
  }

  // Remove element from the queue
  dequeue() {
    return this.items.shift();
  }

  // Return the first element from the queue
  front() {
    return this.items[0];
  }

  // Return the last element from the queue
  rear() {
    return this.items[this.items.length - 1];
  }

  // Check if queue is empty
  isEmpty() {
    return this.items.length == 0;
  }

  // Return the size of the queue
  size() {
    return this.items.length;
  }

  // Print the queue
  print() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(`${this.items[i].element} - ${this.items[i].priority}`);
    }
  }
}

let pQ = new PriorityQueue();
pQ.enqueue(1, 3);
pQ.enqueue(5, 2);
pQ.enqueue(6, 1);
pQ.enqueue(11, 1);
pQ.enqueue(13, 1);
pQ.enqueue(10, 3);
pQ.dequeue();
pQ.print();

// Output:
// "10 - 3"
// "5 - 2"
// "6 - 1"
// "11 - 1"
// "13 - 1"
