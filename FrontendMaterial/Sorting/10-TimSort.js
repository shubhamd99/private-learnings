/**
 * TIM SORT
 * - Hybrid sorting algorithm derived from Merge Sort and Insertion Sort.
 * - Used in Python's sort() and JavaScript's Array.prototype.sort() (V8 engine).
 * - Splits the array into small chunks called "runs" (typically 32-64 elements),
 *   sorts each run with Insertion Sort, then merges them with Merge Sort.
 * - Optimized for real-world data that often has naturally ordered subsequences.
 *
 * Time Complexity:
 *   Best:    O(n)     — already sorted
 *   Average: O(n log n)
 *   Worst:   O(n log n)
 * Space Complexity: O(n)
 * Stable: YES
 */

const RUN = 32; // Size of each run (chunk)

function insertionSortRun(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const current = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }

  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}

function timSort(arr) {
  const n = arr.length;

  // Step 1: Sort individual runs using Insertion Sort
  for (let i = 0; i < n; i += RUN) {
    const right = Math.min(i + RUN - 1, n - 1);
    insertionSortRun(arr, i, right);
  }

  // Step 2: Merge sorted runs — doubling the size each time
  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(arr, left, mid, right);
      }
    }
  }

  return arr;
}

// Example
const arr = [5, 21, 7, 23, 19, 3, 17, 1, 11, 13];
console.log("Before:", [...arr]);
console.log("After: ", timSort(arr));
// After: [1, 3, 5, 7, 11, 13, 17, 19, 21, 23]

/**
 * Why TimSort is great for real-world data:
 * - If input is [1,2,3,4,5,100,99,98,97,96], it detects the two
 *   "natural runs" and merges them → very fast!
 * - Insertion Sort is efficient for small arrays (< 32 elements).
 * - Merge Sort efficiently combines the sorted runs.
 */
