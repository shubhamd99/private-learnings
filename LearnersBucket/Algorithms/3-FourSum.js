// Given an array of integers and a target we have to check if there exists a quadruplets (four elements) in the array
// such that there sum is equal to the given target. Popularly know as 4 sum problem.

// Use i < len when you only need arr[i].
// Use i < len - 1 when you need arr[i] AND at least one more element after it.

// Naïve recursive approach to solve 4 sum problem
// For each item in the array we either consider it or ignore it and recur for the remaining items.
// If the given target can be achieved by summation of quadruplets then return true or else return false.

// Time complexity: O(2 ^ N) because for each we are calling the same function twice.
// Space complexity: O(2 ^ N) considering the call stack, O(1) other wise.
// O(2ⁿ) and O(2^N) are the same in Big-O notation.
const fourSum = (arr, len, sum, count) => {
  // if there exists a quadruplets whose sum is equal to the given target
  if (sum === 0 && count === 4) {
    return true;
  }

  // base case, if we cannot find a quadruplets
  if (count === 4 || len === 0 || sum < 0) {
    return false;
  }

  return (
    fourSum(arr, len - 1, sum - arr[len - 1], count + 1) ||
    fourSum(arr, len - 1, sum, count)
  );
};

const arr = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18];
const sum = 20;
console.log(fourSum(arr, arr.length, sum, 0)); // true
console.log(fourSum(arr, arr.length, 18, 0)); //  false

// Using hashing to solve 4 sum problem
// Just like 2 sum problem rather than considering single number we will consider a pair
// Add every pair and with their sum one by one in the Hashmap.
// Then for the current pair check if the remaining target is present in the map or not and if the map has the pending target and its pair of elements are not overlapping with the current pair then quadruplet is found, thus return true otherwise return false.

// Time complexity: O(n ^ 2). Space complexity: O(n ^ 2).
// a + b + c + d = target
// ⇒ (a + b) = target − (c + d)
const fourSumWithHashing = (arr, sum) => {
  const map = new Map(); // sum -> list of index pairs

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      const currSum = arr[i] + arr[j];
      const needed = sum - currSum;

      // check if complementary pair exists
      if (map.has(needed)) {
        // There can be MULTIPLE pairs for same sum
        // so we must check ALL of them
        for (const { x, y } of map.get(needed)) {
          // Ensure all 4 indices are different
          // (no element reused)
          if (x !== i && x !== j && y !== i && y !== j) {
            return true;
          }
        }
      }

      // Store current pair for future comparisons
      // If this sum does not exist, initialize array
      if (!map.has(currSum)) {
        map.set(currSum, []);
      }

      // Add this index pair to the array
      map.get(currSum).push({ x: i, y: j });
    }
  }

  return false;
};

console.log(fourSumWithHashing(arr, sum)); // true
console.log(fourSumWithHashing(arr, 18)); //  false
