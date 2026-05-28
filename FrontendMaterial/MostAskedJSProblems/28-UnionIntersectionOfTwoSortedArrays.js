// Union and Intersection of Two Sorted Arrays

// a = [1,3,4,6,7]
// b = [2,3,4,5]

// Union        = all unique elements from both = [1,2,3,4,5,6,7]
// Intersection = common elements in both       = [3,4]

function findUnion(a, b) {
  const result = new Set([...a, ...b]); // merge both, Set removes duplicates
  return [...result].sort((a, b) => a - b); // ascending order
}

function findIntersection(a, b) {
  const setB = new Set(b);
  return a.filter((num) => setB.has(num)); // only elements in both arrays
}

// Usage
const a = [1, 3, 4, 6, 7];
const b = [2, 3, 4, 5];

console.log(findUnion(a, b)); // [1, 2, 3, 4, 5, 6, 7]
console.log(findIntersection(a, b)); // [3, 4]

// Two pointers — one on each array, move forward comparing elements.
// Needs sorted arrays, but we have sorted arrays here
// Will not work if duplicates are present.
function findUnionAndIntersectionTwoPointer(a, b) {
  const union = [];
  const intersection = [];

  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      union.push(a[i]); // in both → goes to union
      intersection.push(a[i]); // in both → goes to intersection
      i++;
      j++;
    } else if (a[i] < b[j]) {
      union.push(a[i]); // only in a → union only
      i++;
    } else {
      union.push(b[j]); // only in b → union only
      j++;
    }
  }

  // Why remaining elements loop?
  // after main loop one array may still have elements
  // b is done but a still has [6, 7] left
  // these are only in A → push to union

  // remaining elements of a
  while (i < a.length) {
    union.push(a[i]);
    i++;
  }

  // remaining elements of b
  while (j < b.length) {
    union.push(b[j]);
    j++;
  }

  return { union, intersection };
}

const result = findUnionAndIntersectionTwoPointer(a, b);
console.log(result.union); // [1, 2, 3, 4, 5, 6, 7]
console.log(result.intersection); // [3, 4]

// Both Time and Space same
// Time - O(n + m)
// Space - O(n + m)
