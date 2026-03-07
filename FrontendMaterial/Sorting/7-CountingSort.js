/**
 * COUNTING SORT
 * - Non-comparison based sorting algorithm.
 * - Works by counting the frequency of each element, then
 *   reconstructing the sorted array from those counts.
 * - Best used when the range of values (k) is not significantly
 *   larger than the number of elements (n).
 *
 * Time Complexity:  O(n + k)  where k = range of input values
 * Space Complexity: O(n + k)
 * Stable: YES
 */

function countingSort(arr) {
  if (arr.length === 0) return arr;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  // Step 1: Count frequency of each element
  const count = new Array(range).fill(0);
  for (const num of arr) {
    count[num - min]++;
  }

  // Step 2: Reconstruct the sorted array
  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sorted.push(i + min);
      count[i]--;
    }
  }

  return sorted;
}

// Example
const arr = [4, 2, 2, 8, 3, 3, 1];
console.log("Before:", [...arr]);
console.log("After: ", countingSort(arr));
// After: [1, 2, 2, 3, 3, 4, 8]

/**
 * Step-by-step for [4, 2, 2, 8, 3, 3, 1]:
 * Range: 1 to 8
 * Count array (index = value):
 *   index: 1  2  3  4  5  6  7  8
 *   count: 1  2  2  1  0  0  0  1
 *
 * Reconstruct: [1, 2, 2, 3, 3, 4, 8]
 *
 * NOTE: Does NOT work with floating point numbers.
 * Works best with small range of non-negative integers.
 */
