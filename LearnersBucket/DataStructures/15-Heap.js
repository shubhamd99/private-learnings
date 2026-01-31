// Heap is a specialized tree-based data structure developed by J.W.J Williams in 1964
// as data structure for heap sort.

// Heap is one efficient implementation of an abstract data structure called a priority queue.
// In a heap, the highest (or lowest) priority element is always stored at the root
// thus priority queue is often referred to as heaps irrespective of their implementation.

// Heap is the most useful data structure when it is necessary to repeatedly remove the object
// with the highest (or lowest) priority.

// One of the most common implementations of the heap is the binary heap which is basically a binary tree.

// A binary heap is basically a binary tree with two additional properties.

// Shape property: It must be a complete binary tree, which means all the levels of the tree,
// except the deepest (last) one are fully filled
// In case the last level of the tree is not complete, the nodes of that level are filled from left to right.

// Heap property: All nodes are either greater than or equal to or less than or equal to each of its children.
// If the parent nodes are greater than their child nodes, the heap is called a Max-Heap
// and if the parent nodes are smaller than their child nodes, the heap is called Min-Heap.

// List of operations performed on binary heap
// insert(num): Add a new key to the heap.
// delete(num): Removes a key from the heap.
// heapify: Create a (min or max) heap from the given array.
// findMax or (findMin): Return the max element from the heap or (min).
// extractMax or (extractMin): Remove and return the max element from the heap or (min).
// deleteMax or (deleteMin): Remove the max element from the heap or (min).
// size: Return the size of the heap.
// isEmpty: Is heap empty or not?.
// getList: Get the heap as an array.

// Binary heaps can be represented using an array with certain mathematical calculations.

// If the index of any element in the array is i,
// the element in the index 2i+1 will become the left child, and
// the element in the 2i+2 index will become the right child
// Also, the parent of any element at index i is given by the lower bound of (i-1)/2.
// Thus we can create the binary heap using an array rather than using a tree.

class BinaryHeap {
  constructor() {
    this.list = [];
  }

  // Heapify
  // The first operation which we will be adding is heapify, because
  // either after inserting or deleting a new element in the heap we will have to heapify it to retain the form.

  // To build a max-heap from any tree, we can start heapifying each sub-tree from the bottom up
  // and end up with a max-heap. Repeat this for all the elements including the root element.

  // In the case of a complete tree, the first index of a non-leaf node is given by n/2 - 1.
  // All other nodes after that are leaf-nodes and thus don’t need to be heapified.

  // Heapify
  maxHeapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1; // left child index
    let r = 2 * i + 2; // right child index

    // If left child is smaller than root
    if (l < n && arr[l] > arr[largest]) {
      largest = l;
    }

    // If right child is smaller than smallest so far
    if (r < n && arr[r] > arr[largest]) {
      largest = r;
    }

    // If smallest is not root
    if (largest != i) {
      let temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      // Recursively heapify the affected sub-tree
      this.maxHeapify(arr, n, largest);
    }
  }

  // Insert Value
  // To add a new element, we first check if the list is empty or not.
  // If it is empty then push the element directly, else we will have to heapify the list after addition.
  insert(num) {
    const size = this.list.length;
    if (size === 0) {
      this.list.push(num);
    } else {
      this.list.push(num);

      for (let i = parseInt(this.list.length / 2 - 1); i >= 0; i--) {
        this.maxHeapify(this.list, this.list.length, i);
      }
    }
  }

  delete(num) {
    const size = this.list.length;

    //Get the index of the number to be removed
    let i;
    for (i = 0; i < size; i++) {
      if (num === this.list[i]) {
        break;
      }
    }

    //Swap the number with last element
    [this.list[i], this.list[size - 1]] = [this.list[size - 1], this.list[i]];

    // Remove the last element
    this.list.splice(size - 1);

    // Heapify the list again
    for (let i = parseInt(this.list.length / 2 - 1); i >= 0; i--) {
      this.maxHeapify(this.list, this.list.length, i);
    }
  }

  findMax = () => this.list[0];

  deleteMax() {
    this.delete(this.list[0]);
  }

  extractMax() {
    const max = this.list[0];
    this.delete(max);
    return max;
  }

  size = () => this.list.length;

  isEmpty = () => this.list.length === 0;

  getList = () => this.list;
}

const heap = new BinaryHeap();
heap.insert(3);
heap.insert(4);
heap.insert(9);
heap.insert(5);
heap.insert(2);
console.log(heap.getList());

heap.delete(9);
console.log(heap.getList());

heap.insert(7);
console.log(heap.getList());

// Output:
// [9, 5, 4, 3, 2]
// [5, 3, 4, 2]
// [7, 5, 4, 2, 3]

// Applications
// Implementing a priority queue.
// Dijkstra’s Algorithm.
// Heap Sort.

// Access - O(N)
// Search - O(N)
// Insert - OLog(N)
// Delete - OLog(N)
// Find max or min - O(1)
// Delete max or min - OLog(N)
// Space - O(N)
