// An algorithm to find the digital root of a given number.
// Digital root: Sum of all digits of the number till there is an only a single digit.

// Input:
// 5674;
// 493193;

// Output: 4; // 5 + 6 + 7 + 4 = 22 = 2 + 2 = 4
// 2; // 4 + 9 + 3 + 1 + 9 + 3 = 29 = 2 + 9 = 11 = 1 + 1 = 2

// We are going to use to two different methods to solve this.
// Using a recursive method which will take O(n ^ 2). Where n is the no of digits.
// Using mathematical formula which will take O(1) time.

// Recursive method O(n ^ 2)
// We will create a function that will calculate the sum of all the digits.
// If the sum becomes single digit then we will return it.
// Else we will call the same function to calculate the sum again.

let digitalRoot = (n) => {
  // calculate the sum of all the digits
  let sum = 0;

  // n % 10 → last digit
  // n / 10 → rest of the number
  // 123 % 10 = 3
  // 123 / 10 = 12
  // parseInt - 12.3 -> 12

  while (parseInt(n) > 0) {
    let temp = n % 10; // last digit
    sum = sum + temp;
    n = parseInt(n) / 10; // remove last digit
  }

  // Check if the sum is single digit
  if (sum < 10) {
    return sum;
  }

  // call the function again
  return digitalRoot(sum);
};

console.log(digitalRoot(257520643)); //7
console.log(digitalRoot(5674)); // 4
console.log(digitalRoot(493193)); // 2
console.log(digitalRoot(34758)); // 9
