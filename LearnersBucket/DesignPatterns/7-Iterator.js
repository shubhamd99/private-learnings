// All the programming languages have a way to store data in multiple formats or structures
// and these data can be looped using different loops that are provided.

// For example, in JavaScript, we can use the for, and while loops on the Array, Objects, Sets, and Maps.

// While they get most of the work done, there is often we want to iterate these collections of data at convince,
// getting the next data from the collection at the method invocation.

// const arr = [1, 2, 3, 4];
// const iterator = createIterator(arr);

// iterator.next(); // {value: 1, done: false}

// What is an iterator in JavaScript?
// The iterator is a function that takes the collection as input and returns an object that has different methods, majorly next().

// next() returns an object with the next value from the collection in the sequence
// and flag determining if we have reached the end of the collection.

// {value: 10, done: false}

// We can create a custom iterator function by creating a closure with a variable
// that will track the items returned and then return an object from the function that will have a method next().

function createIterator(collection) {
  let i = 0;
  return {
    next() {
      if (i < collection.length) {
        // Postfix Increment: value++ - Returns the OLD value → increments after
        return { value: collection[i++], done: false };
      }

      return { value: null, done: true };
    },
  };
}

const arr = [1, 2, 3];
const iterator = createIterator(arr);
console.log(iterator.next());
// {"value": 1, "done": false }

console.log(iterator.next());
// {"value": 2, "done": false }

console.log(iterator.next());
// {"value": 3, "done": false }

console.log(iterator.next());
// {"value": null, "done": true }

// The purpose of the iterator pattern is to provide similar methods to a different type of data structures
// to iterate on the values in a different sequence.

// For example, on the binary search tree, we can create an iterator to return the tree values
// in a breadth-first search manner or depth-first search manner by accepting extra arguments while creating the iterator.

// Thankfully after ES6, Symbol.iterator and Generator functions were introduced in JavaScript
// which helps to create an iterator more conveniently.

// Creating iterators using Generator functions in JavaScript

function* Gen() {
  yield* ["a", "b", "c"];
}

const g = Gen();

console.log(g.next());
// { value: "a", done: false }

console.log(g.next());
// { value: "b", done: false }

console.log(g.next());
// { value: "c", done: false }

console.log(g.next());
// { value: undefined, done: false }

// Creating iterators using Symbol.iterator static method

const g2 = {};

g2[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...g2]);
// [1,2,3]

// Strings, Arrays, Maps, WeakMaps, Sets, and WeakSets, all come with an iterator inbuilt while Objects don’t.
// An easy to determine if your data is iterable is by using the spread operator and
// see if we can spread the values [....[1, 2, 3]], alternatively you can also use for…of the loop for determination.

// An iterable can be iterated multiple times or only once depending upon the case defined.

// We can use the Generators functions to create iterators that will iterate only once.

function* createIterator2() {
  yield 1;
  yield 2;
}

const iterator2 = createIterator2();

for (const item of iterator2) {
  console.log(item);
}
// 1
// 2

// this won't run
for (const item of iterator2) {
  console.log(item);
}

// While multiple iterable iterators can be created using Symbol.iterator

const customIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const value of customIterable) {
  console.log(value);
}
// 1
// 2
// 3

for (const value of customIterable) {
  console.log(value);
}
// 1
// 2
// 3

// Iterable created using the generator functions, provide the next() method.
// The next() method accepts arguments, that we can use to modify the nature of the next output.
// For example, assume you are assigning values based on the round-robin principle on each invocation,
// you can pass the value to the next() method to reset it at any point.

// Round Robin is a scheduling principle where tasks are processed one by one in a circular order,
// giving each task a fixed time or turn, and then moving to the next.

function* RoundRobin(collection) {
  let current = 0;
  // Makes the generator never finish
  while (true) {
    // Postfix Increment: value++ - Returns the OLD value → increments after
    const reset = yield collection[current++ % collection.length]; // 0 → 1 → 2 → 3 → 0 → 1 → 2 → 3 → ...
    // The true is sent back into generator, It becomes the value of reset. rr.next(true);
    if (reset) {
      current = 0;
    }
  }
}

const rr = RoundRobin([1, 2, 3, 4]);
console.log(rr.next()); //{"value": 1, "done": false }
console.log(rr.next()); //{"value": 2, "done": false }
console.log(rr.next()); //{"value": 3, "done": false }
console.log(rr.next(true)); //{"value": 1, "done": false } // reset's the counter
console.log(rr.next()); //{"value": 2, "done": false }
console.log(rr.next()); //{"value": 3, "done": false }
console.log(rr.next()); //{"value": 4, "done": false }
console.log(rr.next()); //{"value": 1, "done": false }

// We can use singleton pattern along with the iterator and
// share the round-robin logic throughout the application code.
// This is a very useful and strong pattern that really helps to create a robust application.

// const Scheduler = Singleton(RoundRobin([...workers]));
// Scheduler.next();

// Combining Singleton with Iterator-based Round Robin creates a single, shared, stateful scheduler
// that fairly distributes work across the entire application.
