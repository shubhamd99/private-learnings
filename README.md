# Big O Notation: Time and Space Complexity

Big O notation is used to describe the performance or complexity of an algorithm. It describes the worst-case scenario, and can be used to describe the execution time required or the space used (e.g., in memory) by an algorithm.

## How to Calculate Time Complexity

1. **Ignore Constants:**
   If an algorithm takes `O(2N)` time, we drop the constant and consider it `O(N)`. `O(N)` simply means that the time scales linearly with the input size.

2. **Drop Non-Dominant Terms:**
   If an algorithm takes `O(N^2 + N)` time, the `N^2` term will dominate the `N` term for large inputs. Thus, we drop the `N` and call it `O(N^2)`.

3. **Multi-Part Algorithms:**
   - **Add Runtimes:** If your algorithm is in the form "do this, then, when you're all done, do that," you add the runtimes.
     ```javascript
     for (let a of A) {
       console.log(a);
     }
     for (let b of B) {
       console.log(b);
     }
     ```
     **Time Complexity:** `O(A + B)`
   - **Multiply Runtimes:** If your algorithm is in the form "do this for each time you do that," you multiply the runtimes.
     ```javascript
     for (let a of A) {
       for (let b of B) {
         console.log(a, b);
       }
     }
     ```
     **Time Complexity:** `O(A * B)`

## How to Calculate Space Complexity

Space complexity is a parallel concept to time complexity. It measures the total amount of memory that an algorithm or operation needs to run according to its input size.

- **Constant Memory:** Creating a few isolated variables takes `O(1)` space.
- **Data Structures:** Creating an array, list, or hash map of size `n` takes `O(N)` space. A two-dimensional array of size `n x n` takes `O(N^2)` space.
- **Call Stack (Recursion):** Recursive calls add to the stack memory. Each level of the recursive call stack takes up memory. If an algorithm recurses `n` times before returning, it takes `O(N)` space.

## Possible Complexities (From Best to Worst)

| Complexity       | Name              | Example Algorithm / Operation                          |
| :--------------- | :---------------- | :----------------------------------------------------- |
| **`O(1)`**       | Constant Time     | Accessing an array element by index, Hash Table lookup |
| **`O(log N)`**   | Logarithmic Time  | Binary Search, operations on a Binary Search Tree      |
| **`O(N)`**       | Linear Time       | Looping through an array, Linear Search                |
| **`O(N log N)`** | Linearithmic Time | Merge Sort, Heap Sort, Quick Sort (average case)       |
| **`O(N^2)`**     | Quadratic Time    | Bubble Sort, Insertion Sort, Nested Loops              |
| **`O(N^3)`**     | Cubic Time        | Matrix Multiplication (naive), Triple nested loops     |
| **`O(2^N)`**     | Exponential Time  | Recursive Fibonacci, Generating subsets (Power Set)    |
| **`O(N!)`**      | Factorial Time    | Generating all permutations of a string or array       |

## Code Examples for Beginners

To make it easier to understand, here are a few simple code examples showing common time and space complexities:

### `O(1)` Constant Time & Space

The operation takes the same amount of time and memory, regardless of how big the input is.

```javascript
function getFirstElement(arr) {
  // Time: O(1) - we only do one direct lookup operation
  // Space: O(1) - we don't create any new arrays or use extra memory
  return arr[0];
}
```

### `O(N)` Linear Time & Space

The time or space it takes grows proportionally to the size of the input `N`.

```javascript
function printAllElements(arr) {
  // Time: O(N) - we loop through all 'N' elements in the array
  // Space: O(1) - we just print, no extra memory used
  for (let item of arr) {
    console.log(item);
  }
}

function createCopy(arr) {
  // Time: O(N) - looping through 'N' elements
  // Space: O(N) - we create a NEW array of size 'N'
  const newArr = [];
  for (let item of arr) {
    newArr.push(item);
  }
  return newArr;
}
```

### `O(N^2)` Quadratic Time

The time it takes grows proportionally to `N` squared. You'll usually see this with nested loops.

```javascript
function printAllPairs(arr) {
  // Time: O(N^2) - for every element, we loop through the array again
  // Space: O(1) - no extra memory used
  for (let i of arr) {
    for (let j of arr) {
      console.log(i, j);
    }
  }
}
```

### `O(log N)` Logarithmic Time

The time it takes grows very slowly as the input grows. We typically see this when we cut the problem size in half each step (like looking up a word in a dictionary by flipping to the middle).

```javascript
function binarySearch(arr, target) {
  // Time: O(log N) - we halve the search space at each step
  // Space: O(1) - we only use a few pointers (left, right, mid)
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
```

## Major Data Structures

Here are the most common data structures you will encounter, along with a brief definition of each:

- **Array:** A collection of items stored at contiguous memory locations. Elements can be accessed randomly using an index.
- **Linked List:** A linear collection of elements (nodes) where each node points to the next node. Memory is not contiguous, making insertions/deletions easier than arrays.
- **Stack:** A Last-In-First-Out (LIFO) data structure. Elements are added (pushed) and removed (popped) from the same end (the top).
- **Queue:** A First-In-First-Out (FIFO) data structure. Elements are added (enqueued) at the back and removed (dequeued) from the front.
- **Hash Table (Map / Object / Dictionary):** A structure that maps keys to values for highly efficient lookup, insertion, and deletion operations.
- **Tree:** A hierarchical data structure consisting of nodes connected by edges, starting from a single root node.
  - **Binary Search Tree (BST):** A tree where each node has at most two children. The left child is always less than the parent, and the right child is greater.
- **Graph:** A set of nodes (vertices) connected by edges. Used to represent networks like social connections, maps, or state machines.
- **Heap (Priority Queue):** A special tree-based structure where the parent node is always larger (Max-Heap) or smaller (Min-Heap) than its children. Useful for quickly finding the max or min element.
- **Trie (Prefix Tree):** A specialized tree used for storing and quickly retrieving strings, often used in autocomplete features or spell-checking.
