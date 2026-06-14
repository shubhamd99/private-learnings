// https://leetcode.com/problems/word-search-ii/description/ - HARD

// Given an m x n board of characters and a list of strings words, return all words on the board.

// Each word must be constructed from letters of sequentially adjacent cells,
// where adjacent cells are horizontally or vertically neighboring.
// The same letter cell may not be used more than once in a word.

// Input:
// board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
// words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]

/**
 * Approach:
 * We need to find all words from a given list that exist in a 2D grid of characters.
 *
 * Idea:
 * We will build a Trie containing all the words we are looking for. To make it
 * easier to record our answers, instead of using an `isEndOfWord` boolean, the
 * final node of a word will just store the `word` string itself!
 * We will iterate through every cell on the board. For each cell, we will start a
 * recursive DFS to explore its neighbors while simultaneously walking down the Trie.
 * If the current board letter doesn't exist in the current Trie node's children,
 * we stop exploring that path (pruning). If we land on a Trie node that contains a
 * `word`, we add it to our results and delete it from the Trie to avoid duplicates.
 * We use backtracking (temporarily changing the board letter to '#') to ensure we
 * don't reuse the same cell in a single word.
 *
 * Steps:
 * 1. Define TrieNode: `children = {}` and `word = null`.
 * 2. Build the Trie: Loop through the given `words` list and insert them all into
 *    the Trie. Stamp the final node with the actual `word` string.
 * 3. Initialize Variables: `result` array to hold the found words.
 * 4. Create DFS Helper: `dfs(row, col, trieNode)`
 *    - Out of Bounds Check: If `row` or `col` are off the board, or if the cell is
 *      currently crossed out (`#`), return immediately.
 *    - Trie Check: Get the letter at the current cell. If that letter is NOT in
 *      the current `trieNode.children`, this path is a dead end. Return immediately.
 *    - Step Down: Move down the Trie to `trieNode.children[letter]`.
 *    - Word Found Check: If this new Trie node has a `word` saved in it, we found
 *      a winner! Push it to `result`, and set `node.word = null` so we never
 *      accidentally find it a second time.
 *    - Backtracking: Temporarily change the board cell to `#`. Call DFS on the 4
 *      neighbors (Up, Down, Left, Right). After they finish, change the cell back
 *      to its original letter.
 * 5. Start Search: Use a nested `for` loop to start a `dfs()` from every single
 *    cell on the board.
 * 6. Return `result`.
 *
 * Time Complexity: O(M * N * 4^L)
 * - M and N are the dimensions of the board. We start a search from every cell.
 * - L is the maximum length of a word. At each step, we can branch out in 3 valid
 *   directions (4 minus the cell we just came from). In the worst case, we explore
 *   paths of length L.
 * - Building the Trie takes O(W * L) where W is the number of words.
 *
 * Space Complexity: O(W * L)
 * - The space is dominated by the Trie storing all the words.
 * - The DFS recursion call stack will use up to O(L) space.
 */

class TrieNode {
  constructor() {
    this.children = {};
    // Instead of a boolean, store the full word here to easily push to results!
    this.word = null;
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const result = [];
  const root = new TrieNode();

  // Build the Trie with all the words
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let currentNode = root;

    for (let j = 0; j < word.length; j++) {
      const char = word[j];

      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }

      currentNode = currentNode.children[char];
    }

    // Stamp the final node with the actual word string!
    currentNode.word = word;
  }

  const ROWS = board.length;
  const COLS = board[0].length;

  function dfs(r, c, node) {
    // Stop if we go out of bounds, or hit a crossed-out cell
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] === "#") {
      return;
    }

    const char = board[r][c];

    if (!node.children[char]) {
      return;
    }

    // Step down the Trie
    const nextNode = node.children[char];

    // Did we land on a node that completes a word?
    if (nextNode.word !== null) {
      result.push(nextNode.word);
      nextNode.word = null; // Delete it so we don't find duplicates!
    }

    // BACKTRACKING: Temporarily cross out this cell
    board[r][c] = "#";

    // Explore all 4 neighbors
    dfs(r - 1, c, nextNode); // UP
    dfs(r + 1, c, nextNode); // DOWN
    dfs(r, c - 1, nextNode); // LEFT
    dfs(r, c + 1, nextNode); // RIGHT

    // BACKTRACKING: Undo the cross-out so other paths can use this cell
    board[r][c] = char;
  }

  // Start a search from every single cell on the board
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dfs(r, c, root);
    }
  }

  return result; // Return the found words
};
