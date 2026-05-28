/*
Deque means double-ended queue.
Monotonic means values move in only one direction:

It supports:
- pushBack: add at end
- popBack: remove from end
- pushFront: add at front
- popFront: remove from front
- front: read front value
- back: read back value

For Sliding Window Maximum, we mainly need:
- pushBack
- popBack
- popFront
- front
- back

This implementation avoids Array.shift(),
because shift() is O(n) in JavaScript.
*/

class Deque {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  size() {
    return this.backIndex - this.frontIndex;
  }

  isEmpty() {
    return this.size() === 0;
  }

  // backIndex points to the next empty position.
  // So put value there first.
  // Then move backIndex to the next empty position.
  pushBack(value) {
    this.items[this.backIndex] = value;
    this.backIndex++;
  }

  // backIndex points one step after the last item.
  // So to remove the last item, first move backIndex back to the actual last item.
  popBack() {
    if (this.isEmpty()) return undefined;

    this.backIndex--;
    const value = this.items[this.backIndex];
    delete this.items[this.backIndex];

    return value;
  }

  // frontIndex points to the current first item.
  // To add before it, move frontIndex backward first.
  pushFront(value) {
    this.frontIndex--;
    this.items[this.frontIndex] = value;
  }

  // frontIndex points directly at the first item.
  // So remove that item first.
  // Then move frontIndex to the next item.
  popFront() {
    if (this.isEmpty()) return undefined;

    const value = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;

    return value;
  }

  front() {
    if (this.isEmpty()) return undefined;
    return this.items[this.frontIndex];
  }

  back() {
    if (this.isEmpty()) return undefined;
    return this.items[this.backIndex - 1];
  }
}

export default Deque;
