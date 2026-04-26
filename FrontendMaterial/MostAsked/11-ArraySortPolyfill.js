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

const arr = [3, 1, 4, 2, 5];

arr.mySort(); // [1, 2, 3, 4, 5] ← string sort
arr.mySort((a, b) => a - b); // [1, 2, 3, 4, 5] ← ascending
arr.mySort((a, b) => b - a); // [5, 4, 3, 2, 1] ← descending
