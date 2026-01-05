// Given an unsorted array of integers find a pair with given sum in it or
// Algorithm to find a pair of integers in unsorted array with a given sum k.

// Input:
// var arr = [15, 4, 9 ,3 ,2, 12, 11, 14, 21, 24, 1, 10];
// k = 25;

// Output:
// true  (If found)
// or
// false (If Not found)

// Use i < len when you only need arr[i].
// Use i < len - 1 when you need arr[i] AND at least one more element after it.

// Brute Force Method (Naive Approach)
// In brute force method we will evaluate all the possible pairs and check if desired sum is found.
// Time complexity: O(n^2). Space complexity: O(1).

/**
 *
 * @param {Array} arr
 * @param {Boolean} k
 */
function findSum(arr, k) {
  const len = arr.length;

  // Initialize to false so that it can be checked
  var isFound = false;

  // check each element
  for (let i = 0; i < len; i++) {
    // Check with every next element
    for (j = i + 1; j < len; j++) {
      // if matched
      if (arr[i] + arr[j] === k) {
        // Mark true and break;
        isFound = true;
        break;
      }
    }
  }

  return isFound;
}

console.log("findSum");
console.log(findSum([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 25));
console.log(findSum([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 100));

// Output:
// true (15+10) (4 + 21) (11 + 14) (24 + 1)
// false

// Using Sorting
// In this approach we sort the given array in ascending order and maintain two indices one at lowest(0)
// and another at highest(Array.length - 1) and check until lower index is less than higher index.
// Time complexity: O(nlogn). Space complexity: O(1). log n comes from dividing the problem size (usually by 2) each step.

// Sorting the array → O(n log n)
// (Array.prototype.sort() uses an efficient comparison sort)
// Two-pointer while loop → O(n)
// Each pointer moves at most n times
// O(n log n) + O(n) = O(n log n)

// arr = [1, 2, 3, 4, 9, 10, 11, 12, 14, 15, 21, 24]
// k = 100
// arr[low] + arr[high] = 1 + 24 = 25 != k
// If arr[low] + arr[high] < k then low++, so low = 1
// Repeat the process again, arr[low] + arr[high] = 2 + 24 = 26 != k
// If arr[low] + arr[high] < k then low++, so low = 2
// Repeat until the pair with given sum k is found, If found break else repeat

/**
 *
 * @param {Array} arr
 * @param {Boolean} k
 */
function findSum2(arr, k) {
  // Sort the array (Inbuilt function)
  arr.sort((a, b) => a - b);

  console.log(arr);

  let low = 0;
  let high = arr.length - 1;

  let isFound = false;

  // loop till low < high
  while (low < high) {
    // if pair is found
    if (arr[low] + arr[high] === k) {
      isFound = true;
      break;
    }

    // reduce the search array
    // If, The number at low is too small → Move low right to increase the sum
    // If, The number at high is too large → Move high left to decrease the sum
    if (arr[low] + arr[high] < k) {
      low++;
    } else {
      high--;
    }
  }

  return isFound;
}

console.log("findSum2");
console.log(findSum2([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 25));
console.log(findSum2([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 100));

// Using Hashing O(n)
// Time complexity: O(N). Space complexity: O(N).
// In this approach we store each element in HashMap
// and also check if difference(k - arr[i]) already exits or not,
// if found break the loop. Using this method we can solve this in linear time O(n).

/**
 *
 * @param {Array} arr
 * @param {Boolean} k
 */
function findSum3(arr, k) {
  const hashMap = new Set();

  let isFound = false;

  // Loop through each element
  for (var i = 0; i < arr.length; i++) {
    // Check if difference pair already exists in hashMap
    // s.has(k - arr[i]) = s.has(25 - 15 = 10), No then continue and store the arr[i] i.e 15 in s.
    if (hashMap.has(k - arr[i])) {
      isFound = true;
      break;
    }

    // Repeat until the pair with given sum k is found, If found return true else return false.
    hashMap.add(arr[i]);
  }

  return isFound;
}

console.log("findSum3");
console.log(findSum3([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 25));
console.log(findSum3([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 100));
