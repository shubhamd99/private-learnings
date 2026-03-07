/**
 * QUICK SORT
 * - Divide and Conquer algorithm.
 * - Picks a "pivot" element and partitions the array into:
 *   elements less than pivot | pivot | elements greater than pivot
 * - Recursively sorts each partition.
 *
 * Time Complexity:
 *   Best:    O(n log n)
 *   Average: O(n log n)
 *   Worst:   O(n²) — when pivot is always smallest/largest (sorted array)
 * Space Complexity: O(log n) — recursive call stack
 * Stable: NO
 */

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);  // Sort left of pivot
    quickSort(arr, pivotIndex + 1, high); // Sort right of pivot
  }

  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Pick last element as pivot
  let i = low - 1;         // Index of smaller element

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap smaller element to left
    }
  }

  // Place pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Example
const arr = [10, 7, 8, 9, 1, 5];
console.log("Before:", [...arr]);
console.log("After: ", quickSort(arr));
// After: [1, 5, 7, 8, 9, 10]

/**
 * Step-by-step for [10, 7, 8, 9, 1, 5]:
 * pivot = 5
 * Partition: [1, 5, 8, 9, 10, 7] → pivot 5 is at index 1
 * Left  [1]    → already sorted
 * Right [8, 9, 10, 7] → pivot = 7
 *   Partition: [7, 9, 10, 8] → pivot 7 at index 0 of sub-array
 *   Continue recursively...
 * Final: [1, 5, 7, 8, 9, 10]
 */
