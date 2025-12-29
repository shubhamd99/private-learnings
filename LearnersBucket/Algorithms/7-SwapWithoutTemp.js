// Algorithm to swap two numbers without using any extra temp variable.
// Using arithmetic operations.
// Using logical operations.
// With Array Destructuring.

// Using arithmetic operations
// We are going to subtract a from b and store it in b, b = b - a
// Then we are going to add a and b and store it in a, a = a + b
// And in the end we are going to subtract b from a and store it in b, b = a - b

// Time Complexity: We are solving this with only arithmetic operations thus time complexity is O(1).
// Space Complexity: O(1), we are using only constant space.
function swapNumbers(a, b) {
  console.log("Before swapping a = " + a + " and b = " + b);
  b = b - a;
  a = a + b;
  b = a - b;
  console.log("After swapping a = " + a + " and b = " + b);
  console.log("------------------------------------------");
}

// Output:
// //How this works
// /*Step 1*/ b = b - a = 15 - 10 = 5. /*So b = 5*/
// /*Step 2*/ a = a + b = 10 + 5 = 15. /*So a = 15*/
// /*Step 3*/ b = a - b = 15 - 5 = 10. /*So b = 10*/

// Before swapping a = 10 and b = 15
// After swapping a = 15 and b = 10
swapNumbers(10, 15);
swapNumbers(23, 44);

// Using logical operations
// We are going to solve this problem using bitwise XOR, XOR returns 1 if two bits are different i.e 1 ^ 0 will return 1, same bits will return 0.
// We are going to perform logical XOR on a and b and store it in a, a = a ^ b
// Then we are going to perform XOR on a and b and store it in b, b = a ^ b
// And in the end we are going to perform XOR on a and b and store it in a, a = a ^ b
// XOR swap works because XOR is reversible: applying the same value twice cancels it out.

// Time Complexity: O(1), we are solving this with only XOR operator.
// Space Complexity: O(1), we are using only constant space.
function swapNumbers2(a, b) {
  console.log("Before swapping XOR a = " + a + " and b = " + b);
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  console.log("After swapping XOR a = " + a + " and b = " + b);
  console.log("------------------------------------------");
}

// | A | B | A ^ B |
// | - | - | ----- |
// | 0 | 0 | 0     |
// | 0 | 1 | 1     |
// | 1 | 0 | 1     |
// | 1 | 1 | 0     |

swapNumbers2(10, 15);

// We will use Destructuring to swap two numbers with using any temp variables.
// Time complexity: O(1), we are using array Destructuring to swap numbers.
// Space complexity: O(1), we are using constant space.
function swapNumbers3(a, b) {
  console.log("Before swapping Array Destructuring a = " + a + " and b = " + b);
  [a, b] = [b, a];
  console.log("After swapping Array Destructuring a = " + a + " and b = " + b);
}

swapNumbers3(10, 15);
