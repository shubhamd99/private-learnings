// https://leetcode.com/problems/design-add-and-search-words-data-structure/

// Design a data structure that supports adding new words and finding if a string matches any previously added string.

// Implement the WordDictionary class:

// WordDictionary() Initializes the object.
// void addWord(word) Adds word to the data structure, it can be matched later.
// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

/**
 * Approach:
 * We need to design a data structure that can store words and search for them.
 * The search function must support the '.' wildcard character, which can match
 * any single letter.
 *
 * Idea:
 * We will use a Trie (Prefix Tree) exactly like we did in the standard Trie problem.
 * `addWord` is identical to standard Trie insertion.
 * For `search`, because of the '.' wildcard, a simple loop won't work anymore.
 * If we encounter a '.', we must recursively search all the children of the
 * current node. If any of those recursive searches find a valid path, we return true.
 *
 * Steps:
 * 1. Define Node & Constructor: Create a `TrieNode` with `children` and `isEndOfWord`.
 *    Create the `WordDictionary` constructor to hold the `root`.
 * 2. `addWord(word)`: Exactly the same as standard Trie insertion. Loop through
 *    characters, create missing nodes, and stamp the final node with `isEndOfWord = true`.
 * 3. `search(word)`: We need a recursive helper function `dfs(index, node)`.
 *    - `index` is which letter of the word we are currently looking at.
 *    - `node` is where we currently are in the Trie.
 *    - Base Case: If `index === word.length`, we reached the end of the word.
 *      Return `node.isEndOfWord` (is it stamped?).
 *    - Check the current letter: `const char = word[index]`.
 *    - **The Wildcard Trick**: If `char === '.'`:
 *        Loop through every key (every letter) inside `node.children`.
 *        For each child, recursively call `dfs(index + 1, childNode)`.
 *        If ANY of them return true, we immediately return true!
 *        If we check all children and none work, return false.
 *    - **Normal Letter**: If it's a normal letter, check if it exists in `children`.
 *        If it doesn't, return false (dead end).
 *        If it does, recursively call `dfs(index + 1, node.children[char])`.
 * 4. Kick off the search: Call `dfs(0, this.root)`.
 *
 * Time Complexity:
 * - addWord: O(L) where L is the length of the word.
 * - search:
 *   - Best Case (no dots): O(L)
 *   - Worst Case (lots of dots, e.g., "....."): O(26^L), because at every dot
 *     we might have to branch out and check up to 26 different paths!
 *
 * Space Complexity: O(N * L) for storing the Trie. The search function uses O(L)
 * space on the recursion call stack.
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let currentNode = this.root;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    if (!currentNode.children[char]) {
      currentNode.children[char] = new TrieNode();
    }

    currentNode = currentNode.children[char];
  }

  currentNode.isEndOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  function dfs(index, node) {
    // Base Case: We reached the end of the word we are searching for
    // word.length - 1 is when you are looking at the final letter. word.length is when you have successfully stepped inside that final letter and are ready to check its stamp.
    if (index === word.length) {
      return node.isEndOfWord; // Did we land on a stamped node?
    }

    const char = word[index];

    // THE WILDCARD CHECK: If it's a dot, we must try EVERYTHING
    if (char === ".") {
      // Get all the actual letters hanging off this current node
      const allPossibleLetters = Object.keys(node.children);

      // Try going down every single one of those paths
      for (let i = 0; i < allPossibleLetters.length; i++) {
        const letter = allPossibleLetters[i];
        const childNode = node.children[letter];

        // If ANY of these paths lead to success, we win!
        if (dfs(index + 1, childNode)) {
          return true;
        }
      }

      return false;
    }
    // NORMAL LETTER CHECK
    else {
      // Dead end
      if (!node.children[char]) {
        return false;
      }
      // Step down to the next letter
      return dfs(index + 1, node.children[char]);
    }
  }

  // search starting at letter 0 and the root of the tree
  return dfs(0, this.root);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
