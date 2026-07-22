// https://leetcode.com/problems/word-break/description/

// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into
// a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.

// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".

// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.

// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

/**
 * Approach:
 * We need to determine if a string can be perfectly segmented into words found
 * in a given dictionary.
 *
 * Idea:
 * This is a 1D Dynamic Programming (Bottom-Up Tabulation) problem, very similar
 * to Coin Change. We create a `dp` boolean array where `dp[i]` represents:
 * "Can we perfectly build the substring of length `i`?". We start with `dp[0] = true`.
 * For every string length `i`, we loop through the dictionary. If a word fits,
 * and the DP state BEFORE the word (`dp[i - word.length]`) is true, and the
 * substring actually matches the word, we mark `dp[i] = true`. We can then stop
 * checking other words for length `i` and move on. At the end, `dp[s.length]`
 * tells us if the entire string can be built.
 *
 * Steps:
 * 1. Create a `dp` array of size `s.length + 1`, filled with `false`.
 * 2. Base Case: `dp[0] = true` (An empty string is valid).
 * 3. Loop `i` (current length) from 1 up to `s.length`:
 *    - Loop through every `word` in `wordDict`:
 *        - If the word fits (`i - word.length >= 0`):
 *            - If `dp[i - word.length]` is true (meaning the prefix before this
 *              word is valid):
 *                - Extract the substring and check if it matches the `word`.
 *                - If it matches, set `dp[i] = true` and `break` out of the
 *                  inner loop (we only need 1 successful way to reach length `i`).
 * 4. Return `dp[s.length]`.
 *
 * Time Complexity: O(N^2 * W) or O(N^3)
 * - Where N is the length of the string `s`, and W is the number of words. The
 *   outer loop runs N times. The inner loop runs W times. The `substring`
 *   comparison takes O(N) time in the worst case.
 *
 * Space Complexity: O(N)
 * - We create a `dp` array of size `s.length + 1`.
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  // Create our DP Table and fill it with false
  const dp = new Array(s.length + 1).fill(false);

  // Base Case: An empty string requires 0 words, so it is valid
  dp[0] = true;

  // Build the table from length 1 all the way up to the full string length
  for (let i = 1; i <= s.length; i++) {
    // At the current length, try every single word in our dictionary
    for (let w = 0; w < wordDict.length; w++) {
      const word = wordDict[w];
      const wordLen = word.length;

      // 1. Does this word even fit?
      if (i - wordLen >= 0) {
        // 2. Was the string successfully built BEFORE this word started?
        if (dp[i - wordLen] === true) {
          // 3. Does the actual text match?
          const slice = s.substring(i - wordLen, i);
          if (slice === word) {
            // We found a valid way to build the string up to length i!
            dp[i] = true;

            // We only need ONE successful way to reach this length,
            // so we can stop checking the rest of the dictionary.
            break;
          }
        }
      }
    }
  }

  // Did we successfully build the entire string?
  return dp[s.length];
};

// --- EXAMPLE TRACE: Word Break ---

// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// String Length = 13

// Initial Setup:
// dp = [True, F, F, F, F, F, F, F, F, F, F, F, F, F]
// (Length 0 is True. The rest start as False).

// ---------------------------------------------------------
// 1. Lengths (i = 1 to 4): "a", "ap", "app", "appl"
// ---------------------------------------------------------
// - The computer checks the dictionary for lengths 1 through 4.
// - "apple" (length 5) doesn't even fit yet.
// - "pen" (length 3) fits at i=3 and i=4, but the substrings ("app", "ppl") don't match, and the dp state before them is False anyway.
// * RESULT: dp[1] to dp[4] remain False.

// ---------------------------------------------------------
// 2. Length (i = 5): "apple"
// ---------------------------------------------------------
// - Try "apple" (length 5):
//     1. Does it fit? Yes (5 - 5 >= 0).
//     2. Was the string valid BEFORE this word?
//        Check dp[5 - 5] -> dp[0]. Is dp[0] True? YES!
//     3. Does the text match?
//        substring(0, 5) is "apple". Match!
// * RESULT: dp[5] = True!
//   (We successfully built the string up to the letter 'e')

// ---------------------------------------------------------
// 3. Lengths (i = 6 to 7): "applep", "applepe"
// ---------------------------------------------------------
// - The computer tries "apple" and "pen" for these lengths.
// - For i=7, it tries "pen" (length 3).
//   Was the string valid before it? Check dp[7 - 3] -> dp[4]. Is dp[4] True? NO!
//   (Even though there is a "pe", we didn't have a valid string at length 4, so the chain is broken).
// * RESULT: dp[6] and dp[7] remain False.

// ---------------------------------------------------------
// 4. Length (i = 8): "applepen"  <-- THE LINK
// ---------------------------------------------------------
// - Try "apple" (length 5):
//   Check dp[8 - 5] -> dp[3]. Is dp[3] True? NO.
// - Try "pen" (length 3):
//     1. Does it fit? Yes (8 - 3 >= 0).
//     2. Was the string valid BEFORE this word?
//        Check dp[8 - 3] -> dp[5]. Is dp[5] True? YES!!!
//        (Because we successfully built "apple" earlier!)
//     3. Does the text match?
//        substring(5, 8) is "pen". Match!
// * RESULT: dp[8] = True!
//   (We successfully built the string up to the letter 'n')

// ---------------------------------------------------------
// 5. Lengths (i = 9 to 12): "applepena", etc.
// ---------------------------------------------------------
// - The computer tests words, but the `dp` states before them are all False, breaking the chain.
// * RESULT: dp[9] to dp[12] remain False.

// ---------------------------------------------------------
// 6. Length (i = 13): "applepenapple" (The Final Length!)
// ---------------------------------------------------------
// - Try "apple" (length 5):
//     1. Does it fit? Yes (13 - 5 >= 0).
//     2. Was the string valid BEFORE this word?
//        Check dp[13 - 5] -> dp[8]. Is dp[8] True? YES!!!
//        (Because we successfully built "applepen" earlier!)
//     3. Does the text match?
//        substring(8, 13) is "apple". Match!
// * RESULT: dp[13] = True!
// ---------------------------------------------------------

// The loop finishes! We check dp[13] and return True.
