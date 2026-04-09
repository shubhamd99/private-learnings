// First Non-Repeating Character
// Given a string, find the first character that appears only once.
//
// Input:  "leetcode"
// Output: "l"
//
// Input:  "loveleetcode"
// Output: "v"
//
// Input:  "aabb"
// Output: null   → all characters repeat

// ---- SIMPLE VERSION (for interviews) ----
// Idea: two passes.
// Pass 1: build a frequency map of all characters.
// Pass 2: return the first character whose count is 1.

function firstNonRepeating(s) {
  const freq = new Map();

  // pass 1: count frequency of each character
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // pass 2: find first char with count === 1
  for (const char of s) {
    if (freq.get(char) === 1) return char;
  }

  return null; // all characters repeat
}

// Examples
console.log(firstNonRepeating("leetcode")); // "l"
console.log(firstNonRepeating("loveleetcode")); // "v"
console.log(firstNonRepeating("aabb")); // null

// Time: O(n) — two linear passes
// Space: O(1) — at most 26 lowercase letters in map (bounded alphabet)
