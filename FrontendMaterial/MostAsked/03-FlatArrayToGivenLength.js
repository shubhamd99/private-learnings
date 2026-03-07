// Flatten Array to Given Depth

function flatArray(arr, depth = 1) {
  return arr.flat(depth);
}

// Usage
const nested = [1, [2, [3, [4, [5]]]]];

console.log(flatArray(nested, 1)); // [1, 2, [3, [4, [5]]]]
console.log(flatArray(nested, 2)); // [1, 2, 3, [4, [5]]]
console.log(flatArray(nested, 3)); // [1, 2, 3, 4, [5]]
console.log(flatArray(nested, Infinity)); // [1, 2, 3, 4, 5]  ← fully flat

function flatArray2(arr, depth = 1) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      result.push(...flatArray2(arr[i], depth - 1)); // recursive call with reduced depth
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

// Usage

console.log(flatArray2(nested, 1)); // [1, 2, [3, [4, [5]]]]
console.log(flatArray2(nested, 2)); // [1, 2, 3, [4, [5]]]
console.log(flatArray2(nested, 3)); // [1, 2, 3, 4, [5]]
console.log(flatArray2(nested, Infinity)); // [1, 2, 3, 4, 5]

// Time Complexity
// O(n × d) — where n is total elements and d is depth
// Each level of recursion loops through all elements at that level

// Space Complexity
// O(n + d) — n for the result array, d for recursion call stack depth
