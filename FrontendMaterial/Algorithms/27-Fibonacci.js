// We will implement a simple algorithm to find the nth Fibonacci number in javascript using three different approaches.
// A bruteforce approach.
// Recursive approach.
// Using dynamic programming.

// Fibonacci series: A series of numbers formed by adding a number with its previous number.
// Initially we assume there will be two numbers 0 and 1.

// 0 1 1 2 3 5 8 13 21 34 55

// 0 + 1 = 1
// 1 + 1 = 2
// 2 + 1 = 3
// 3 + 2 = 5
// 5 + 3 = 8
// ...
// ...

// Input:
// 10
// 12

// Output:
// 55
// 144

// Bruteforce Method
// We will check if the given num is 0 then return first number else if it is 1 then return the second number.
// If the num is greater than 2 then we will iterate till the given number and add it with its previous number and store the previous number.

let fibonacci = (num) => {
  // initalize
  let a = 0;
  let b = 1;

  // to store the sum
  let c = 0;

  // iterate till the given num
  for (let i = 2; i <= num; i++) {
    // sum of last two numbers
    c = a + b;

    // assign the last value to first
    a = b;

    // assign the sum to the last
    b = c;
  }

  // if the num is 0 then return a else return b;
  return num ? b : a;
};

console.log(fibonacci(10));
console.log(fibonacci(12));

// Output:
// 55
// 144

// We are iterating till the given number, so Time complexity is O(n).
// Space complexity is O(1).

// Recursive method to find the fibonacci.
// We will create a function and check if given number is less than 2 then return the same number
// Else we will call the same function twice with last two numbers and add them.

let fibonacciRecursive = (num) => {
  if (num < 2) {
    return num;
  }

  return fibonacciRecursive(num - 1) + fibonacciRecursive(num - 2);
};

console.log(fibonacciRecursive(10));
console.log(fibonacciRecursive(12));

// Output:
// 55
// 144

// We are calling the function twice, so Time complexity is O(2^n).
// Space complexity is O(n).

// Using Dynamic Programming.
// We will use memoization technique to find the fibonacci in javacscript.
// We will create a function which will recursively call itself to compute the algorithm like implemented above.
// We will use an array to keep track of the already computed functions value
// If the value for the given function already exits then we will return the value else we will call the same function recursively with lesser values and store it.

// To store the function values
let memo = [0, 1];

// Function to calculate the fibonacci
let fibonacciDP = (num) => {
  // Get the value for current number
  let result = memo[num];

  // If there is no value for current number
  if (typeof result !== "number") {
    // call the function recursively and store the result
    result = fibonacciDP(num - 1) + fibonacciDP(num - 2);
    memo[num] = result;
  }

  // Else if value then return it
  return result;
};

console.log(fibonacciDP(10));
console.log(fibonacciDP(12));

// Output:
// 55
// 144

// We are calling the function once, so Time complexity is O(n).
// Space complexity is O(n).
