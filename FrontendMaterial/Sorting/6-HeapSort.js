/**
 * HEAP SORT
 * - Uses a Max-Heap data structure.
 * - Phase 1: Build a max-heap from the array (largest element at root).
 * - Phase 2: Repeatedly extract the max (root), place it at the end,
 *            and re-heapify the remaining elements.
 *
 * Time Complexity:
 *   Best:    O(n log n)
 *   Average: O(n log n)
 *   Worst:   O(n log n)
 * Space Complexity: O(1) — in-place
 * Stable: NO
 */

function heapSort(arr) {
  const n = arr.length;

  // Phase 1: Build max-heap
  // Start from last non-leaf node and heapify down
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Phase 2: Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (max) to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Heapify the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

// Ensure subtree rooted at index i satisfies max-heap property
function heapify(arr, heapSize, i) {
  let largest = i;       // Assume root is largest
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
    heapify(arr, heapSize, largest); // Recursively fix the affected subtree
  }
}

// Example
const arr = [12, 11, 13, 5, 6, 7];
console.log("Before:", [...arr]);
console.log("After: ", heapSort(arr));
// After: [5, 6, 7, 11, 12, 13]

/**
 * Max-Heap for [12, 11, 13, 5, 6, 7]:
 *
 *         13
 *        /   \
 *      11     12
 *     /  \   /
 *    5    6 7
 *
 * Extract 13 → put at end, re-heapify remaining.
 * Extract 12 → put at end-1, re-heapify...
 * Repeat until sorted.
 */
