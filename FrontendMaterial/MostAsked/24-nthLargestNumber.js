// Nth Largest Number
// Given an array of numbers, find the nth largest unique number.

// arr = [3, 1, 4, 1, 5, 9, 2, 6]

// Largest numbers in order:
// 1st largest → 9
// 2nd largest → 6
// 3rd largest → 5
// 4th largest → 4
// 5th largest → 3

// -----------------------------

// Step 1 — Remove duplicates
// [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
// → [3, 1, 4, 5, 9, 2, 6]

// Step 2 — Sort descending (largest first)
// → [9, 6, 5, 4, 3, 2, 1]

// Step 3 — Pick nth element
// n=1 → index 0 → 9
// n=2 → index 1 → 6
// n=3 → index 2 → 5

function nthLargest(arr, n) {
  const unique = [...new Set(arr)]; // remove duplicates
  const sorted = unique.sort((a, b) => b - a); // sort in descending order

  if (n > sorted.length) {
    return undefined; // return undefined if n is greater than the number of unique elements
  }

  return sorted[n - 1]; // return the nth largest number
}

// Without Set — manual approach
function nthLargest2(arr, n) {
  const sorted = arr
    .filter((val, index) => arr.indexOf(val) === index) // remove duplicates
    .sort((a, b) => b - a);

  return sorted[n - 1];
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

console.log(nthLargest(arr, 1)); // 9  ← largest
console.log(nthLargest(arr, 2)); // 6  ← 2nd largest
console.log(nthLargest(arr, 3)); // 5  ← 3rd largest
console.log(nthLargest(arr, 9)); // undefined ← out of range
