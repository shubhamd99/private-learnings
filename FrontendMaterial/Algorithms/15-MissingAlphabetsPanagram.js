// An algorithm to find the missing alphabets to make a string Panagram.
// We will find all the missing alphabets that will make the string panagram and return the missing characters in alphabetical order.
// Panagram: A sentence containing every letter in the English alphabet.

// Input:
// "Hi from learnersbucket"
// "Learn just don't study"

// Output:
// "dghjpqvwxyz"
// "bcfghiklmpqvwxz"

// Input:
// "abcdf"
// This string contains:
// a, b, c, d, f
// Missing letters:
// e, g, h, i, j, k, ... z

// A simple Solution O(n) to find the missing alphabets to make string panagram.
// We will create an array of 26 numbers and keep the track of present alphabets by marking them true.
// To convert the alphabets to numbers will calculate the ASCII difference of the number from the small 'a'.
// Once we have marked the present alphabets we can easily print the missing alphabets in order.
// Note we are going to ignore the case here.

// What is .charCodeAt(0)?
// It returns the Unicode (ASCII) code of the character at position 0 in the string.
// "a"
//  ↑
//  index 0 - Because charCodeAt expects an index.

// Time Complexity: O(n). Space Complexity: O(1).
// We are iterating through each character in the given string and marking its corresponding number as true in the array that will take O(n)
// Then we are looping through the array and converting the false value to form a string which will take O(26), so Time complexity O(n + 26) = O(n).
// As we are using constant space (An array of 26 length no matter how big is the given string), so Space complexity is O(1).
/**
 *
 * @param {string} str
 */
let missingAlphabets = (str) => {
  // create a new array and initialize it with 0
  let arr = new Array(26).fill(0);

  // convert the string to lowercase
  str.toLowerCase();

  // Mark the present string as true
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "a" && str[i] <= "z") {
      // 'a' → 97 - 97 = 0
      // 'b' → 98 - 97 = 1
      // 'z' → 122 - 97 = 25
      arr[str[i].charCodeAt(0) - "a".charCodeAt(0)] = true;
    }
  }

  // Create the string of the missing alphabets
  let missing = "";
  let diff = "a".charCodeAt(0); // 97
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      missing += String.fromCharCode(diff + i);
    }
  }

  return missing;
};

console.log(missingAlphabets("Learn just don't study"));
console.log(missingAlphabets("Hi from learnersbucket"));

// Output:
// "bcfghiklmpqvwxz"
// "dghjpqvwxyz"
