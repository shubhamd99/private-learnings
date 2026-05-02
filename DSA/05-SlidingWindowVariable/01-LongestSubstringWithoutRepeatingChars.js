// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// Given a string s, find the length of the longest substring without duplicate characters.

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

/*
Logic:
Use a sliding window with two pointers: left and right.
The Set stores characters currently inside the window.

Move right one step at a time to expand the window.
If s[right] is already in the Set, it means the window has a duplicate.
So move left forward, removing characters from the Set, until that duplicate is gone.

After the window is valid again, add s[right] and update the maximum window length.
*/

// Time complexity: O(n)
// Space complexity: O(k) - Where k is the number of unique characters in the current window.
// In the worst case, if all characters are unique. the Set stores all characters, so space becomes:
// Final Space - O(n)

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let maxLength = 0;
  const seen = new Set();

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};
