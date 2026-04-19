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
// Space: O(k) - O(min(n, alphabet)) — Set holds at most unique chars in window

// The Logic
// Initialization: Use a Set to store characters currently in your window and two pointers (left, right) starting at index 0.
// Expansion: Iterate through the string with the right pointer.
// Collision Handling: If the character at right is already in your Set, it means you have a repeat. Move the left pointer forward and remove characters from the Set until the duplicate is gone.
// Result: Keep track of the maximum window size (right - left + 1) encountered during the process

// Time: O(n) — each char added/removed from Set at most once
// Space: O(k) - O(min(n, alphabet)) — Set holds at most unique chars in window

function lengthOfLongestSubstring2(s) {
  const set = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window from the left if duplicate is found
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    // Add current character to the window
    set.add(s[right]);

    // Update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Example: If your window is from index 0 to index 2 (characters "a", "b", "c").
// (This would be wrong, as there are 3 characters).
// This gives the correct count).
// maxLength = Math.max(maxLength, right - left + 1);

// Examples
console.log("-----------------");
console.log(lengthOfLongestSubstring2("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring2("bbbbb")); // 1 ("b")
console.log(lengthOfLongestSubstring2("pwwkew")); // 3 ("wke")

// How it works step-by-step
// Imagine the string is "abcb":
// 	1.	Window is "abc": set = {a, b, c}, left = 0, right = 2.
// 	2.	Next char is "b": s[right] is "b".
// 	3.	Conflict!: set.has("b") is true.
// 	4.	First loop iteration:
// •	set.delete(s[left]) (deletes "a").
// •	left becomes 1.
// •	set is now {b, c}.
// 	5.	Second loop iteration:
// •	set.has("b") is still true.
// •	set.delete(s[left]) (deletes "b").
// •	left becomes 2.
// •	set is now {c}.
// 	6.	Loop ends: Now set.has("b") is false.
// 	7.	Final step: The code adds the new "b" to the set.
// •	set.add("b")
// •	New Window is "cb" (set = {c, b}).
