// https://leetcode.com/problems/implement-queue-using-stacks/description/

// Implement a first in first out (FIFO) queue using only two stacks.
// The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
// Queue - FIFO = First In, First Out
// Stack - LIFO = Last In, First Out

// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.

// push: O(1)
// pop: amortized O(1)
// peek: amortized O(1)
// empty: O(1)
// Space: O(n)

/*
To make a queue using stacks, use two stacks:

1. inStack
   Used for push.

2. outStack
   Used for pop and peek.

When we push: Add value to inStack.

When we pop or peek: If outStack is empty, move all values from inStack to outStack.
This reverses the order, so the oldest value comes to the top.

Example:
push 1, push 2, push 3

inStack = [1, 2, 3]

Move to outStack:
outStack = [3, 2, 1]

Now top of outStack is 1,
which is the first inserted value.

That gives queue behavior.
*/

var MyQueue = function () {
  this.inStack = [];
  this.outStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.inStack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  this.moveToOutStack();

  return this.outStack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  this.moveToOutStack();

  return this.outStack[this.outStack.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  this.inStack.length === 0 && this.outStack.length === 0;
};

MyQueue.prototype.moveToOutStack = function () {
  if (this.outStack.length === 0) {
    // reverse
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
