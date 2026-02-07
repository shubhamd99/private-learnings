# JavaScript Data Structures & Algorithms (DSA) Knowledge Base

## Core Concepts

#### Big O Notation

- Big O Notation is a way to measure how well a computer algorithm scales as the number of data increases.

- We use Big O Notation to classify algorithms by how they respond to changes in input size, so algorithms with the same growth rate are represented with the same Big O Notation. The letter O is used because the rate of growth of a function is also called order of the function.

- Time Complexity - Time complexity of an algorithm signifies the total time required by the program to run till its completion. The time complexity of algorithms is most commonly expressed using the big O notation.

1. A constant operation O(1)
   `const total = people.length;`

2. A Linear operation O(n)
   `const names = people.map(({ name }) => name);`

3. A Quadratic operation O(n^2)

```
const peopleWithSameAge = people.filter
(
 ({ age }) =>
   people.filter(person => person.age == age)
   .length > 1
);
```

4. A Logarithmic notation or O(log(n)), this is very common in divide and conquer algorithms type (binary search)

```
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

5. Constants doesn't matter

```
O(2n) --> O(n)
O(500) --> O(1)
O(13n ^ 2) --> O(n ^ 2) n square
```

6. Smaller terms doesn't matter

```
O(n + 10) --> O(n)
O(1000n + 50) --> O(n)
O(n ^ 2  + 5n + 8) --> O(n2) n square
```

7. **Big O Shorthands**

- Arithmetic operations are constant.
- Variable assignment is constant.
- Accessing elements in an array (by index) or object (by key) is constant.
- In a loop, the complexity is the length of the loop times the complexity of whatever happens inside the loop.
- **Nested Loops**: O(n \* m) or O(n²) if both loops iterate over the same input.

#### Standard Big O Complexities (Ordered from Best to Worst)

| Complexity     | Name         | Description                                 | Example                               |
| :------------- | :----------- | :------------------------------------------ | :------------------------------------ |
| **O(1)**       | Constant     | Doesn't depend on input size.               | Accessing an array index.             |
| **O(log n)**   | Logarithmic  | Input size is halved each step.             | Binary Search.                        |
| **O(n)**       | Linear       | Time grows proportionally with input size.  | `for` loop over an array.             |
| **O(n log n)** | Linearithmic | Linear task done log n times.               | Merge Sort, Quick Sort.               |
| **O(n²)**      | Quadratic    | Nested loops over the same input.           | Bubble Sort, Nested loops.            |
| **O(2ⁿ)**      | Exponential  | Growth doubles with each addition to input. | Recursive Fibonacci.                  |
| **O(n!)**      | Factorial    | Growth is factorial of input size.          | Finding all permutations of a string. |

#### Space Complexity

- Space Complexity - The memory require by an algorithm to run. It is a measure of the amount of working storage an algorithm needs.

```
a. Auxilary Space - It is a temp space used by algorithm for execution, not including space taken up by the inputs.
b. Input Space - The space needed during execution considering the size of the input.
```

3. Rules of thumb

```
a. Most primitive (booleans, numbers, undefined, null) are constant space.
b. Strings require O(n) space (where n is the string length)
c. Reference types are generally O(n) , where n is the length (for arrays) or the number of keys (for objects)
```

#### Logarithms

- In mathematics, the logarithm is the inverse function to exponentiation. A logarithm is the power to which a number must be raised in order to get some other number.
- Searching algorithms have logrithmic time complexity, sorting algorithms involve logrithms and recursion somtimes involves logrithmic space complexity

```
Example: How many 2s do we multiply to get 8?
Answer: 2 × 2 × 2 = 8, so we had to multiply 3 of the 2s to get 8
So the logarithm is 3

The number we multiply is called the "base", so we can say:

"the logarithm of 8 with base 2 is 3"
or "log base 2 of 8 is 3"
or "the base-2 log of 8 is 3"

Example: What is log5(625) ... ?
5 × 5 × 5 × 5 = 625, so we need 4 of the 5s
Answer: log5(625) = 4
```

```
a. O(log n) --> Good
b. O(nlog n) --> Slightly Better than O(n^2)

```

![alt text](https://i.imgur.com/g8zYyt2.png)

#### Objects

- Un-ordered key value pairs
- Fast access/removal and insertion

```
BigO:

Insertion - O(1)
Removal - O(1)
Searching - O(N)
Access - O(1)

Object.keys - O(N)
Object.values - O(N)
Object.entries - O(N)
Object.hasOwnProperty - O(1)
```

#### Arrays

- Ordered List
- Fast access/removal (sort of..)

```
BigO:

Insertion - It depends..
Removal - It depends..
Searching - O(N)
Access - O(1)

