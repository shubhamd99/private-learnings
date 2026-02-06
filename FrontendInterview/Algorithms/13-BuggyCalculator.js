// An algorithm to calculate the sum of two numbers without adding the carries(Buggy Calculator).
// We are going to solve this buggy calculator problem with simple implementation technique and print the result.

// Input:
// 12 + 9
// 25 + 25

// Output:
// 11    // 12 + 9 = 21 without carrying 1 from 9 + 2 it would be 11;
// 40    // 25 + 25 = Ignore carrying 1 from  5 + 5 = 40;

//   12
// +  9
// ----
//   21   ← normal addition (carry 1)

//   25
// + 25
// ----
//   50   ← normal addition

// Normal add → carry flows left
// Buggy add → carry is thrown away

// We will carry out division digit by digit so that we can keep track of carrying number.
// For that, we will need to find the greater number from both of the numbers.
// Then we will iterate through each digit of the greater number digits as it can contain more digits than smaller one.
// We will then extract the last digit of both the numbers and add them, If they have carrying digit then will remove it.

// Time Complexity: O(log(n)) or O(d) where d is the number of digits in the greater number.
// Space Complexity: O(1).
// We are iterating through each digit of the greater number, so the Time complexity is O(d) where d is the no of digits.
// We are using constant space, so Space complexity is O(1).
let buggyCalculator = (n1, n2) => {
  let max = n1 > n2 ? n1 : n2;
  let sum = "";

  // Iterate through all the digits of greater number
  // What happens when n1 has more digits than n2?
  // When n2 becomes 0, n2 % 10 becomes 0, so the algorithm automatically treats missing digits as 0.
  while (parseInt(max) > 0) {
    // Extract the last digit
    let last = n1 % 10;
    let last2 = n2 % 10;

    // Add the last digit
    let d = last + last2;

    // if the sum is greater than one digit then extract the last digit.
    d = d > 9 ? d % 10 : d;

    // Prefix the digit
    sum = d.toString() + sum;

    // remove the last digit.
    n1 = parseInt(n1 / 10);
    n2 = parseInt(n2 / 10);
    max /= 10;
  }

  // Return the buggy sum
  return Number(sum);
};

console.log(buggyCalculator(11, 9));
console.log(buggyCalculator(25, 25));
console.log(buggyCalculator(793, 5142314));

// Output:
// 10
// 40
// 5142007
