// HEAP
// A heap is a special tree-like structure used to quickly get the smallest or largest value.
// For this problem, we use a min-heap, Min-heap meaning - The smallest value is always at the top.
// Max-heap sounds natural because we want “largest”.
// But for kth largest, min-heap of size k is better because it keeps only the top k largest numbers.

// IMP
// Min-heap maintains the smallest value at the top, not complete sorted order.
// So yes, when we push/pop, the heap rearranges itself enough to keep: minimum at the top

// For min-heap of size k:
// Time: O(n log k)
// Space: O(k)

// We process n numbers.
// Each push/pop costs O(log k).
// Heap size never grows bigger than k + 1.

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return min;
  }

  // In a heap stored as an array, this formula finds the parent index of a node.
  // index:  0  1  2  3  4  5  6
  // value: [1, 3, 2, 7, 5, 4, 6]
  //           index 0
  //         /         \
  //     index 1      index 2
  //     /    \       /    \
  // index3 index4 index5 index6

  // parent = Math.floor((index - 1) / 2)
  // index = 1, parent = floor((1 - 1) / 2) = 0
  // index = 3, parent = floor((3 - 1) / 2) = 1
  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent] <= this.heap[index]) break;

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];

      index = parent;
    }
  }

  // index:  0  1  2  3  4  5  6
  // value: [1, 3, 2, 7, 5, 4, 6]
  //           index 0
  //         /         \
  //     index 1      index 2
  //     /    \       /    \
  // index3 index4 index5 index6

  // calculate its children:
  // left = 2 * 0 + 1 = 1
  // right = 2 * 0 + 2 = 2
  bubbleDown(index) {
    const n = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      // When we remove the top/smallest element,
      // we move the last element to the top.
      // But that new top may be bigger than its children,
      // so we push it down until heap order is fixed.

      // If left child exists and left child is smaller than current smallest,
      // then left child is now the smallest.
      if (left < n && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      //  If right child exists and right child is smaller than current smallest,
      //  then right child is now the smallest.
      if (right < n && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      // Swap current node with the smaller child.
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      // Continue checking from the child position where we moved the value.
      index = smallest;
    }
  }
}

export default MinHeap;
