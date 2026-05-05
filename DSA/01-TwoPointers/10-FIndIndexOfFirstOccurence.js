// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack,
// or -1 if needle is not part of haystack.

// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.

/*
Logic:
We need to find where needle starts inside haystack.

Example:
haystack = "sadbutsad"
needle   = "sad"

We try each position in haystack as a possible start.

Start at index 0:
haystack from index 0 is "sadbutsad"
Does it start with "sad"? yes
So return 0.

Another example:
haystack = "leetcode"
needle   = "code"

Try index 0:
"leet..." does not match "code"

Try index 1:
"eetc..." does not match "code"

Try index 2:
"etco..." does not match "code"

Try index 3:
"tcod..." does not match "code"

Try index 4:
"code" matches
So return 4.

Important:
If needle length is 4, we compare 4 characters only.
If all 4 match, we found the answer.
*/

// Time - O(n * m)
// Space - O(1)
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let n = haystack.length;
  let m = needle.length;

  if (m === 0) return 0;
  if (m > n) return -1;

  // Try every possible starting index in haystack.
  // Last possible start is n - m because needle must fully fit.
  for (let i = 0; i <= n - m; i++) {
    let j = 0;

    // Compare needle with haystack starting at index i.
    // haystack[i + j] means:
    // current character in haystack for this attempt.
    while (j < m && haystack[i + j] === needle[j]) {
      j++;
    }

    // If j reached m, all characters of needle matched.
    if (j === m) {
      return i;
    }
  }

  return -1;
};
