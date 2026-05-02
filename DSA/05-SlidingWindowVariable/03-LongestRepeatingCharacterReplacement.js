// https://leetcode.com/problems/longest-repeating-character-replacement/description/

// You are given a string s and an integer k.
// You can choose any character of the string and change it to any other uppercase English character.
// You can perform this operation at most k times.
// Return the length of the longest substring containing the same letter you can get after performing the above operations.

// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.

// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".

/*
Logic:
We want the longest substring where we can change at most k letters
so that all letters in that substring become the same.

Example:
s = "AABABBA", k = 1

For a window like "AABA":
A appears 3 times
B appears 1 time

The best choice is to keep the most frequent letter, A.
Then we only need to replace the other letters.

So:
window length = 4
most frequent letter count = 3
letters to replace = 4 - 3 = 1

If letters to replace <= k, this window is valid.
If letters to replace > k, this window is too expensive,
so we move left forward to make the window smaller.

right keeps expanding the window.
left moves only when the window becomes invalid.
maxLen stores the longest valid window found.
*/

// Time - O(n)
// Space - O(1) - Store only 26 letters

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const count = new Map();
  let left = 0;
  let maxCount = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (s[right] || 0) + 1);

    // Most frequent character count in the window so far.
    maxCount = Math.max(maxCount, count.get(s[right]));

    const windowLen = right - left + 1;

    // If we need more than k replacements, shrink the window.
    if (windowLen - maxCount > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};
