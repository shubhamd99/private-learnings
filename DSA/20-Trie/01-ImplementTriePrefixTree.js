// https://leetcode.com/problems/implement-trie-prefix-tree/

// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and
// retrieve keys in a dataset of strings. There are various applications of this data structure,
// such as autocomplete and spellchecker.

// It is officially called a Prefix Tree because of its secret superpower:
// Words that share the same starting letters (the same prefix) share the exact same path down the tree.

// Implement the Trie class:
// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]

// Explanation:
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True

/**
 * Approach:
 * We need to implement a Trie (Prefix Tree) with `insert`, `search`, and `startsWith` methods.
 *
 * Idea:
 * We will first create a `TrieNode` helper class. Each node will contain a `children`
 * object to store links to the next letters, and a boolean `isEndOfWord` to mark
 * the end of inserted words.
 * For `insert`, we traverse down the tree letter by letter, creating new nodes
 * when a letter is missing. We mark the last node as the end of a word.
 * For `search`, we traverse down the tree. If a letter is missing, we return false.
 * If we finish traversing, we return the `isEndOfWord` flag of the final node.
 * For `startsWith`, we do the exact same traversal, but if we finish without failing,
 * we just return true.
 *
 * Steps:
 * 1. Define `TrieNode`: A simple object with `children = {}` and `isEndOfWord = false`.
 * 2. Define `Trie()` Constructor: Set `this.root = new TrieNode()`.
 * 3. `insert(word)`:
 *    - Start a `currentNode` pointer at `this.root`.
 *    - Loop through every `char` in the word.
 *    - If `currentNode.children[char]` doesn't exist, create a `new TrieNode()` for it.
 *    - Move `currentNode` down to `currentNode.children[char]`.
 *    - After the loop, set `currentNode.isEndOfWord = true`.
 * 4. `search(word)`:
 *    - Start at `this.root`.
 *    - Loop through every `char` in the word.
 *    - If the `char` is missing from `children`, return `false`.
 *    - Move `currentNode` down.
 *    - After the loop, return `currentNode.isEndOfWord`.
 * 5. `startsWith(prefix)`:
 *    - Start at `this.root`.
 *    - Loop through every `char` in the prefix.
 *    - If the `char` is missing, return `false`.
 *    - Move `currentNode` down.
 *    - After the loop, just return `true`!
 *
 * Time Complexity:
 * - Insert: O(L) where L is the length of the word.
 * - Search: O(L) where L is the length of the word.
 * - StartsWith: O(L) where L is the length of the prefix.
 *
 * Space Complexity: O(N * L) overall.
 * - N is the number of words inserted, and L is the average length of the words.
 *   In the worst case (where no words share any prefixes), we create a new node
 *   for every single character of every single word.
 */

class TrieNode {
  constructor() {
    this.children = {}; // Stores all the branching letters
    this.isEndOfWord = false; // The stamp!
  }
}

var Trie = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let currentNode = this.root;

  // Go through the word letter by letter
  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    // If the letter doesn't have a path yet, build one!
    if (!currentNode.children[char]) {
      currentNode.children[char] = new TrieNode();
    }

    // Step down into that letter's node
    currentNode = currentNode.children[char];
  }

  // We finished the word. Stamp the final node!
  currentNode.isEndOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let currentNode = this.root;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    // If we hit a dead end, the word doesn't exist
    if (!currentNode.children[char]) {
      return false;
    }

    // Step down
    currentNode = currentNode.children[char];
  }

  // We found the letters, but is it stamped as a real word?
  return currentNode.isEndOfWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let currentNode = this.root;

  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];

    // If we hit a dead end, the prefix doesn't exist
    if (!currentNode.children[char]) {
      return false;
    }

    // Step down
    currentNode = currentNode.children[char];
  }

  // We successfully traced the whole prefix! We don't care if it's a full word.
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// --- EXAMPLE TRACE: Trie (Prefix Tree) ---

