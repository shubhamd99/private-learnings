// https://leetcode.com/problems/word-search/description/

// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
// vertically neighboring. The same letter cell may not be used more than once.

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true

/**
 * Approach:
 * We need to find if a specific string of characters exists sequentially in a 2D
 * grid, where we can move horizontally or vertically without reusing cells.
 *
 * Idea:
 * We combine 2D Grid DFS with Backtracking. We loop through every cell on the
 * board. If a cell matches the first letter of our target word, we launch our
 * `backtrack` function from that cell. The backtracking function checks if the
 * current cell matches the required letter. If it does, we temporarily mutate the
 * cell on the board (e.g., set it to '#') to mark it as visited. We then recursively
 * explore all 4 directions looking for the next letter. If a path fails, we backtrack
 * by restoring the cell's original letter so other paths can potentially use it.
 *
 * Steps:
 * 1. Initialize `ROWS` and `COLS`.
 * 2. Define the `backtrack(r, c, wordIndex)` function:
 *    - Base Case (Jackpot!): If `wordIndex === word.length`, we found the whole word! Return true.
 *    - Base Case (Out of Bounds): If `r` or `c` are outside the grid, return false.
 *    - Base Case (Mismatch/Visited): If `board[r][c] !== word[wordIndex]`, return false.
 *    - CHOOSE: Save the original character and mark the board `board[r][c] = '#'`.
 *    - EXPLORE: Call backtrack in all 4 directions with `wordIndex + 1`. If ANY
 *      direction returns true, return true immediately.
 *    - UN-CHOOSE: The path was a dead end. Restore `board[r][c] = originalChar`.
 *    - Return false (no valid path found from this cell).
 * 3. Loop through every cell in the grid.
 * 4. If `board[r][c] === word[0]`, call `backtrack(r, c, 0)`.
 * 5. If `backtrack` returns true, return true immediately!
 * 6. If we loop through the entire board and find nothing, return false.
 *
 * Time Complexity: O(M * N * 4^L)
 * - M and N are the dimensions of the board, L is the length of the word. We might
 *   start a search from every single cell (M * N). Each search can branch in 4
 *   directions up to L times. (In reality, it's slightly less than 4^L because
 *   we can't go backward).
 *
 * Space Complexity: O(L)
 * - The recursion call stack will go exactly L deep (the length of the word).
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const ROWS = board.length;
  const COLS = board[0].length;

  function backtrack(r, c, wordIndex) {
    // BASE CASE 1: We successfully found every single letter!
    if (wordIndex === word.length) {
      return true;
    }

    // BASE CASE 2: We walked off the edge of the board
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
      return false;
    }

    // BASE CASE 3: Wrong letter, OR we already visited this cell ('#')
    if (board[r][c] !== word[wordIndex]) {
      return false;
    }

    // 1. CHOOSE: Mark the cell as visited so we don't step on it again
    const originalChar = board[r][c];
    board[r][c] = "#";

    // 2. EXPLORE: Look Up, Down, Left, and Right for the NEXT letter
    const found =
      backtrack(r - 1, c, wordIndex + 1) || // UP
      backtrack(r + 1, c, wordIndex + 1) || // DOWN
      backtrack(r, c - 1, wordIndex + 1) || // LEFT
      backtrack(r, c + 1, wordIndex + 1); // RIGHT

    // If any of those directions found the rest of the word, we win!
    if (found) {
      return true;
    }

    // 3. UN-CHOOSE: We hit a dead end. We MUST restore the original letter
    // so that a completely different path can use it later!
    board[r][c] = originalChar;

    return false;
  }

  // Scan the entire board to find a starting letter
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // If we found the first letter, launch the backtrack search!
      if (board[r][c] === word[0]) {
        if (backtrack(r, c, 0) === true) {
          return true;
        }
      }
    }
  }

  // We checked the entire board and found nothing
  return false;
};
