// A stack is an ordered collection of items that follow (LIFO) Last In First Out principle.
// The addition and removal of items take place at same end i.e at the top.
// The newest elements are at the top and the oldest elements are at the bottom unlike in Queue.

// A Stack is used by compilers in programming languages,
// by computer memory to store variables and functions call,
// in text editors to perform undo & redo operations

// push(): Adds a single or multiple items to the top of the Stack.
// pop(): Removes and Returns the top item of the Stack.
// peek(): Returns the top item of the Stack.
// isEmpty(): Returns True if Stack is empty, False otherwise.
// clear(): Removes all the items of the Stack.
// size(): Returns the length of the stack.

// O(1) (Constant Time) → Execution time stays the same regardless of input size.
// O(n) (Linear Time) → Execution time grows proportionally with input size.

// Time complexity
// Access - O(n)
// Search - O(n)
// Insert - O(1)

// Space complexity
// O(n)

function Stack() {
  var items = [];
  var top = 0;

  this.push = function (element) {
    // Postfix Increment: value++ - Returns the OLD value → increments after
    // let x = 5;
    // console.log(x++); // 5  (returns old value)
    // console.log(x);   // 6  (now x becomes 6)
    this.items[top++] = element;
  };

  //Pop an item from the Stack
  this.pop = function () {
    return items[--top];
  };
  //--top, first decrements the value then performs the operation

  //Peek top item from the Stack
  this.peek = function () {
    return items[top - 1];
  };

  //Is Stack empty
  this.isEmpty = function () {
    return top === 0;
  };

  //Clear the Stack
  this.clear = function () {
    top = 0;
  };

  //Size of the Stack
  this.size = function () {
    return top;
  };
}

class Stack {
  // # is used to declare private fields or private methods inside a class.
  #items;

  constructor(iterable = []) {
    // private field to store items
    this.#items = Array.from(iterable);
  }

  push(value) {
    this.#items.push(value);
    return this.size; // optional: return new size
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.isEmpty ? undefined : this.#items[this.#items.length - 1];
  }

  clear() {
    this.#items.length = 0;
  }

  get size() {
    return this.#items.length;
  }

  get isEmpty() {
    return this.#items.length === 0;
  }

  toArray() {
    // return a shallow copy (top of stack at the end)
    return this.#items.slice();
  }

  // make the stack iterable (from bottom to top)
  // Symbol is a special primitive type used to create unique identifiers
  // Symbol.iterator is a special built-in Symbol that tells JavaScript that this object is iterable
  [Symbol.iterator]() {
    let i = 0;
    const arr = this.#items;
    return {
      next() {
        if (i < arr.length) return { value: arr[i++], done: false };
        return { value: undefined, done: true };
      },
    };
  }
}

const s = new Stack();
s.push(1);
s.push(2);
console.log(s.peek()); // 2
console.log(s.pop()); // 2
console.log(s.size); // 1

// Symbol is a special primitive type used to create unique identifiers
// Avoid key collisions
// Perfect when you want to add properties to an object without interfering with existing ones.

// const secret = Symbol("secret");
// const user = {
//   name: "Shubham",
//   [secret]: "hidden value"
// };
// console.log(user[secret]); // hidden value
// console.log(user.secret);  // undefined

// Stack using ES6 WeakMap.
const items = new WeakMap();
class Stack {
  constructor() {
    items.set(this, []);
  }

  //other methods go here
  //Push an item in the Stack
  push = function (element) {
    let temp = items.get(this);
    temp.push(element);
  };

  //Pop an item from the Stack
  pop = function () {
    let temp = items.get(this);
    return temp.pop();
  };

  //Peek top item from the Stack
  peek = function () {
    let temp = items.get(this);
    return temp[temp.length - 1];
  };

  //Is Stack empty
  isEmpty = function () {
    let temp = items.get(this);
    return temp.length === 0;
  };

  //Clear the Stack
  clear = function () {
    let temp = items.get(this);
    temp.length = 0;
  };

  //Size of the Stack
  size = function () {
    let temp = items.get(this);
    return temp.length;
  };
}

// Automatic garbage collection cleanup
// When the Stack instance is garbage-collected:
// let s = new Stack();
// s = null; // no reference anymore
// The WeakMap entry (its internal array) is automatically removed by JS engine.
// No memory leak
// No need to manually delete internal data
// WeakMap does this automatically because it holds a weak reference to the key
