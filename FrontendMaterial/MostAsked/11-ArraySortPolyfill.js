// Array.sort() sorts elements in place (mutates original array) and returns the sorted array.

// bubble sort - O(n^2) time complexity, O(1) space complexity
// bubble sort repeatedly steps through the list, compares adjacent elements
// and swaps them if they are in the wrong order.

// pass counter - It just counts how many times you have walked through the entire array

Array.prototype.mySort = function (compareFn) {
  const arr = this;

  // default compare - convert to string and compare
  if (!compareFn) {
    compareFn = (a, b) => (String(a) > String(b) ? 1 : -1);
  }

  // bubble sort outer loop i is a pass counter not a position,
  // inner loop j always starts from 0 to compare adjacent pairs
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (compareFn(arr[j], arr[j + 1]) > 0) {
        // swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  console.log(arr);
  return arr; // same array, mutated
};

// --- Tim Sort implementation ---
// TimSort is a hybrid sorting algorithm, derived from merge sort and insertion sort,
// designed to perform well on many kinds of real-world data (Used by V8 engine for Array.prototype.sort).

const MIN_MERGE = 32;

function minRunLength(n) {
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

function insertionSort(arr, left, right, compareFn) {
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= left && compareFn(arr[j], temp) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

function merge(arr, left, mid, right, compareFn) {
  let len1 = mid - left + 1;
  let len2 = right - mid;

  let leftArr = new Array(len1);
  let rightArr = new Array(len2);

  for (let i = 0; i < len1; i++) {
    leftArr[i] = arr[left + i];
  }
  for (let i = 0; i < len2; i++) {
    rightArr[i] = arr[mid + 1 + i];
  }

  let i = 0,
    j = 0,
    k = left;
  while (i < len1 && j < len2) {
    if (compareFn(leftArr[i], rightArr[j]) <= 0) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < len1) {
    arr[k] = leftArr[i];
    k++;
    i++;
  }
  while (j < len2) {
    arr[k] = rightArr[j];
    k++;
    j++;
  }
}

Array.prototype.myTimSort = function (compareFn) {
  const arr = this;

  // default compare - convert to string and compare
  if (!compareFn) {
    compareFn = (a, b) => (String(a) > String(b) ? 1 : -1);
  }

  let n = arr.length;
  if (n < 2) return arr;

  const minRun = minRunLength(n);

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += minRun) {
    insertionSort(arr, i, Math.min(i + minRun - 1, n - 1), compareFn);
  }

  // Merge subarrays in bottom-up manner
  for (let size = minRun; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);

      // Merge if there is a second half
      if (mid < right) {
        merge(arr, left, mid, right, compareFn);
      }
    }
  }

  console.log(arr);
  return arr;
};

const arr = [3, 1, 4, 2, 5];

console.log("--- Bubble Sort ---");
arr.mySort(); // [1, 2, 3, 4, 5] ← string sort
arr.mySort((a, b) => a - b); // [1, 2, 3, 4, 5] ← ascending
arr.mySort((a, b) => b - a); // [5, 4, 3, 2, 1] ← descending

const arr2 = [3, 1, 4, 2, 5, 9, 8, 7, 6, 0];

console.log("--- Tim Sort ---");
arr2.myTimSort(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] ← string sort
arr2.myTimSort((a, b) => a - b); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] ← ascending
arr2.myTimSort((a, b) => b - a); // [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] ← descending
