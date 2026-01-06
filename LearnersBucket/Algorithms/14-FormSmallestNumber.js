// An algorithm to create the smallest possible number from the given number.

// Input:
// 55010
// 7652634

// Output:
// 10055
// 2345667

// Note: Transformed number should not start with 0 if it has atleast one non-zero character.
// We are going to use two different approaches to solve this problem.
// In the first approach we will assume that provided number is in string format and solve it using sorting which will take O(nlogn).
// In Second approach we will solve with numeric value with O(d) time. Where d is the no of digits

// Using sorting O(nlogn).
// We will convert the number to character array and then sort the array.
// After sorting we will check if first character in array is 0.
// If it is not 0 then we will join the array and return it.
// If it is 0 then we will find the first non-zero number and swap it with 0 and return it.

// Time Complexity: O(nlogn). Space Complexity: O(n).
// We are creating a character array which will take O(n) time and then sorting the array will take O(nlogn)
// We are creating an array of characters from the string, So Space complexity is O(n).
function smallestPossibleNumber(num) {
  // Create a character array and sort it
  // JS sorts strings lexicographically, but since digits '0'..'9' are ordered in ASCII, this works.
  let sorted = num.split("").sort();

  // Check if first character is not 0 then join and return it
  if (sorted[0] != "0") {
    return sorted.join("");
  }

  // find the index of the first non - zero character
  let index = 0;
  for (let i = 0; i < sorted.length; i++) {
    // Characters '0' to '9' are ordered in ASCII: "0" < "1" < "2" < ... < "9"
    if (sorted[i] > "0") {
      index = i;
      break;
    }
  }

  // Swap the indexes
  let temp = sorted[0];
  sorted[0] = sorted[index];
  sorted[index] = temp;

  // return the string after joining the characters of array
  return sorted.join("");
}

console.log(smallestPossibleNumber("55010"));
console.log(smallestPossibleNumber("7652634"));
console.log(smallestPossibleNumber("000001"));
console.log(smallestPossibleNumber("000000"));

// Output:
// 10055
// 2345667
// 100000
// 000000

// Using numeric value O(logn) to form the smallest possible number.
// We will create an array of numbers from 1 to 9.
// Then we will keep track of the digits present in the number by incrementing their count in the array.
// After that we will find the smallest non-zero digit and decrease its count by 1.
// In the end we will recreate the number by arranging them in ascending order and return the result.
// This solution is based on the counting sort.

// Counting Sort is a non-comparison sorting algorithm that works by counting how many times each value appears.

function smallestPossibleNumber2(num) {
  // initialize frequency of each digit to Zero
  let freq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 10

  // count frequency of each digit in the number
  while (num > 0) {
    let d = parseInt(num % 10); // extract last digit
    freq[d]++; // increment counting
    num = parseInt(num / 10); // remove last digit
  }

  // Set the LEFTMOST digit to minimum expect 0
  let result = 0;
  // Choose first digit (non-zero smallest). We cannot start with 0. i = 1
  for (let i = 1; i < freq.length; i++) {
    if (freq[i] != 0) {
      result = i;
      freq[i]--;
      break;
    }
  }

  // arrange all remaining digits
  // in ascending order
  for (let i = 0; i < freq.length; i++) {
    while (freq[i]-- != 0) {
      // We multiply by 10 to shift the number left by one digit before appending a new digit.
      // If you want to append a digit at the end: 123 → append 4 → 1234 -> 1234 = 123 × 10 + 4
      result = result * 10 + i;
    }
  }

  return result;
}

console.log(smallestPossibleNumber2("55010"));
console.log(smallestPossibleNumber2("7652634"));
console.log(smallestPossibleNumber2("000001"));
console.log(smallestPossibleNumber2("000000"));

// Output:
// 10055
// 2345667
// 1
// 0

// Example:
// let freq = [0,0,0,0,0,0,0,0,0,0];
// num = 3110203

// Count digits
// two zero, two 1, one 2, two 3
// Digit: 0 1 2 3 4 5 6 7 8 9
// Freq : 2 2 1 2 0 0 0 0 0 0

// Choose first digit (non-zero smallest). We must not start with 0.
// i = 1 → freq[1] = 2 → pick it
// result = 1
// freq[1]-- → now freq[1] = 1
// Remaining freq:
// 0:2, 1:1, 2:1, 3:2

// Append remaining digits in ascending order
// We multiply by 10 to shift the number left by one digit before appending a new digit.
// If you want to append a digit at the end: 123 → append 4 → 1234 -> 1234 = 123 × 10 + 4

// for (i = 0 → 9)
//   while(freq[i] > 0)
//     result = result * 10 + i

// i = 0 (freq = 2)
// result = 1*10 + 0 = 10
// result = 10*10 + 0 = 100
// i = 1 (freq = 1)
// result = 100*10 + 1 = 1001
// i = 2 (freq = 1)
// result = 1001*10 + 2 = 10012
// i = 3 (freq = 2)
// result = 10012*10 + 3 = 100123
// result = 100123*10 + 3 = 1001233

// final - 1001233
