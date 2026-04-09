// Chunk Array
// Split an array into groups of size n. The last chunk may be smaller.
//
// Input:  arr = [1, 2, 3, 4, 5], size = 2
// Output: [[1,2],[3,4],[5]]
//
// Input:  arr = [1, 2, 3, 4, 5], size = 3
// Output: [[1,2,3],[4,5]]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: iterate with step size n, slicing n elements at a time.

function chunk(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size)); // slice handles end-of-array gracefully
  }

  return result;
}

// Examples
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]
console.log(chunk([1, 2, 3, 4, 5], 3)); // [[1,2,3],[4,5]]
console.log(chunk([], 3)); // []

// Time: O(n)
// Space: O(n)
