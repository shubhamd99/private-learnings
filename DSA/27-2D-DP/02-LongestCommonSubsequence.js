// https://leetcode.com/problems/longest-common-subsequence/description/

// Given two strings text1 and text2, return the length of their longest common subsequence.
// If there is no common subsequence, return 0.
// A subsequence of a string is a new string generated from the original string with some characters (can be none)
// deleted without changing the relative order of the remaining characters.
// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.

// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.

/**
 * Approach:
 * We need to find the length of the longest common subsequence between two strings.
 *
 * Idea:
 * This is a classic 2D Dynamic Programming (Tabulation) problem. We construct a
 * 2D matrix `dp` of size `(text1.length + 1) x (text2.length + 1)`.
 *
 * THE EMPTY STRING BUFFER TRICK (+ 1):
 * We add +1 to the size of the matrix to create a "buffer" at Row 0 and Col 0.
 * We fill the entire matrix with 0s. This mathematically represents comparing our
 * strings against an empty string "". This allows us to look diagonally backward
 * (`dp[r-1][c-1]`) on the very first letter without crashing the program with an
 * "Out of Bounds" error!
 *
 * Steps:
 * 1. Initialize a 2D `dp` array of size `[text1.length + 1][text2.length + 1]`,
 *    filled entirely with 0s (Our Empty String Buffers).
 * 2. Loop `r` (rows) from 1 to `text1.length`:
 *    - Loop `c` (cols) from 1 to `text2.length`:
 *        - String Indexing: Get the characters `char1 = text1[r - 1]` and
 *          `char2 = text2[c - 1]`.
 *        - Match Rule: If `char1 === char2`, `dp[r][c] = 1 + dp[r-1][c-1]`
 *        - Mismatch Rule: If they do not match, `dp[r][c] = Math.max(dp[r-1][c], dp[r][c-1])`
 * 3. Return the bottom-right cell: `dp[text1.length][text2.length]`.
 *
 * Time Complexity: O(M * N)
 * - Where M and N are the lengths of `text1` and `text2`. We iterate through the
 *   entire M x N grid exactly once.
 *
 * Space Complexity: O(M * N)
 * - We create a 2D matrix of size (M+1) x (N+1) to store our DP states.
 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const M = text1.length;
  const N = text2.length;

  // Create a 2D DP Table of size (M+1) x (N+1) filled with 0s.
  // Row 0 and Col 0 will forever remain 0, acting as our safety buffers.
  const dp = new Array(M + 1).fill(0).map(() => new Array(N + 1).fill(0));

  // THE <= LOOP BOUNDS TRICK:
  // Because we made our grid size M + 1, it has an extra slot at the end.
  // If M = 3, our grid has slots 0, 1, 2, 3.
  // To ensure we don't skip the final letter, we MUST use <= M to reach slot 3!
  for (let r = 1; r <= M; r++) {
    for (let c = 1; c <= N; c++) {
      // Notice we use r-1 and c-1 here because the strings are 0-indexed,
      // but our DP loop is 1-indexed to account for the buffer!

      const char1 = text1[r - 1];
      const char2 = text2[c - 1];

      if (char1 === char2) {
        // RULE 1 (MATCH!): Diagonal + 1
        // Thanks to our Buffer, if r=1 and c=1, [r-1][c-1] safely hits [0][0]!
        dp[r][c] = 1 + dp[r - 1][c - 1];
      } else {
        // RULE 2 (MISMATCH!): Max of Above or Left
        // We carry forward the best score found by dropping char1 or dropping char2.
        rp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]);
      }
    }
  }

  // The bottom-right corner holds the absolute longest sequence length!
  return dp[M][N];
};

// --- EXAMPLE TRACE: Longest Common Subsequence ---

// Input: text1 = "abcde" (Rows), text2 = "ace" (Cols)
// Grid Size: 6 Rows x 4 Cols (Because of the +1 Buffer Trick)

// Initial Grid (Row 0 is our Empty String Buffer!):
// Row 0 (""): [0, 0, 0, 0]

// ---------------------------------------------------------
// Row 1: char1 = 'a'
// ---------------------------------------------------------
// - Col 1 ('a'): MATCH!
//   dp[1][1] = 1 + Diagonal (dp[0][0]) -> 1 + 0 = 1!
// - Col 2 ('c'): Mismatch.
//   Max of Above (0) or Left (1) -> 1
// - Col 3 ('e'): Mismatch.
//   Max of Above (0) or Left (1) -> 1

// * Row 1 State: [0, 1, 1, 1]

// ---------------------------------------------------------
// Row 2: char1 = 'b'
// ---------------------------------------------------------
// - Col 1 ('a'): Mismatch. Max of Above (1) or Left (0) -> 1
// - Col 2 ('c'): Mismatch. Max of Above (1) or Left (1) -> 1
// - Col 3 ('e'): Mismatch. Max of Above (1) or Left (1) -> 1

// * Row 2 State: [0, 1, 1, 1]
// (Notice how the score of 1 carries downwards from the 'a' match above!)

// ---------------------------------------------------------
// Row 3: char1 = 'c'
// ---------------------------------------------------------
// - Col 1 ('a'): Mismatch. Max of Above (1) or Left (0) -> 1
// - Col 2 ('c'): MATCH!
//   dp[3][2] = 1 + Diagonal (dp[2][1]) -> 1 + 1 = 2!
// - Col 3 ('e'): Mismatch.
//   Max of Above (1) or Left (2) -> 2

// * Row 3 State: [0, 1, 2, 2]

// ---------------------------------------------------------
// Row 4: char1 = 'd'
// ---------------------------------------------------------
// - Col 1 ('a'): Mismatch. Max of Above (1) or Left (0) -> 1
// - Col 2 ('c'): Mismatch. Max of Above (2) or Left (1) -> 2
// - Col 3 ('e'): Mismatch. Max of Above (2) or Left (2) -> 2

// * Row 4 State: [0, 1, 2, 2]

// ---------------------------------------------------------
// Row 5: char1 = 'e'  <-- THE FINAL ROW
// ---------------------------------------------------------
// - Col 1 ('a'): Mismatch. Max of Above (1) or Left (0) -> 1
// - Col 2 ('c'): Mismatch. Max of Above (2) or Left (1) -> 2
// - Col 3 ('e'): MATCH!
//   dp[5][3] = 1 + Diagonal (dp[4][2]) -> 1 + 2 = 3!

// * Row 5 State: [0, 1, 2, 3]
// ---------------------------------------------------------

// The loop finishes!
// We check the bottom-right corner: dp[5][3].
// Result: 3.
