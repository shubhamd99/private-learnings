// An algorithm to check if given number is Armstrong number in Javascript.
// We will check if the given number is Armstrong number in Javascript and return true or false accordingly.
// Armstrong: When we cube each digit of the number and add, it should be equal to the given number.

// Input:
// 153    // 1 * 1 * 1 +  5 * 5 * 5 + 3 * 3 * 3 = 1 + 125 + 27 = 153
// 127    // 1 * 1 * 1 +  2 * 2 * 2 + 7 * 7 * 7 = 1 + 8 + 343 = 352

// Output:
// true
// false

// We are going to extract each digit of the given number and cube it.
// Then we will add all the cubes and check if it is equal to the given number.

// Time complexity: O(logn) or O(d).
// Since each iteration divides the number by 10, the loop runs once per digit, which is O(log n).
// Divide by 10 repeatedly → count how many times → that’s log₁₀(n)
// Space complexity: O(1).
// We are extracting each digit from the number, so Time complexity is O(logn) or O(d) where d is the no of digits.
// We are using constant space, so Space complexity is O(1).
/**
 *
 * @param {number} num
 * @returns {boolean}
 */
let isArmstrong = (num) => {
  let sum = 0;
  // store the actual number to check later
  let temp = num;

  // Extract each digit of number
  while (num > 0) {
    // get the last digit of the number
    let d = parseInt(num % 10);

    // find the cube
    d = d ** 3;
    sum = sum + d;

    // reduce the number
    num = parseInt(num / 10);
  }

  // Check if number equals to the cubed sum
  return temp === sum;
};

console.log(isArmstrong(407));
console.log(isArmstrong(370));
console.log(isArmstrong(371));
console.log(isArmstrong(153));
console.log(isArmstrong(154));
console.log(isArmstrong(152514214));

// Output:
// true
// true
// true
// true
// false
// false
