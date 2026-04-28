// https://leetcode.com/problems/valid-palindrome/

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
// and removing all non-alphanumeric characters, it reads the same forward and backward.
// Alphanumeric characters include letters and numbers.

// The core idea is that a palindrome reads the same from both ends.
// So instead of reversing the string and comparing, you just place one pointer at the start
// and one at the end and walk them toward each other.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Two ways either clean string O(n) space or use isAlphanumeric util O(1)

const isAlphanumeric = (char) => {
  const code = char.charCodeAt(0);
  // Spaces have a char code of 32, which does not fall in any of the three ranges
  return (
    (code >= 97 && code <= 122) || // a-z
    (code >= 65 && code <= 90) || // A-Z
    (code >= 48 && code <= 57) // 0-9
  );
};

const cleanString = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// two pointer without cleaning string, skip non alphanumeric characters inline using char codes
// O(n) time, O(1) space

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // skip non alphanumeric from left
    while (left < right && isAlphanumeric(s[left])) left++;
    // skip non alphanumeric from right
    while (left < right && isAlphanumeric(s[right])) right--;

    // compare lowercase values
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
};
