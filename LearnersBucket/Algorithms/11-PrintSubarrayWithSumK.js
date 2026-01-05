// An algorithm to print all subarrays with a given sum k in an array.
// Input:
// [3,4,-7,1,3,3,1,-4]
// k = 7

// Output:
// [3, 4]
// [3, 4, -7, 1, 3, 3]
// [1, 3, 3]
// [3, 3, 1]

// Use i < len when you only need arr[i].
// Use i < len - 1 when you need arr[i] AND at least one more element after it.

// Note: Here we are going to find the consecutive subarrays.

// Brute Force Method (Naive Approach) O(n^2) to print all the subarrays with given sum
// We are going to traverse and sum all the subarrays of the given array and check if they equal to the given sum k.
// If they are equal then we are going to print them.

function printSubArrays(arr, k) {
  // get the size the of the array
  let length = arr.length;

  // traverse through the array
  for (let i = 0; i < length; i++) {
    // temp variables to store the sum and elements
    let tempArr = [];
    let sum = 0;

    // traverse through the every next element after i
    for (let j = i; j < length; j++) {
      sum += arr[j];
      tempArr.push(arr[j]);

      // if sum is equal to k then print the array.
      if (sum === k) {
        console.log(tempArr);
      }
    }
  }
}

printSubArrays([3, 4, -7, 1, 3, 3, 1, -4], 7);
