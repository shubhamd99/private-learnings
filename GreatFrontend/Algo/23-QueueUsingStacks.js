// Queue Using Stacks
// Implement a FIFO queue using only two stacks.
// Support: push(val), pop(), peek(), empty()
//
// Input:
//   push(1), push(2), push(3)
//   peek()  → 1   (front of queue)
//   pop()   → 1
//   pop()   → 2
//   empty() → false

// ---- SIMPLE VERSION (for interviews) ----
// Idea: two stacks — inbox and outbox.
// push() → always push to inbox.
// pop()/peek() → if outbox is empty, pour all of inbox into outbox (reverses order).
//   This gives us FIFO: oldest element is now on top of outbox.
// Amortized O(1) per operation — each element moves at most once.

class MyQueue {
  constructor() {
    this.inbox = []; // for push
    this.outbox = []; // for pop/peek
  }

  push(val) {
    this.inbox.push(val);
  }

  pop() {
    this._refill();
    return this.outbox.pop();
  }

  peek() {
    this._refill();
    return this.outbox[this.outbox.length - 1];
  }

  empty() {
    return this.inbox.length === 0 && this.outbox.length === 0;
  }

  // pour inbox into outbox only when outbox is empty
  _refill() {
    if (this.outbox.length === 0) {
      while (this.inbox.length > 0) {
        this.outbox.push(this.inbox.pop());
      }
    }
  }
}

// Example
const q = new MyQueue();
q.push(1);
q.push(2);
q.push(3);
console.log(q.peek()); // 1 (FIFO)
console.log(q.pop()); // 1
console.log(q.pop()); // 2

// ---- NORMAL QUEUE (for reference) ----
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(val) {
    this.items.push(val);
  }
  dequeue() {
    return this.items.shift();
  } // O(n) — shift re-indexes array
  peek() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

// Note: for O(1) dequeue in a real queue, use a linked list or a circular buffer.

// Time: push O(1), pop/peek amortized O(1)
// Space: O(n)
