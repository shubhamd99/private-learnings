// https://leetcode.com/problems/minimum-window-substring/ - HARD

// Given two strings s and t of lengths m and n respectively,
// return the minimum window substring of s such that every character in t (including duplicates)
// is included in the window. If there is no such substring, return the empty string "".
// find an algorithm that runs in O(m + n) time

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

/*
Logic:
Use a variable-size sliding window.

First, count how many of each character we need from t using the need map.
Then move right through s to expand the window and count characters in window.

formed tells us how many required character types are currently satisfied.
A character type is satisfied only when its window count equals its needed count.

When formed === required, the current window contains all characters from t.
Now shrink from the left while the window is valid, updating the smallest answer.

If removing s[left] makes a required character count fall below what we need,
the window becomes invalid, so formed decreases.
*/

// m = s.length
// n = t.length
// Time: O(m + n)
// Space: O(m + n)
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const need = new Map();
  const window = new Map();

  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let left = 0;
  let formed = 0; // Number of required character types that are fully satisfied in current window.
  const required = need.size; // Total unique character types we need to satisfy.

  let minLength = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Expand window by adding current right character.
    window.set(char, (window.get(char) || 0) + 1);

    // Count this character type as satisfied only once:
    // exactly when its frequency reaches the required frequency.
    if (need.has(char) && window.get(char) === need.get(char)) {
      formed++;
    }

    // If all required character types are satisfied,
    // try to shrink from the left to find the smallest valid window.
    while (formed === required) {
      const currentWindowSize = right - left + 1;
      if (currentWindowSize < minLength) {
        minLength = currentWindowSize;
        minStart = left;
      }

      const leftChar = s[left];
      // Remove left character because we are shrinking the window.
      window.set(leftChar, (window.get(leftChar) || 0) - 1);

      // If removing this character breaks the required count, the window is no longer valid.
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        formed--;
      }

      left++;
    }
  }

  return minLength === Infinity ? "" : s.slice(minStart, minStart + minLength);
};

// Time complexity: O(s.length + t.length)
// Why:
// First loop builds need from t: O(t.length)
// Sliding window scans s: O(s.length)
// Even though there is a while inside the for, left and right each move forward at most s.length times.

// Space complexity: O(s.length + t.length) in the broad worst case, because:
// need can store characters from t
// window can store characters from s
// But if character set is fixed, like ASCII letters, it can be considered:
// O(1)
