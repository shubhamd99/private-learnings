// https://leetcode.com/problems/distinct-subsequences/description/ - HARD

// Given two strings s and t, return the number of distinct subsequences of s which equals t.
// The test cases are generated so that the answer fits on a 32-bit signed integer.

// Input: s = "rabbbit", t = "rabbit"
// Output: 3
// Explanation:
// As shown below, there are 3 ways you can generate "rabbit" from s.
// rabbbit
// rabbbit
// rabbbit

// Input: s = "babgbag", t = "bag"
// Output: 5
// Explanation:
// As shown below, there are 5 ways you can generate "bag" from s.
// babgbag
// babgbag
// babgbag
// babgbag
// babgbag

/**
 * Approach:
 * We need to find the number of distinct subsequences of `s` that equal `t`.
 *
 * Idea:
 * This is a 2D Dynamic Programming (Tabulation) problem. We use the Empty String
 * Buffer trick, creating a matrix of size `(s.length + 1) x (t.length + 1)`.
 * If `t` is empty, there is 1 way to form it (delete everything in `s`), so
 * the first column is 1s. If `s` is empty but `t` is not, there are 0 ways, so
 * the first row is 0s.
 * As we iterate, if the characters mismatch, we are forced to drop the character
 * from `s` (take the value from Above). If the characters match, we can either
 * USE the character (take the Diagonal value) OR IGNORE the character and look
 * for another match later (take the value from Above). We add these two possibilities
 * together to get the total distinct ways.
 *
 * Steps:
 * 1. Initialize a 2D `dp` array of size `[s.length + 1][t.length + 1]`.
 * 2. Fill the entire first column (Col 0) with `1`s. Fill the rest with `0`s.
 * 3. Loop `r` (rows for string `s`) from 1 to `s.length`:
 *    - Loop `c` (cols for target `t`) from 1 to `t.length`:
 *        - Match Rule: If `s[r-1] === t[c-1]`, we add the Diagonal and the Above.
 *          `dp[r][c] = dp[r-1][c-1] + dp[r-1][c]`
 *        - Mismatch Rule: If they do not match, we just carry down the Above.
 *          `dp[r][c] = dp[r-1][c]`
 * 4. Return the bottom-right cell: `dp[s.length][t.length]`.
 *
 * Time Complexity: O(S * T)
 * - We iterate through the entire matrix exactly once.
 *
 * Space Complexity: O(S * T)
 * - We create a 2D matrix of size (S+1) x (T+1).
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const S = s.length;
  const T = t.length;

  // 1. Create the DP Table and fill it with 0s
  const dp = new Array(S + 1).fill(0).map(() => new Array(T + 1).fill(0));

  // 2. Base Case: Col 0 (Target 't' is empty)
  // There is exactly 1 way to form an empty string: delete everything.
  for (let r = 0; r <= S; r++) {
    dp[r][0] = 1;
  }

  // (Row 0 is already filled with 0s from our initialization,
  // which correctly handles when 's' is empty but 't' is not).

  // 3. Loop through the grid
  for (let r = 1; r <= S; r++) {
    for (let c = 1; c <= T; c++) {
      const charS = s[r - 1];
      const charT = t[c - 1];

      if (charS === charT) {
        // RULE 1 (MATCH!): Diagonal + Above
        // We add the ways if we USE the letter (Diagonal)
        // AND the ways if we IGNORE the letter (Above)
        dp[r][c] = dp[r - 1][c - 1] + dp[r - 1][c];
      } else {
        // RULE 2 (MISMATCH!): Above Only
        // The letter is useless. Just carry down the answer from before.
        dp[r][c] = dp[r - 1][c];
      }
    }
  }

  // The bottom-right corner holds the total number of distinct ways
  return dp[S][T];
};

// --- EXAMPLE TRACE: Distinct Subsequences ---

// Input: s = "rabbbit" (Rows), t = "rabbit" (Cols)
// Grid Size: 8 Rows x 7 Cols (Using the +1 Buffer Trick)

// Initial Grid:
// Col 0 (Empty 't') is filled with 1s.
// Row 0 (Empty 's') is filled with 0s.
// Row 0 (""): [1, 0, 0, 0, 0, 0, 0]

// ---------------------------------------------------------
// Row 1: charS = 'r'
// ---------------------------------------------------------
// - Col 1 ('r'): MATCH!
//   Diagonal (1) + Above (0) = 1.
// - Cols 2-6: Mismatch. (Carry down 0 from Above).
// * Row 1 State: [1, 1, 0, 0, 0, 0, 0]

// ---------------------------------------------------------
// Row 2: charS = 'a'
// ---------------------------------------------------------
// - Col 1 ('r'): Mismatch. Carry down Above (1).
// - Col 2 ('a'): MATCH!
//   Diagonal (1) + Above (0) = 1.
// - Cols 3-6: Mismatch.
// * Row 2 State: [1, 1, 1, 0, 0, 0, 0]

// ---------------------------------------------------------
// Row 3: charS = 'b' (The first 'b')
// ---------------------------------------------------------
// - Col 1 ('r'), Col 2 ('a'): Mismatch. Carry down (1, 1).
// - Col 3 ('b'): MATCH!
//   Diagonal (1) + Above (0) = 1.
// - Cols 4-6: Mismatch.
// * Row 3 State: [1, 1, 1, 1, 0, 0, 0]

// ---------------------------------------------------------
// Row 4: charS = 'b' (The second 'b') <-- MAGIC HAPPENS HERE
// ---------------------------------------------------------
// - Col 1 ('r'), Col 2 ('a'): Mismatch. Carry down (1, 1).
// - Col 3 ('b'): MATCH!
//   Diagonal (dp[3][2] = 1) + Above (dp[3][3] = 1) = 2!
//   (Why? We can use the first 'b' OR this second 'b'!)
// - Col 4 ('b'): MATCH!
//   Diagonal (dp[3][3] = 1) + Above (0) = 1.
// - Cols 5-6: Mismatch.
// * Row 4 State: [1, 1, 1, 2, 1, 0, 0]

// ---------------------------------------------------------
// Row 5: charS = 'b' (The third 'b') <-- MORE MAGIC
// ---------------------------------------------------------
// - Col 1 ('r'), Col 2 ('a'): Mismatch. Carry down (1, 1).
// - Col 3 ('b'): MATCH!
//   Diagonal (dp[4][2] = 1) + Above (dp[4][3] = 2) = 3!
// - Col 4 ('b'): MATCH!
//   Diagonal (dp[4][3] = 2) + Above (dp[4][4] = 1) = 3!
// - Cols 5-6: Mismatch.
// * Row 5 State: [1, 1, 1, 3, 3, 0, 0]

// ---------------------------------------------------------
// Row 6: charS = 'i'
// ---------------------------------------------------------
// - Cols 1-4: Mismatch. Carry down Above.
// - Col 5 ('i'): MATCH!
//   Diagonal (3) + Above (0) = 3.
// * Row 6 State: [1, 1, 1, 3, 3, 3, 0]

// ---------------------------------------------------------
// Row 7: charS = 't'  <-- THE FINAL ROW
// ---------------------------------------------------------
// - Cols 1-5: Mismatch. Carry down Above.
// - Col 6 ('t'): MATCH!
//   Diagonal (3) + Above (0) = 3.
// * Row 7 State: [1, 1, 1, 3, 3, 3, 3]
// ---------------------------------------------------------

// The loop finishes!
// We check the bottom-right corner: dp[7][6].
// Result: 3.