push - O(1)
pop - O(1)
shift - O(N)
unshift - O(N)
concat - O(N)
slice - O(N)
splice - O(N)
sort - O(N * logN)
filter/forEach/map/reduce etc.. - O(N)
```

#### Algorithms

- A process or set of steps to accomplish a certain task. Almost everything you do in programming involves some kind of algorithm.

#### Understanding the Problem

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?
5. How should I label the important pieces of data that are a part of the problem.

#### Frequency Counters

- This pattern uses objects or sets to collect values/frequencies of values. This can often avoid the need for nested loops or (O^2) operations with arrays/strings.

#### Multiple Pointers

- Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle based on certain condition. Very efficient for solving problems with minimal space compexity as well.

#### Sliding Window

- This pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created). Very useful for keeping track of a subset of data in an array/string

#### Divide & Conquer

- This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data. This process can tremendously decrease time complexity. (Sorting Algorithms, Searching Algorithms).

#### Two Pointers (Variation of Multiple Pointers)

- Used primarily in sorted arrays/linked lists to search for pairs or a specific condition.
- **Example**: Sum of two numbers equals target in a sorted array.

#### Fast & Slow Pointers (Tortoise and Hare)

- Two pointers move at different speeds.
- **Example**: Finding the middle of a linked list or detecting a cycle in a linked list.

#### Heaps (Priority Queues)

- A specialized tree-based data structure that satisfies the heap property.
- **Max-Heap**: Parent node is always greater than or equal to children.
- **Min-Heap**: Parent node is always less than or equal to children.
- **Big O**: Insertion O(log N), Removal O(log N), Peak O(1).

#### Memoization & Dynamic Programming

- **Memoization**: Storing the results of expensive function calls and returning the cached result when the same inputs occur again.
- **Dynamic Programming**: Breaking a complex problem into smaller overlapping subproblems and storing their results.

#### ES6 Iterators and Generators

- Arrays, Strings, Maps, Sets, NodeLists - built-in iterators
- {Object} => Iterator => Generator

- In JavaScript an iterator is an object which defines a sequence and potentially a return value upon its termination.

- Specifically, an iterator is any object which implements the Iterator protocol by having a next() method that returns an object with two properties

1. value: The next value in the iteration sequence.
2. done: This is true if the last value in the sequence has already been consumed. If value is present alongside done, it is the iterator's return value.

- A generator is a function that can stop midway and then continue from where it stopped. In short, a generator appears to be a function but it behaves like an iterator.

- Generator functions provide a powerful alternative: they allow you to define an iterative algorithm by writing a single function whose execution is not continuous. Generator functions are written using the `function*` syntax

- The yield keyword is used to pause and resume a generator function

- The well-known Symbol.iterator symbol specifies the default iterator for an object. Used by for...of. For making an object iteratable by making one of our own.

##### Example:

```
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    let reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
        current = 0;
        next = 1;
    }
  }
}
```

#### Recursion?

A process (a function in our case) that calls itself.

- Example -
  1. JSON.stringify and JSON.parse
  2. document.getElementById and DOM traversal algorithms
  3. Object traversal

#### Call Stack

- In almost all program languages, there is a built in data structure that manages what happens when functions are invoked.
- Any time a function is invoked it is placed (pushed) on the top of the call stack
- When JS sees the return keyword or when the function ends, the compiler will remove (pop)
- When we write recursion functions, we keep pushing new functions onto the call stack!!

#### The Event Loop

- JavaScript is single-threaded and non-blocking. The Event Loop is the mechanism that handles asynchronous callbacks.

1.  **Call Stack**: LIFO structure where code is executed.
2.  **Web APIs**: Browser features (DOM, AJAX, setTimeout) that run parallel to the main thread.
3.  **Task Queue (Callback Queue)**: Holds callbacks (e.g., from `setTimeout`) ready to execute.
4.  **Microtask Queue**: Holds high-priority tasks (Promises, queueMicrotask).
5.  **The Loop**:
    - Checks if **Call Stack** is empty.
    - If empty, it processes **all** jobs in the **Microtask Queue** first.
    - Then, it picks **one** item from the **Task Queue** and pushes it to the Call Stack.

#### Virtual DOM & Reconciliation

- **Virtual DOM**: A lightweight JavaScript object representation of the real DOM. Updating it is fast because it doesn't involve painting to the screen.
- **Reconciliation**: The process of syncing the Virtual DOM with the Real DOM.
- **Diffing Algorithm**:
  - React compares the new Virtual DOM tree with the previous one.
  - **Elements of different types**: React tears down the old tree and builds a new one (e.g., `<div>` to `<span>`).
  - **DOM Elements**: React updates only modified attributes (className, style).
  - **Keys**: Essential for lists. Help React identify which items have changed, added, or removed.

#### Other Core Definitions

##### Hoisting

- The behavior where variable and function declarations are moved to the top of their scope during compilation.
- `var`: Hoisted and initialized with `undefined`.
- `let` / `const`: Hoisted but stay in the **Temporal Dead Zone (TDZ)** until the line of code is reached. Accessing them before fails.
- `function`: Fully hoisted. Can be called before definition.

##### Closures

- A function bundled together with references to its surrounding state (lexical environment).
- Allows a function to access variables from an outer function that has already returned.
- **Use Cases**: Data privacy (emulating private methods), partial application (currying), maintaining state in async callbacks.

##### Currying

- The process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument.
- `fn(a, b, c)` becomes `fn(a)(b)(c)`.

##### 'this' Keyword

- Refers to the object delivering the context for the code being executed.

1.  **Global**: `window` (or `global` in Node).
2.  **Implicit**: The object _left of the dot_ (e.g., `obj.method()`).
3.  **Explicit**: Using `.call()`, `.apply()`, or `.bind()`.
4.  **New**: When using `new` constructor, `this` refers to the newly created instance.
5.  **Arrow Functions**: Do not have their own `this`. They inherit it from the enclosing lexical scope.

##### Prototypal Inheritance

- Objects in JavaScript have a prototype property. When you access a property on an object, if it's not found, JS looks up the prototype chain until it finds it or hits `null`.
