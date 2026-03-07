/**
 * MERGE SORT
 * - Divide and Conquer algorithm.
 * - Splits the array in half recursively until single elements remain,
 *   then merges them back in sorted order.
 *
 * Time Complexity:
 *   Best:    O(n log n)
 *   Average: O(n log n)
 *   Worst:   O(n log n)
 * Space Complexity: O(n) — needs extra space for merging
 * Stable: YES
 */

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));   // Sort left half
  const right = mergeSort(arr.slice(mid));      // Sort right half

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Compare elements from both halves and pick the smaller one
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append any remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Before:", [...arr]);
console.log("After: ", mergeSort(arr));
// After: [3, 9, 10, 27, 38, 43, 82]

/**
 * Visualization for [38, 27, 43, 3]:
 *
 *        [38, 27, 43, 3]
 *        /              \
 *   [38, 27]         [43, 3]
 *   /      \         /     \
 * [38]    [27]    [43]     [3]
 *   \      /         \     /
 *   [27, 38]         [3, 43]
 *        \              /
 *        [3, 27, 38, 43]
 */