// Commands to run:
// 1. insert("apple")
// 2. search("apple")
// 3. search("app")
// 4. startsWith("app")
// 5. insert("app")
// 6. search("app")

// ---------------------------------------------------------
// 1. insert("apple")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a': Doesn't exist. Create Node('a'), step down into it.
// - 'p': Doesn't exist. Create Node('p'), step down.
// - 'p': Doesn't exist. Create Node('p'), step down.
// - 'l': Doesn't exist. Create Node('l'), step down.
// - 'e': Doesn't exist. Create Node('e'), step down.
// - Loop ends. Stamp the final node ('e') with isEndOfWord = true.

// What the tree looks like now:
// (root) -> a -> p -> p -> l -> e*
// (* means isEndOfWord is true)

// ---------------------------------------------------------
// 2. search("apple")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a', 'p', 'p', 'l', 'e': We successfully follow the path all the way down.
// - Loop ends. We are standing on the 'e' node.
// - Check: Does 'e' have the isEndOfWord stamp? YES.
// - Returns: true.

// ---------------------------------------------------------
// 3. search("app")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a', 'p', 'p': We successfully follow the path down to the second 'p'.
// - Loop ends. We are standing on the second 'p' node.
// - Check: Does this 'p' have the isEndOfWord stamp? NO. (We only stamped 'e' earlier).
// - Returns: false. (The letters exist, but it's not a saved word).

// ---------------------------------------------------------
// 4. startsWith("app")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a', 'p', 'p': We successfully follow the path down to the second 'p'.
// - Loop ends.
// - Check: Because this is startsWith, we DO NOT CARE about the stamp. We survived the path without hitting a dead end.
// - Returns: true.

// ---------------------------------------------------------
// 5. insert("app")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a', 'p', 'p': These nodes ALREADY EXIST from when we inserted "apple"!
// - We do NOT create new nodes. We just step down the existing path to the second 'p'.
// - Loop ends. We are standing on the second 'p' node.
// - Stamp this existing 'p' node with isEndOfWord = true.

// What the tree looks like now:
// (root) -> a -> p -> p* -> l -> e*
// (Notice how "app" and "apple" share the exact same starting path!)

// ---------------------------------------------------------
// 6. search("app")
// ---------------------------------------------------------
// - Start at the (root).
// - 'a', 'p', 'p': We successfully follow the path down to the second 'p'.
// - Loop ends. We are standing on the second 'p' node.
// - Check: Does this 'p' have the isEndOfWord stamp? YES! (We just stamped it in step 5).
// - Returns: true.

// ----------------------- RECURSION ------------------------

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search2 = function (word) {
  function dfs(index, currentNode) {
    // Base Case: We have successfully stepped through every letter of the word.
    // Are we standing on a node that is stamped as a real word?
    if (index === word.length) {
      return currentNode.isEndOfWord;
    }

    const char = word[index];

    // If the next letter doesn't exist, we hit a dead end. The word is not here.
    if (!currentNode.children[char]) {
      return false;
    }

    // Step down to the next letter's node, and move our index forward by 1
    return dfs(index + 1, currentNode.children[char]);
  }

  // recursion starting at the first letter (index 0) and the root node
  return dfs(0, this.root);
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith2 = function (prefix) {
  function dfs(index, currentNode) {
    // Base Case: We have successfully stepped through every letter of the prefix.
    // We survived without hitting a dead end, so we immediately return true!
    if (index === prefix.length) {
      return true;
    }

    const char = prefix[index];

    // If the next letter doesn't exist, we hit a dead end. The prefix is not here.
    if (!currentNode.children[char]) {
      return false;
    }

    // Step down to the next letter's node, and move our index forward by 1
    return dfs(index + 1, currentNode.children[char]);
  }

  // recursion starting at the first letter (index 0) and the root node
  return dfs(0, this.root);
};
