// We are going to implement an algorithm to print matrix in L pattern
// Input:
// 1 2 3 4
// 5 6 7 8
// 9 10 11 12
// 13 14 15 16
// 17 18 19 20

// Output:
// 1
// 5
// 9
// 13
// 17
// 18
// 19
// 20
// 2
// 6
// 10
// 14
// 15
// 16
// 3
// 7
// 11
// 12
// 4
// 8

/* How it works
First
1 
5 
9 
13 
17 18 19 20

Second
2 
6 
10 
14 15 16

Third
3 
7 
11 12

Fourth
4
8
*/

// We are going to loop continuously until rows and columns of given matrix are printed.
// With each iteration we will increment the column and reduce the rows.

// We are using ES6 function to assign the value of left parameter to right parameter (arr, m = arr.length, n = arr[0].length)

// Row 0 → [ 1   2   3   4 ]
// Row 1 → [ 5   6   7   8 ]
// Row 2 → [ 9  10  11  12 ]
//            ↑   ↑   ↑   ↑
//          Col0 Col1 Col2 Col3

//            leftCol      rightCol
//              ↓             ↓
// topRow  →  [  x   x   x   x  ]
//            [  x   x   x   x  ]
// bottomRow →[  x   x   x   x  ]

/**
 *
 * @param {Array<Array<number>>} arr → 2D array (matrix)
 */
let printMatrixInLShape = (
  matrix,
  bottomRow = matrix.length,
  rightCol = matrix[0].length
) => {
  // Current top row and left column
  let topRow = 0;
  let leftCol = 0;

  // Loop while there is a submatrix remaining
  while (topRow < bottomRow && leftCol < rightCol) {
    // Print left column from topRow to bottomRow - 1
    for (let r = topRow; r < bottomRow; r++) {
      console.log(matrix[r][leftCol]);
    }
    leftCol++; // move left boundary right

    // Print bottom row from leftCol to rightCol - 1
    for (let c = leftCol; c < rightCol; c++) {
      // matrix.length = 5
      // Valid row indices = 0, 1, 2, 4
      // bottomRow = 5 - 1 = 4
      console.log(matrix[bottomRow - 1][c]);
    }
    bottomRow--; // move bottom boundary up
  }
};

printMatrixInLShape([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20],
]);

// Output:
// 1
// 5
// 9
// 13
// 17
// 18
// 19
// 20
// 2
// 6
// 10
// 14
// 15
// 16
// 3
// 7
// 11
// 12
// 4
// 8

// Time complexity: O(m * (m + n)) or O(n * (m + n)).
// Space complexity: O(1).

// We are going to loop until m is not zero and col is not equal to n which ever is shorter i.e O(m) or O(n).
// We will be printing rows and columns one after another in O(m + n),
// so Time complexity is O(m * (m + n)) or O(n * (m + n)).
