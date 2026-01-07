// An algorithm to print the the given matrix in zigzag format and print it.

// Input:
//  1 2 3 4
//  5 6 7 8
//  9 0 1 2

// Output:
// 1
// 2
// 3
// 4
// 8
// 7
// 6
// 5
// 9
// 0
// 1
// 2

// We will loop through the given array and check if the current row is odd or even.
// If the current row is odd then we will print it in reverse direction(last to first)
// else we will print in normal direction(first to last).

// Time complexity: O(m * n).
// We are looping through 2d array which can have m columns and n rows, so Time complexity is O(m * n).
// Space complexity: O(1). We are using constant space, so Space complexity is O(1).

/**
 *
 * @param {Array<Array<string>} arr
 */
let zigzagMatrix = (arr) => {
  // loop through the array
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 != 0) {
      // If it is odd row then print in reverse direction
      for (let j = arr[i].length - 1; j >= 0; j--) {
        console.log(arr[i][j]);
      }
    } else {
      // If it is even row then print in normal direction
      for (let j = 0; j < arr[i].length; j++) {
        console.log(arr[i][j]);
      }
    }
  }
};

zigzagMatrix([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 0, 1, 2],
]);

// Output:
// 1
// 2
// 3
// 4
// 8
// 7
// 6
// 5
// 9
// 0
// 1
// 2
