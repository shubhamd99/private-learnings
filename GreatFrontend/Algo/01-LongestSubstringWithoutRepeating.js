// Longest Substring Without Repeating Characters
// Given a string, find the length of the longest substring without repeating characters.
//
// Input:  "abcabcbb"
// Output: 3          → "abc"
//
// Input:  "bbbbb"
// Output: 1          → "b"
//
// Input:  "pwwkew"
// Output: 3          → "wke"

// ---- SIMPLE VERSION (for interviews) ----
// Idea: sliding window with a Set.
// Expand right pointer, if char already in Set shrink from left until it's removed.
// Track max window size throughout.

function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let max = 0;

  for (let right = 0; right < s.length; right++) {
    // shrink window from left until duplicate is removed
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

// Examples
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb")); // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew")); // 3 ("wke")

// Time: O(n) — each char added/removed from Set at most once
// Space: O(min(n, alphabet)) — Set holds at most unique chars in window
