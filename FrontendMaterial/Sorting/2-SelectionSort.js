/**
 * SELECTION SORT
 * - Divides the array into sorted and unsorted parts.
 * - In each pass, finds the minimum element from the unsorted part
 *   and places it at the beginning of the unsorted part.
 *
 * Time Complexity:
 *   Best:    O(n²)
 *   Average: O(n²)
 *   Worst:   O(n²)
 * Space Complexity: O(1) — in-place
 * Stable: NO (swapping can change relative order of equal elements)
 */

function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // Assume current position has minimum

    // Find the actual minimum in the remaining unsorted part
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// Example
const arr = [64, 25, 12, 22, 11];
console.log("Before:", [...arr]);
console.log("After: ", selectionSort(arr));
// After: [11, 12, 22, 25, 64]

/**
 * Step-by-step for [64, 25, 12, 22, 11]:
 * Pass 1: min=11 → swap(64,11) → [11, 25, 12, 22, 64]
 * Pass 2: min=12 → swap(25,12) → [11, 12, 25, 22, 64]
 * Pass 3: min=22 → swap(25,22) → [11, 12, 22, 25, 64]
 * Pass 4: min=25 → no swap    → [11, 12, 22, 25, 64]
 * Done!
 */
