// We will be implementing a program to check if the given number is prime or not in Javascript and return true or false.
// Prime Number: A number that is divisible by only 1 and itself.

// Input:
// 1
// 2
// 3
// 4
// 31
// 37

// Output:
// false
// true
// true
// false
// true
// false

// 3 / 1 = 3
// 3 / 3 = 1

// We are going to use two different approaches to check if given number is prime or not.
// A brute force solution.
// A recursive solution.

// A brute force solution
// 1- We are going to check if the given number is less than 2 or not, If it is less then it is not prime and return false.
// 2- If the number is not less than 2 and it is divisible by any number less than the sqaure root of the given number
// then also it is not prime and return false.
// 3 - Else it is prime and return true.

// Time complexity: O(sqrt(n)). Space complexity: O(1).
let isPrime = (n) => {
  // if n is less than 2 return false
  if (n < 2) {
    return false;
  }

  // check if n is divisible number less than its sqaure root
  // If a number has any factor, one of them must be ≤ √n, so checking beyond √n is useless.
  for (let i = 2; i <= Math.sqrt(n); i++) {
    // if it divisible then return false
    if (n % i == 0) {
      return false;
    }
  }

  // Else return true
  return true;
};

console.log(isPrime(1)); // false
console.log(isPrime(2)); // true
console.log(isPrime(3)); // true
console.log(isPrime(4)); // false
console.log(isPrime(31)); // true
console.log(isPrime(37)); // true

// ------------------------------------------------------

// Example: Check if 4 is prime

// Step 1: sqrt(4) = 2
// So we only check divisibility till 2

// Try dividing 4 by 2
// 4 / 2 = 2 → divisible → not prime

// So 4 is NOT a prime number

// ------------------------------------------------------

// Example 1: Check if 31 is prime

// Step 1: Find square root of 31
// sqrt(31) ≈ 5.56
// So we only need to check divisibility from 2 to 5

// Try dividing 31 by 2
// 31 / 2 = 15.5 → not an integer → not divisible

// Try dividing 31 by 3
// 31 / 3 ≈ 10.33 → not an integer → not divisible

// Try dividing 31 by 4
// 31 / 4 = 7.75 → not an integer → not divisible

// Try dividing 31 by 5
// 31 / 5 = 6.2 → not an integer → not divisible

// Since no number from 2 to sqrt(31) divides 31,
// 31 is a PRIME number.

// ------------------------------------------------------

// Example 2: Check if 37 is prime

// Step 1: Find square root of 37
// sqrt(37) ≈ 6.08
// So we only need to check divisibility from 2 to 6

// Try dividing 37 by 2
// 37 / 2 = 18.5 → not an integer → not divisible

// Try dividing 37 by 3
// 37 / 3 ≈ 12.33 → not an integer → not divisible

// Try dividing 37 by 4
// 37 / 4 = 9.25 → not an integer → not divisible

// Try dividing 37 by 5
// 37 / 5 = 7.4 → not an integer → not divisible

// Try dividing 37 by 6
// 37 / 6 ≈ 6.16 → not an integer → not divisible

// Since no number from 2 to sqrt(37) divides 37,
// 37 is a PRIME number.
