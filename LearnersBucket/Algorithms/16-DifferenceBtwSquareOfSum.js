// An algorithm to find the difference between the square of the sum of numbers and the sum of the square of numbers.
// We will find the square of the sum of numbers (1 + 2 + 3 ... 10 = 55 ^ 2) and
// the sum of the square of numbers (1 ^ 2 + 2 ^ 2 + ... 10 ^ 2).

// Square of the sum: (1 + 2 + 3 + ... + n)²
// Sum of the squares: 1² + 2² + 3² + ... + n²
// (square of sum) - (sum of squares)

// Input:
// 10

// Square of the sum
// 1 + 2 + 3 + ... + 10 = 55
// Now square it:
// 55² = 3025

// Sum of the squares
// 1² + 2² + 3² + ... + 10²
// = 1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81 + 100 = 385

// Difference
// 3025 - 385 = 2640

// We are going to use two different methods to solve this problem.
// We are going to use a loop to find the square of sum and sum of squares of numbers that will take O(n).
// Using a mathematical formula that will run in O(1).

// Using a loop O(n). We are going to loop from 1 to n and
// calulate the sum as well as sum of the sqaure of number using different variables.
// Then we will return the difference.

// Time complexity: O(n). Space complexity: O(1).
let diff = (num) => {
  let sum = 0;
  let squareSum = 0;

  // calculate the sum and squareSum
  for (let i = 1; i <= num; i++) {
    sum += i;
    squareSum += i * i;
  }

  return sum * sum - squareSum;
};

console.log(diff(10));
console.log(diff(25));
console.log(diff(97));

// Output:
// 2640
// 100100
// 22282064

// Using mathematical formula
// We are going to use mathematical formulas to calulate the square of sum and sum of square of given number.
// Sum of number from 1 to n: (n * (n + 1)) / 2.
// Sum of Square of numbers from 1 to n: (n * (n + 1) * ((n * 2) + 1)) / 6.

let diff2 = (num) => {
  let sum = 0;
  let squareSum = 0;

  sum = (num * (num + 1)) / 2;
  squareSum = (num * (num + 1) * (num * 2 + 1)) / 6;

  return sum * sum - squareSum;
};

console.log(diff2(10));
console.log(diff2(25));
console.log(diff2(97));
