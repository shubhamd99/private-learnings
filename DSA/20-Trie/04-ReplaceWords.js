// https://leetcode.com/problems/replace-words/description/

// In English, we have a concept called root, which can be followed by some other word to form another longer word -
// let's call this word derivative. For example, when the root "help" is followed by the word "ful",
// we can form a derivative "helpful".

// Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces,
// replace all the derivatives in the sentence with the root forming it.
// If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

// Return the sentence after the replacement.

// Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
// Output: "the cat was rat by the bat"

/**
 * Approach:
 * We need to replace words in a sentence with their shortest matching prefix root
 * from a given dictionary.
 *
 * Idea:
 * We will build a Trie (Prefix Tree) out of the given `dictionary`. We will
 * then split the `sentence` into an array of words. For each word, we will
 * traverse the Trie character by character. The moment we land on a Trie node
 * marked with `isEndOfWord`, we have found the shortest matching root! We can
 * immediately replace the word and stop traversing. If we hit a dead end in the
 * Trie before finding an `isEndOfWord` stamp, no root exists, so we keep the
 * original word. Finally, we join the words back together into a sentence.
 *
 * Steps:
 * 1. Define TrieNode: `children = {}` and `isEndOfWord = false`.
 * 2. Build the Trie: Loop through the `dictionary` array and insert every root
 *    into the Trie.
 * 3. Split the Sentence: `const words = sentence.split(' ')`.
 * 4. Process Each Word: Loop through the `words` array.
 *    - Start a pointer at the root of the Trie.
 *    - Create an empty string `currentPrefix` to keep track of the letters we trace.
 *    - Loop through the characters of the current word:
 *        a. If the character doesn't exist in the Trie, it's a dead end. Break the inner loop.
 *        b. Add the character to `currentPrefix`.
 *        c. Step down to the child node.
 *        d. If this child node has `isEndOfWord === true`, we found the shortest root!
 *           Replace the word in our array (`words[i] = currentPrefix`) and break the inner loop.
 * 5. Re-join the Sentence: `return words.join(' ')`.
 *
 * Time Complexity: O(D + S)
 * - D is the total number of characters across all words in the dictionary (to build the Trie).
 * - S is the total number of characters in the sentence. We process each character
 *   of the sentence at most once while searching the Trie.
 *
 * Space Complexity: O(D + S)
 * - O(D) space to store the Trie.
 * - O(S) space to store the split words array.
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const root = new TrieNode();

  // Build the Trie with all the roots
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    let currentNode = root;

    for (let j = 0; j < word.length; j++) {
      const char = word[j];

      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  // Chop the sentence into individual words
  const words = sentence.split(" ");

  // Process each word against the Trie
  for (let i = 0; i < words.length; i++) {
    let currentNode = root;
    let currentPrefix = "";

    const word = words[i];

    // Trace the letters of the word down the tree
    for (let j = 0; j < word.length; j++) {
      const char = word[j];

      // If we hit a dead end, no root exists for this word. Stop searching.
      if (!currentNode.children[char]) {
        break;
      }

      // Valid step! Record the letter and step down.
      currentPrefix += char;
      currentNode = currentNode.children[char];

      // We found the shortest root! Replace the original word in the array.
      if (currentNode.isEndOfWord) {
        words[i] = currentPrefix;
        break; // Stop searching! We don't want longer roots.
      }
    }
  }

  // Glue the words back together into a single string with spaces
  return words.join(" ");
};
