// Given an array of values, remove duplicate elements and return a new array containing only unique values.
// This problem checks your understanding of basic JavaScript data structures.

const arr = [1, 2, 3, 2, 4, 1, 5];

// Output - [1, 2, 3, 4, 5];

const arr = [1, 2, 3, 2, 4, 1, 5];
const unique = [...new Set(arr)];
console.log(unique);
