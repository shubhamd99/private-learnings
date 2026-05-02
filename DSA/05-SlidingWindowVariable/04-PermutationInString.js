// https://leetcode.com/problems/permutation-in-string/description/

// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
// In other words, return true if one of s1's permutations is the substring of s2.

// A permutation means the same characters arranged in a different order.

// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

/*
Logic:
A permutation means same letters with same counts, order does not matter.

So we need to find a substring in s2 with:
- same length as s1
- same character counts as s1

This is a fixed-size sliding window problem because every permutation
of s1 has length s1.length.

need stores character counts from s1.
window stores character counts from the current window in s2.

Instead of comparing both maps every time, we use matched.

matched means:
How many required character types currently have the exact needed count?

Example:
s1 = "aab"
need = { a: 2, b: 1 }

If current window has:
{ a: 2, b: 1 }
matched = 2, because both "a" and "b" are satisfied.

If matched === need.size, the current window is a permutation.
*/

// Time complexity: O(n * m)
// Space complexity: O(m)

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Map();
  const window = new Map();

  // Count how many times each character appears in s1.
  for (const char of s1) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0;

  // Number of required characters whose counts are currently exactly matched.
  let matched = 0;

  // Number of unique character types we need to match.
  const required = need.size;

  for (let right = 0; right < s2.length; right++) {
    const char = s2[right];

    // Add right character into the current window.
    window.set(char, (window.get(char) || 0) + 1);

    // If this needed character just reached the exact required count, mark this character type as matched.
    if (need.has(char) && need.get(char) === window.get(char)) {
      matched++;
    }

    // Keep the window size equal to s1.length.
    if (right - left + 1 > s1.length) {
      const leftChar = s2[left];

      // If this character was perfectly matched before removing it, removing it will break that match.
      if (need.has(leftChar) && need.get(leftChar) === window.get(leftChar)) {
        matched--;
      }

      window.set(leftChar, (window.get(leftChar) || 0) - 1);

      if (window.get(leftChar) === 0) {
        window.delete(leftChar);
      }

      left++;
    }

    // If current fixed-size window satisfies every required character count, then it is a permutation of s1.
    if (right - left + 1 === s1.length && matched === required) {
      return true;
    }
  }

  return false;
};

// Time complexity: O(n + m)
// n = s2.length
// m = s1.length
// Why:
// Build need from s1: O(m)
// Slide once through s2: O(n)
// No full map comparison each time

// Why?
// need stores characters from s1
// window stores at most s1.length characters
// Space: O(m)
// If the character set is fixed, like lowercase English letters, space can be considered: O(1)
