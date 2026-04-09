// Word Break
// Given a string s and a dictionary of words,
// return true if s can be segmented into a sequence of dictionary words.
//
// Input:  s = "leetcode", wordDict = ["leet", "code"]
// Output: true   → "leet" + "code"
//
// Input:  s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true   → "apple" + "pen" + "apple"
//
// Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

// ---- SIMPLE VERSION (for interviews) ----
// Idea: bottom-up DP.
// dp[i] = true if s[0..i-1] can be segmented using the dictionary.
// For each position i, check all possible last words ending at i:
//   if dp[j] is true AND s[j..i] is in the dictionary → dp[i] = true.
// Base case: dp[0] = true (empty string is always valid).

function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict); // O(1) lookup
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // empty string base case

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      // if s[0..j-1] is valid AND s[j..i-1] is a word → s[0..i-1] is valid
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break; // found a valid segmentation ending at i
      }
    }
  }

  return dp[s.length];
}

// Examples
console.log(wordBreak("leetcode", ["leet", "code"])); // true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false

// Trace for "leetcode":
// dp[0]=T, dp[4]=T (s[0..3]="leet" in dict, dp[0]=T)
// dp[8]=T (s[4..7]="code" in dict, dp[4]=T) → true

// Time: O(n^2) — two nested loops, each up to n
// Space: O(n) — dp array + word set
