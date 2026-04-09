// Longest Substring with K Unique Characters
// Find the length of the longest substring that contains exactly k unique characters.
//
// Input:  s = "araaci", k = 2
// Output: 4   → "araa" (a, r are the 2 unique chars)
//
// Input:  s = "araaci", k = 1
// Output: 2   → "aa"
//
// Input:  s = "cbbebi", k = 3
// Output: 5   → "cbbeb"

// ---- SIMPLE VERSION (for interviews) ----
// Idea: sliding window with a frequency Map.
// Expand right, add char to map. When unique chars > k, shrink from left.
// When unique chars === k, update max.

function longestSubstringKUnique(s, k) {
  const freq = new Map();
  let left = 0;
  let max = 0;

  for (let right = 0; right < s.length; right++) {
    // add right char to window
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);

    // shrink from left if unique chars exceed k
    while (freq.size > k) {
      freq.set(s[left], freq.get(s[left]) - 1);
      if (freq.get(s[left]) === 0) freq.delete(s[left]); // remove if count hits 0
      left++;
    }

    // window has at most k unique chars — update max if exactly k
    if (freq.size === k) {
      max = Math.max(max, right - left + 1);
    }
  }

  return max;
}

// Examples
console.log(longestSubstringKUnique("araaci", 2)); // 4 ("araa")
console.log(longestSubstringKUnique("araaci", 1)); // 2 ("aa")
console.log(longestSubstringKUnique("cbbebi", 3)); // 5 ("cbbeb")

// Time: O(n) — each char added/removed at most once
// Space: O(k) — map holds at most k unique chars
