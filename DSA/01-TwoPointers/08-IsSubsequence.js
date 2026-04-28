// https://leetcode.com/problems/is-subsequence/

// move i only when s[i] matches t[j], always move j forward
// if i reaches end of s, all characters matched in order, return true

// You have two strings:
// s = "ace"
// t = "abcde"
// You are trying to find all characters of s inside t in order

// j is at 'a', i is at 'a' -> match, i moves forward, found 1 out of 3
// j is at 'b', i is at 'c' -> no match, j keeps walking
// j is at 'c', i is at 'c' -> match, i moves forward, found 2 out of 3
// j is at 'd', i is at 'e' -> no match, j keeps walking
// j is at 'e', i is at 'e' -> match, i moves forward, found 3 out of 3

// i reached the end of s, meaning every character of s was found in t in the correct order. Return true.

// O(n) time, O(1) space
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }

  return i === s.length;
};
