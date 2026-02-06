// We will implement a simple algorithm to find the largest prime factor in Javascript.

// Among all the prime numbers that divide a given number, the biggest one is called its largest prime factor.
// Example 1
// Take number: 28
// Factors of 28:
// 1, 2, 4, 7, 14, 28
// Prime factors are:
// 2 and 7
// So, the largest prime factor of 28 is 7

// Example 2
// Number: 60
// Prime factorization:
// 60 = 2 × 2 × 3 × 5
// Prime factors: 2, 3, 5
// So the largest prime factor = 5

// We will use a variable having value 2 and loop till the this variable is less than square root of the given number.
// In each iteration will reduce the given number if the number is divisble by the variable.
// In the end we will have the largest prime factor and we will return it.

// Time complexity: O(sqrt(n)).Space complexity: O(1).
let largetPrimeFactor = (num) => {
  // start from 2
  let i = 2;

  // loop till the given number is less than the square root of the num
  while (i * i < num) {
    // reduce the number till it is divisible by i
    while (num % i === 0) {
      num /= i;
    }

    // increment i
    i++;
  }

  // return the reduced num
  return num;
};

console.log(largetPrimeFactor(600851475143));
console.log(largetPrimeFactor(151));
console.log(largetPrimeFactor(256987513645261));
console.log(largetPrimeFactor(231412151232312));

// Output:
// 6857
// 151
// 36712501949323
// 9642172968013
