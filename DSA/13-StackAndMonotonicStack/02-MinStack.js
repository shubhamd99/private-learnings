// https://leetcode.com/problems/min-stack/description/

// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// Implement the MinStack class:

// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
// You must implement a solution with O(1) time complexity for each function.
// push: O(1)
// pop: O(1)
// top: O(1)
// getMin: O(1)
// Space: O(n)

// Pattern - Stack / Auxiliary Stack
// main stack     -> stores actual values
// auxiliary stack -> stores minimum values
// monotonic stack -> Monotonic stack means a stack that keeps values in one order: increasing or descreasing

/*
Logic: Use two stacks.

stack: Stores all normal values.

minStack: Stores the minimum value at each stack level.

Why minStack?
We need getMin() in O(1).
If we scanned the whole stack every time, it would be O(n).

Whenever we push a value:
- push it into normal stack
- also push the current minimum into minStack

So minStack top always tells the minimum of the current stack.

When we pop: pop from both stacks
*/

var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);

  if (this.minStack.length === 0) {
    this.minStack.push(val);
  } else {
    const currentMin = this.minStack[this.minStack.length - 1];
    this.minStack.push(Math.min(val, currentMin));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
