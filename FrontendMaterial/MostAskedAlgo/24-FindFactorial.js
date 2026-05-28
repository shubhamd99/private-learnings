// We will implement three different program to find the factorial of a given number in Javascript.
// Using brute force method.
// With recursion.
// Using Stack.

// Factorial: Product of all the numbers from 1 to the given number.

// Input:
// 5
// 10
// 12

// Output:
// 120
// 3628800
// 479001600

// Factorial with Brute Force Method.
// We will loop till the given number is greater than 0.
// With each iteration we will reduce the number and multiply it with the previous number and store it.

let factorial = (num) => {
  let product = 1;

  // loop until num is greater than 0
  while (num > 0) {
    // multiply and store the output
    product *= num;
    num--;
  }

  return product;
};

console.log(factorial(5));
console.log(factorial(10));
console.log(factorial(12));

// Output: 120;
// 3628800;
// 479001600;

// We will be looping till the number is greater than 0, so Time complexity is O(n).
// We are using constant space, so Space complexity is O(1).

// Using recursion to find the factorial
// We will create a function and check if given number is less than 1 then return 1.
// Else we will call the same function with the same number reduced by 1.

let recursiveFactorial = (num) => {
  // if num is less than 1 then return 1;
  if (num < 1) {
    return 1;
  }

  // return product of num and one number less than num
  return num * recursiveFactorial(num - 1);
};

let recursiveFactorialShort = (num) => {
  return num < 1 ? 1 : num * recursiveFactorial(num - 1);
};

console.log(recursiveFactorial(5));
console.log(recursiveFactorial(10));
console.log(recursiveFactorial(12));

// Output: 120;
// 3628800;
// 479001600;

// We are calling the same function until the num is greater than 0, so Time complexity is O(n).
// Each function is stored in call stack in recursive function, so Space complexity is O(n).

// Using Stack
// We will push each number from 1 to the given number in Stack.
// And then pop each number from Stack and multiply it to find the factorial.

function Stack() {
  this.items = [];
}

Stack.prototype.push = function (item) {
  this.items.push(item);
};

Stack.prototype.pop = function () {
  if (this.isEmpty()) {
    return "Underflow";
  }
  return this.items.pop();
};

Stack.prototype.isEmpty = function () {
  return this.items.length === 0;
};

// O(n + n) = O(n).
// Space complexity is O(n).
let factorialWithStack = (num) => {
  let s = new Stack();

  while (num > 0) {
    // num-- first pushes the num then decrements it
    s.push(num--);
  }

  let product = 1;
  while (!s.isEmpty()) {
    // multiply each item
    product *= s.pop();
  }

  return product;
};

console.log(factorialWithStack(5));
console.log(factorialWithStack(10));
console.log(factorialWithStack(12));

// Output:
// 120
// 3628800
// 479001600
