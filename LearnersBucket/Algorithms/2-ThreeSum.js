// Given an array of integers and a target
// we have to check if there exists a triplet such that their combined sum is equal to the given target.
// Popularly known as 3 sum problem algorithm.
// Example
// Input:
// arr = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18];
// sum = 20;

// Output:
// true
// [1, 16, 3]

// Naïve brute force solution
// 3 nested loops can be used to consider every triplets in the given array and determine if desired sum is found.
// Time Complexity → O(n³)
// Space Complexity → O(1) (no extra space)
const threeSum = (arr, k) => {
  let length = arr.length;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let l = j + 1; l < length; l++) {
        if (arr[i] + arr[j] + arr[l] === k) {
          return true;
        }
      }
    }
  }

  return false;
};

const arr = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18];
const sum = 20;
console.log("threeSum");
console.log(threeSum(arr, sum)); // true
console.log(threeSum(arr, 13)); // true
console.log(threeSum(arr, 7)); // false

// Naïve recursive solution
// For each item we either consider the current item or ignore it and then recur for the remaining items.
// If triplet with given target is found return true, otherwise return false.
// At each element, the function makes two recursive calls:
// Include the current element
// Exclude the current element
// This forms a binary recursion tree
// In the worst case, it explores all subsets of size ≤ 3
// Time Complexity - O(2ⁿ) - Even though we stop at count === 3, the recursion still branches for each element, leading to exponential time.
// Space - Recursive call stack depth → O(n)
// O(2ⁿ) is much poorer (worse) than O(n³). O(2ⁿ) grows exponentially, which explodes very fast as n increases. O(n³) grows polynomially.

// arr → input array
// len → how many elements (from start) are still available
// sum → remaining sum to achieve
// count → how many numbers we have chosen so far
const threeSum2 = (arr, len, sum, count) => {
  // if there exits a triplet with given sum
  if (sum === 0 && count === 3) {
    return true;
  }

  // if there is no triplet with desired sum
  // Already picked 3 numbers but sum ≠ 0 ❌
  // No elements left to pick ❌
  if (count === 3 || len === 0 || sum < 0) {
    return false;
  }

  // keep recur by considering current element or ignoring current element
  // Core idea: Include / Exclude recursion
  return (
    threeSum2(arr, len - 1, sum - arr[len - 1], count + 1) ||
    threeSum2(arr, len - 1, sum, count)
  );
};

// What the function is doing (in simple words)
// First, it takes the current element
// → subtracts it from sum
// → increases count
// → keeps doing this until:
// sum becomes 0 with count === 3 ✅
// or it fails ❌
// If that path fails, the || operator triggers the second call:
// it skips the current element
// moves to the next element
// and tries again

console.log("threeSum2");
console.log(threeSum2(arr, arr.length, sum, 0)); // true
console.log(threeSum2(arr, arr.length, 13, 0)); // true
console.log(threeSum2(arr, arr.length, 7, 0)); // false

// Efficient approach using hashing to solve 3 sum problem algorithm
// In this approach we assume that the triplet can be broken down as a pair plus one extra element.
// Thus we can use the 2 sum algorithm's logic to solve it.
// We store each element from the array in the map along with its index.
// Then we consider all the pair in the array and check if the map has the remaining sum or not
// If the index of the remaining sum is not overlapping with the pair indexes then triplets exists thus return true, false otherwise.
// Time complexity: O(n + n ^ 2) = O(n ^ 2). Space complexity: O(n).
const threeSumWithHashing = (arr, sum) => {
  const map = new Map();

  // Add element along with its index in the hashmap
  for (let idx = 0; idx < arr.length; idx++) {
    map.set(arr[idx], idx);
  }

  // check each pair
  // we ignore last element because we need a triplet (pair + 1 element).
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // pending sum
      let val = sum - (arr[i] + arr[j]);

      // there is a triplet, if pending sum is available in the map
      // if it is unique, index should not match current two elements which we are adding
      // then return true
      const curIndex = map.get(val);
      if (map.has(val) && curIndex !== i && curIndex !== j) {
        return true;
      }
    }
  }

  return false;
};

console.log("threeSumWithHashing");
console.log(threeSumWithHashing(arr, sum)); // true
console.log(threeSumWithHashing(arr, 13)); // true
console.log(threeSumWithHashing(arr, 7)); // false

// Printing all the unique triplets that are possible in 3 sum problem algorithm
// First, sort the array in ascending order so that we don't repeat the combination
// and then for each element in the array we check if triplets exists by adding the current element and pair from the subarray
// This solution uses the Sorting + Two-Pointer technique (commonly called the 3Sum Two-Pointer approach).
// Time complexity: O(n ^ 2). Space complexity: O(1).
const printAllTriplets = (arr, sum) => {
  // increasing order
  arr.sort((a, b) => a - b);

  // explore all triplets
  for (let i = 0; i <= arr.length - 3; i++) {
    // calc pending sum
    let k = sum - arr[i];

    // with two pointers, explore all the pairs of subarray for triplets
    let low = i + 1; // next element
    let high = arr.length - 1; // last element

    while (low < high) {
      if (arr[low] + arr[high] < k) {
        low++;
      } else if (arr[low] + arr[high] > k) {
        high--;
      } else {
        // console.log(arr[i], arr[low], arr[high]);
        // change the indexes
        // low++;
        // high--;
        return true;
      }
    }
  }

  return false;
};

console.log("printAllTriplets");
console.log(printAllTriplets(arr, sum));
console.log(printAllTriplets(arr, 13));
console.log(printAllTriplets(arr, 7));

// Recursion explanation:
// All triplets that get checked
// For [1,2,3,4,5,6], the recursion explores:
// 6,5,4
// 6,5,3
// 6,5,2
// 6,5,1
// 6,4,3
// 6,4,2
// 6,4,1
// 6,3,2
// 6,3,1
// 6,2,1
// 5,4,3
// 5,4,2
// 5,4,1
// 5,3,2
// 5,3,1
// 5,2,1
// 4,3,2
// 4,3,1
// 4,2,1
// 3,2,1
