// https://leetcode.com/problems/find-all-anagrams-in-a-string/description/

// An anagram is a word formed by rearranging all the letters of another word.

// Given two strings s and p, return an array of all the start indices of p's anagrams in s.
// You may return the answer in any order.

// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

// fixed sliding window of size p.length, maintain frequency maps of p and current window
// track matches counter across 26 letters, when matches === 26 current window is an anagram
// add new right char and remove old left char on each slide, adjust matches counter accordingly

// pMap:      { a:1, b:1, c:1 }
// windowMap: { c:1, b:1, a:1 }  <- first window "cba"

// checking all 26:
// a -> pMap=1, windowMap=1 -> match, score 1
// b -> pMap=1, windowMap=1 -> match, score 2
// c -> pMap=1, windowMap=1 -> match, score 3
// d -> pMap=0, windowMap=0 -> match, score 4
// e -> pMap=0, windowMap=0 -> match, score 5
// f -> pMap=0, windowMap=0 -> match, score 6
// ...
// z -> pMap=0, windowMap=0 -> match, score 26

// All letters not in p are just 0 in both maps, so they always match and contribute to the score.
// The three letters in p must also match. When all 26 match you have an anagram.

// When you add a new character to the window, two things can happen:
// windowMap[rightChar] === pMap[rightChar] -> matches++
// After incrementing, the frequency of rightChar in windowMap now exactly equals pMap. They just became equal, so this character is now a match. Increment matches.
// windowMap[rightChar] === pMap[rightChar] + 1 -> matches--
// After incrementing, the frequency of rightChar in windowMap is now one more than pMap. It just went from equal to unequal, meaning it just broke a match. Decrement matches.

// Time: O(n), Space: O(1) since frequency map is always fixed size of 26 letters.
/**
 * @param {string} s
 * @param {string} p Window size is always p.length, never changes.
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const pMap = {};
  const windowMap = {};
  const results = [];

  // build frequency map for p
  for (let i = 0; i < p.length; i++) {
    pMap[p[i]] = (pMap[p[i]] || 0) + 1;
  }

  // build frequency map for initial window
  for (let i = 0; i < p.length; i++) {
    windowMap[s[i]] = (windowMap[s[i]] || 0) + 1;
  }

  // count initial matches across all 26 letters
  let matches = 0;
  const allChars = "abcdefghijklmnopqrstuvwxyz";
  for (const char of allChars) {
    if ((pMap[char] || 0) === (windowMap[char] || 0)) {
      matches++;
    }
  }

  // slide window from index p.length to end
  for (let i = p.length; i < s.length; i++) {
    // check if current window is anagram before sliding
    if (matches === 26) {
      results.push(i - p.length);
    }

    // add new right character
    const rightChar = s[i];
    windowMap[rightChar] = (windowMap[rightChar] || 0) + 1;
    if (windowMap[rightChar] === (pMap[rightChar] || 0)) {
      matches++;
    } else if (windowMap[rightChar] === (pMap[rightChar] || 0) + 1) {
      matches--;
    }

    // remove leftmost element of previous window that is no longer in current window
    const leftChar = s[i - p.length];
    if (windowMap[leftChar] === (pMap[leftChar] || 0)) {
      matches--;
    } else if (windowMap[leftChar] === (pMap[leftChar] || 0) + 1) {
      matches++;
    }
    windowMap[leftChar]--;
  }

  // check last window
  if (matches === 26) {
    results.push(s.length - p.length);
  }

  return results;
};
