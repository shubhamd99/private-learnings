// List data structure is a ADT (Abstract data type) with a collection of data in which items does not needs to be searched,
// added or removed in any sorted order.
// Just like a TO-DO list, a Grocery list, a Top-Ten list etc.

// Computers can utilize this list data structure for common problems.
// For more complex problems we will need some other advance data structures like Stack, Queue, Linked List and more.

// A list is an ordered sequence of data. Each data stored in the list is called an item and item can be of any data type.

// Items can be added to the beginning of the list or after any existing item in the list,
// we can remove the items from the list. We can also clear the whole list and reset it.

// You can also check the size of the list, A list with no items will be a empty list.

// The items of the list can be displayed together or we can display the single item at the current position.

// We can move at different position in the list, to front, to last, to next, to prev or to any given position.
// We can also check the current position in the list and use this to print the item at that position.

// We will create a list that will support the Strings, Numbers, Boolean, null, Object & Arrays.

// List of operation performed by list ADT
// size (method): Returns the size of the list.
// clear (method): Clears the list.
// print (method): Prints all the items of the list.
// getElement (method): Returns the item at the current position in the list.
// insert (method): Inserts a new item after the given item in the list.
// append (method): Adds a new item on the top of the list.
// remove (method): Removes the given item from the list.
// front (method): Moves the position to the first item in the list.
// rear (method): Moves the position to the last item in the list.
// prev (method): Moves the position to the previous item in the list.
// next (method): Moves the position to the next item in the list.
// currPos (method): Returns the current position in the list.
// moveTo (method): Moves to the specific position in the list.
// contains (method): Check if item is present in the list.

class List {
  constructor() {
    //Initialize the list
    this.listSize = 0; //track size of the list
    this.pos = 0; //track current position in the list
    this.items = []; //hold items
  }

  // Add item to the list
  append(element) {
    // Postfix Increment: value++ - Returns the OLD value → increments after
    // let x = 5;
    // console.log(x++); // 5  (returns old value)
    // console.log(x);   // 6  (now x becomes 6)

    this.items[this.listSize++] = element;
  }

  // Find item from the list
  // this won't work for objects and arrays
  find(element) {
    for (let idx = 0; idx < this.listSize; idx++) {
      // In order to make the list work with Objects and Arrays data
      if (typeof element === "object" && element !== null) {
        // Object.entries() returns an array of [key, value] pairs from an object’s own enumerable properties.
        // const arr = ["x", "y", "z"];
        // Object.entries(arr);
        // [["0", "x"], ["1", "y"], ["2", "z"]]
        if (
          Object.entries(this.items[idx]).toString() ===
          Object.entries(element).toString()
        ) {
          return idx;
        }
      } else if (this.items[idx] === element) {
        return idx;
      }
    }

    return -1;
  }

  // Remove item from the list
  remove(element) {
    const idx = this.find(element);

    if (idx > -1) {
      this.items.splice(idx, 1);
      // Prefix Increment: ++value = Increments first → returns the NEW value
      // let x = 5;
      // console.log(++x); // 6  (x becomes 6, returns 6)
      // console.log(x);   // 6
      --this.listSize;
      return true;
    }

    return false;
  }

  // Insert items at specific position in the list
  insert(element, after) {
    const insertPos = this.find(after);

    if (insertPos > -1) {
      this.items.splice(insertPos + 1, 0, element);
      ++this.listSize;
      return true;
    }

    return false;
  }

  // Check if item is present in the list
  contains(element) {
    const idx = this.find(element);
    return idx > -1 ? true : false;
  }

  // Move to the front of the list
  front() {
    this.pos = 0;
  }

  // Move to the end of the list
  rear() {
    this.pos = this.listSize - 1; // because array starts from 0 index
  }

  prev() {
    if (this.pos > 0) {
      --this.pos;
    }
  }

  next() {
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  }

  // Move to the specific position in the list
  pos(pos) {
    if (this.pos > 0 && this.pos <= this.listSize) {
      this.pos = pos - 1;
    }
  }

  currPos() {
    return this.pos;
  }

  // Get current item from the list
  getElement() {
    return this.items[this.pos];
  }

  size() {
    return this.listSize;
  }

  print() {
    return this.items.join(",");
  }

  clear() {
    this.listSize = 0;
    this.pos = 0;
    this.items = [];
  }
}

let list = new List();
list.append("Prashant");
list.append("Taha");
list.append({ a: 1, b: 2 });
list.insert([1, 2, 3, 4], "Taha");
console.log(list.print()); //print all the items of the string.
console.log(list.getElement());

list.next(); //move to next item
console.log(list.getElement());

list.rear(); //move to last item
console.log(list.getElement());

list.prev(); //move to prev item
console.log(list.getElement());

console.log(list.size()); //get the size of the list

list.remove("Taha");
list.remove({ a: 1, b: 2 });
console.log(list.size()); //get the size of the list
console.log(list.print()); //print all the items of the string.
