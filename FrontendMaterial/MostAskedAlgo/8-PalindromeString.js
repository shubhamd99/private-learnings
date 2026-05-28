// Palindrome: A word, sequence or number that reads same when reversed.

// Input:
// 'abba'
// 'learnersbucket'
// 'ABCDCBA'

// Output:
// true
// false
// true

// Strings are zero indexes based just like arrays in javascript, so we can use this to check if a string is a palindrome or not.

// Using brute force method
// Function to check if a given string is palindrome
// Time complexity: O(N), we are checking the half of the string with it's other half i.e N/2.
// Space complexity: O(1), we are using constant space.
// We are first splitting the string which takes O(n) time where n is the length of the string, then we are reversing the array which also takes O(n) time and in the end we are joining the array which will take O(n) time
// As these operations are being performed one after another i.e O(n) + O(n) + O(n) = O(3n) = O(n).
function checkPalindrome(str) {
  const len = str.length;

  // Loop only till the middle
  for (let i = 0; i < len / 2; i++) {
    // Left side character → str[i]
    // Right side character → str[len - 1 - i]
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(checkPalindrome("abba"));
console.log(checkPalindrome("learnersbucket"));
console.log(checkPalindrome("ABCDCBA"));
console.log("----------------");

// Using String and Array methods of JavaScript
// We are going to split the string in an array of characters using String split() method.
// Then we are going to reverse the array and join again to create a string from it.
// Time Complexity: O(n) where n is the length of the string
// Space Complexity: O(n) where n is no of characters in the string.
function checkPalindrome2(str) {
  return str == str.split("").reverse().join("");
}

console.log(checkPalindrome2("abba"));
console.log(checkPalindrome2("learnersbucket"));
console.log(checkPalindrome2("ABCDCBA"));
