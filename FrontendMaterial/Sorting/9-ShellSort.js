/**
 * SHELL SORT
 * - Generalization of Insertion Sort.
 * - Instead of comparing adjacent elements, compares elements far apart
 *   (using a "gap"), then gradually reduces the gap to 1.
 * - When gap = 1, it behaves like Insertion Sort, but the array is
 *   nearly sorted, making it efficient.
 *
 * Time Complexity:
 *   Best:    O(n log n)
 *   Average: O(n log² n)  — depends on gap sequence
 *   Worst:   O(n²)
 * Space Complexity: O(1) — in-place
 * Stable: NO
 */

function shellSort(arr) {
  const n = arr.length;

  // Start with a large gap and reduce it (Knuth's sequence: n/2, n/4, ...)
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {

    // Perform insertion sort for elements at each gap distance
    for (let i = gap; i < n; i++) {
      const current = arr[i];
      let j = i;

      // Shift elements that are gap positions apart and greater than current
      while (j >= gap && arr[j - gap] > current) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = current;
    }
  }

  return arr;
}

// Example
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Before:", [...arr]);
console.log("After: ", shellSort(arr));
// After: [11, 12, 22, 25, 34, 64, 90]

/**
 * Step-by-step for [64, 34, 25, 12, 22, 11, 90] (n=7):
 *
 * gap=3: Compare elements 3 apart
 *   [12, 11, 25, 64, 22, 34, 90]
 *
 * gap=1: Regular insertion sort (nearly sorted now — fast!)
 *   [11, 12, 22, 25, 34, 64, 90]
 *
 * Key insight: Large gap moves elements quickly to roughly correct positions.
 * Final gap=1 pass is cheap since array is nearly sorted.
 */
