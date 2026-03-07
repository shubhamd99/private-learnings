/**
 * INSERTION SORT
 * - Builds the sorted array one element at a time.
 * - Picks each element and inserts it into its correct position
 *   among the already-sorted elements (like sorting playing cards).
 *
 * Time Complexity:
 *   Best:    O(n)   — already sorted
 *   Average: O(n²)
 *   Worst:   O(n²)
 * Space Complexity: O(1) — in-place
 * Stable: YES
 */

function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const current = arr[i]; // Element to be inserted
    let j = i - 1;

    // Shift elements that are greater than current to one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place current in its correct position
    arr[j + 1] = current;
  }

  return arr;
}

// Example
const arr = [12, 11, 13, 5, 6];
console.log("Before:", [...arr]);
console.log("After: ", insertionSort(arr));
// After: [5, 6, 11, 12, 13]

/**
 * Step-by-step for [12, 11, 13, 5, 6]:
 * i=1: current=11, shift 12 right → [11, 12, 13, 5, 6]
 * i=2: current=13, 13>12 no shift → [11, 12, 13, 5, 6]
 * i=3: current=5,  shift 13,12,11 → [5, 11, 12, 13, 6]
 * i=4: current=6,  shift 13,12,11 → [5, 6, 11, 12, 13]
 * Done!
 */
