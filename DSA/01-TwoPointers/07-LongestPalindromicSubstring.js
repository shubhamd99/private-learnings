// https://leetcode.com/problems/longest-palindromic-substring/description/

// palindromic substring - A substring is a contiguous non-empty sequence of characters within a string.

// Given a string s, return the longest palindromic substring in s.

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// s consist of only digits and English letters.

// You are standing at each character and asking "how far can I expand outward while still being a palindrome?"
// s = "racecar"
//         ^
//      standing at 'e' (index 3)

// left = 3, right = 3
// s[left] === s[right] -> 'e' === 'e' -> match, expand
// left = 2, right = 4
// s[left] === s[right] -> 'c' === 'c' -> match, expand
// left = 1, right = 5
// s[left] === s[right] -> 'a' === 'a' -> match, expand
// left = 0, right = 6
// s[left] === s[right] -> 'r' === 'r' -> match, expand
// left = -1, right = 7 -> out of bounds, stop

// It is O(n^2) time and O(1) space
// for each index expand outward in both directions treating it as center
// do this twice, once for odd length (single center) and once for even length (two centers)
// track longest palindrome found across all centers

// array two pointer: i < n - 1 (or n-2, n-3), stop early to leave room for pointers ahead of i, avoids out of bounds
// string expand around center: i < s.length, visit every index including last, bounds handled inside expand with left >= 0 && right < s.length

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let start = 0;
  let maxLen = 0;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const windowLength = right - left + 1; // +1 Because indices are zero based.
      if (windowLength > maxLen) {
        maxLen = windowLength;
        start = left;
      }
      // Why left-- and right++ - Because you are expanding outward from the center, not inward
      left--;
      right++;
    }
  };

  // odd:  expand(i, i)     -> both pointers on same character, handles palindromes like "racecar" where center is a single character
  // even: expand(i, i+1)   -> pointers on adjacent characters, handles palindromes like "abba" where center is a gap between two characters

  for (let i = 0; i < s.length; i++) {
    expand(i, i); // Odd length palindrome, single center
    expand(i, i + 1); // Even length palindrome, two centers
  }

  return s.slice(start, start + maxLen);
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome2 = function (s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // loop exits one step past the last match, so left/right overshot by 1 on each side
    // the actual palindrome bounds are (left + 1) to (right - 1)

    const len = right - left - 1;
    // length = (right - 1) - (left + 1) + 1, simplified to right - left - 1

    if (len > maxLen) {
      maxLen = len;
      start = left + 1; // shift back to the real left boundary of the palindrome
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i); // odd length, center is a single char
    expand(i, i + 1); // even length, center is between two chars
  }

  return s.substring(start, start + maxLen);
};
