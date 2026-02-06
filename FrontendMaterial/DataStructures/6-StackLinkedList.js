// Stack using linked list
// A stack is an ordered collection of data in which data is inserted in LIFO (Last In First Out) order.
//  We will see how to implement it using a object based single linked list in Javascript.

// List of operations performed on stack
// Push: Adds the item in the stack at the top.
// Pop: Removes the top item from the stack and returns it.
// Peek: Shows the top item from the stack.
// toArray: Convert the stack to the array.
// size: Returns the size of the stack.
// isEmpty: Returns true if stack is empty, false other wise.
// clear: Clears the stack.

class Node {
  constructor(elm, next = null) {
    this.element = elm;
    this.next = next;
  }
}

// Array push/pop works at the end because the index is known,
// but in a singly linked list only the head is directly accessible,
// so stack operations are done at the head to maintain O(1) complexity.

class StackUsingLL {
  constructor() {
    // To keep track of the size
    this.length = 0;
    // To keep track of the list
    this.head = null;
  }

  push(element) {
    const node = new Node(element);
    let current;

    current = this.head;
    node.next = current;
    this.head = node;

    this.length++;
  }

  pop() {
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

  peek() {
    if (this.head) {
      return this.head.element;
    }

    return null;
  }

  toArray() {
    let arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }
}

let stack = new StackUsingLL(); //creating new instance of Stack
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());
console.log(stack.pop());
console.log(stack.toArray());
console.log(stack.size());
stack.clear(); //Clear the stack
console.log(stack.isEmpty());

//  Output:
//  3
//  false
//  3
//  3
//  [2, 1]
//  2
//  true
