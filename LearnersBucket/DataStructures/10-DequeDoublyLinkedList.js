// Deque or Double-ended queue is a generalized version of queue in which data can be added or removed from both the ends.
// It works like both a stack and queue and can be used as any of them.
// We have already implemented the Deque data structure with the circular array,
// but here we will see how can we implement deque with a doubly-linked list.

class Node {
  constructor(elm, prev = null, next = null) {
    this.element = elm;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLL {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  append(elm) {
    const node = new Node(elm);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  insert(position, element) {
    if (position >= 0 && position <= this.length) {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;

      if (position === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (position === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }

      this.length++;
      return true;
    }

    return false;
  }

  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let current = this.head;
      let previous;
      let index = 0;

      if (position === 0) {
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = current.next;
          this.head.prev = null;
        }
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
        current.next.prev = previous;
      }

      this.length--;
      return current.element;
    }

    return null;
  }

  indexOf(elm) {
    let current = this.head;
    let index = -1;

    while (current) {
      if (elm === current.element) {
        return ++index;
      }

      index++;
      current = current.next;
    }

    return -1;
  }

  isPresent(elm) {
    return this.indexOf(elm) !== -1;
  }

  delete(elm) {
    return this.removeAt(this.indexOf(elm));
  }

  deleteHead() {
    this.removeAt(0);
  }

  deleteTail() {
    this.removeAt(this.length - 1);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toString() {
    let current = this.head;
    let string = "";

    while (current) {
      string += current.element + (current.next ? "\n" : "");
      current = current.next;
    }

    return string;
  }

  toArray() {
    let current = this.head;
    let arr = [];

    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  }
}

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

class DequeWithDLL {
  constructor() {
    this.dll = new DoubleLL();
  }

  insertFront(elm) {
    this.dll.insert(0, elm);
    return true;
  }

  insertBack(elm) {
    let length = this.dll.size();
    this.dll.insert(length, elm);
    return true;
  }

  removeFront() {
    return this.dll.deleteHead();
  }

  removeBack() {
    return this.dll.deleteTail();
  }

  getFront() {
    let head = this.dll.getHead();
    return head && head.element;
  }

  getBack() {
    let tail = this.dll.getTail();
    return tail && tail.element;
  }

  isEmpty() {
    return this.dll.isEmpty();
  }

  size() {
    return this.dll.size();
  }

  clear() {
    this.dll = new DoubleLL();
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let current = this.dll.getHead();
    let objString = "";

    while (current) {
      objString = current.element + " " + objString;
      current = current.next;
    }

    return objString.trim();
  }
}

let deque = new DequeWithDLL();
deque.insertBack(5);
deque.insertBack(10);
console.log(deque.getBack());
deque.removeBack();
console.log(deque.getBack());
deque.insertFront(15);
console.log(deque.getFront());
deque.removeFront();
console.log(deque.getFront());
console.log(deque.toString());

// Output:
// 10
// 5
// 15
// 5
// '5'

// Time Complexity (Average and Worst)
// Search - O(n)
// Access - O(1)
// Insert - O(1)
