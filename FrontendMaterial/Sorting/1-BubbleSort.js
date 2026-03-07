/**
 * BUBBLE SORT
 * - Repeatedly compares adjacent elements and swaps them if they are in wrong order.
 * - After each pass, the largest unsorted element "bubbles up" to its correct position.
 *
 * Time Complexity:
 *   Best:    O(n)   — already sorted (with optimization)
 *   Average: O(n²)
 *   Worst:   O(n²)
 * Space Complexity: O(1) — in-place
 * Stable: YES
 */

function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // After each pass, the last i elements are already sorted
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps happened, array is already sorted — early exit
    if (!swapped) break;
  }

  return arr;
}

// Example
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Before:", [...arr]);
console.log("After: ", bubbleSort(arr));
// After: [11, 12, 22, 25, 34, 64, 90]

/**
 * Step-by-step for [5, 3, 1]:
 * Pass 1: [3, 1, 5]  → 5 bubbles to end
 * Pass 2: [1, 3, 5]  → 3 moves to correct place
 * Done!
 */
