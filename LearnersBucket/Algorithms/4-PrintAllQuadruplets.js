// Given an array of integers and sum we have to print all the unique quadruplets
// which are equal to the given target, This problem is extension of 4 sum algorithm.

// First, sort the array in increasing order to make sure we avoid the duplicates.
// Then for each pair calculate the remaining target by substracting the sum of the pair from the given target and check if there exists a quadruplets by finding the pair with remaining target in the subarray.
// 2 sum problem logic can be used to find the pair in a subarray with given sum in linear time.

const quadruplets = (arr, sum) => {
  // increasing order
  arr.sort((a, b) => a - b);

  // explore all quadruplets
  for (let i = 0; i <= arr.length - 4; i++) {
    for (let j = i + 1; j <= arr.length - 3; j++) {
      // store pending target from the current pair
      let k = sum - (arr[i] + arr[j]);

      // check for pending target in subarray
      let low = j + 1;
      let high = arr.length - 1;

      while (low < high) {
        if (arr[low] + arr[high] < k) {
          low++;
        } else if (arr[low] + arr[high] > k) {
          high--;
        } else {
          // if a quadruplet is found, print it
          console.log(arr[i], arr[j], arr[low], arr[high]);
          low++;
          high--;
        }
      }
    }
  }
};

const arr = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18];
const sum = 20;
quadruplets(arr, sum);

// Output:
// [1, 2, 6, 11]
// [1, 3, 5, 11]
