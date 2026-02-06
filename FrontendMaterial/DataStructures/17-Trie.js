//A Trie, also known as a digital tree or prefix tree, is a kind of search tree
// — an ordered tree data structure used to store a dynamic set or
// associative array where the keys are usually strings.

// Trie data structure was described by René de la Briandais in 1959 solely to solve the very problem of representing a set of words.

// The term “trie” comes from the word retrieval and is usually pronounced “try”,
// to separate it from other “tree” structures.

// However, it is basically a tree data structure with certain rules to follow in terms of how it is created and used
// It is a tree-like data structure wherein the nodes of the tree store the entire alphabet
// and strings/words can be retrieved by traversing down a branch path

// The main idea behind using tries as a data structure was that they could be a nice compromise between running time and memory.

// Each trie has an empty root node, with links (or references) to other nodes
// one for each possible alphabetic value

// The shape and the structure of a trie is always a set of linked nodes,
// connecting back to an empty root node.

// Thus, the size of a trie is directly correlated to the size of all
// the possible values that the trie could represent.

class TrieNode {
  constructor(key) {
    // the "key" value will be the character in sequence
    this.key = key;

    // we keep a reference to parent
    this.parent = null;

    // we have hash of children
    this.children = {};

    // check to see if the node is at the end
    this.end = false;
  }

  // Starting from the current Trie node,
  // it walks upwards to the root using parent references
  // and builds the word character by character.
  getWord = function () {
    let output = [];
    let node = this;

    while (node !== null) {
      // Why unshift? - We are moving backwards
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join("");
  };
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  // To insert a new word in the Trie we have to check for two things.
  // - Check that the word that needs to be added doesn’t already exist in this trie.
  // - Next, if we’ve traversed down the branch where this word ought to live and the words don’t exist yet,
  // we’d insert a value into the node’s reference where the word should go.
  insert(word) {
    let node = this.root; // we start at the root

    // for every character in the word
    for (let i = 0; i < word.length; i++) {
      // check to see if character node exists in children.
      if (!node.children[word[i]]) {
        // if it doesn't exist, we then create it.
        node.children[word[i]] = new TrieNode(word[i]);

        // we also assign the parent to the child node.
        node.children[word[i]].parent = node;
      }

      // proceed to the next depth in the trie.
      node = node.children[word[i]];

      // finally, we check to see if it's the last word.
      if (i == word.length - 1) {
        // if it is, we set the end flag to true.
        node.end = true;
      }
    }
  }

  // check if it contains a whole word.
  // To check if the trie contains the given word or not.
  // For every character in the word. Check to see if character node exists in children.
  // If it exists, proceed to the next depth of the trie.
  // Else return false, since its a not a valid word.
  // At the end return the word.
  contains(word) {
    let node = this.root;

    // for every character in the word
    for (let i = 0; i < word.length; i++) {
      // check to see if character node exists in children.
      if (node.children[word[i]]) {
        // if it exists, proceed to the next depth of the trie.
        node = node.children[word[i]];
      } else {
        // doesn't exist, return false since it's not a valid word.
        return false;
      }
    }

    // we finished going through all the words, but is it a whole word?
    return node.end;
  }

  // To find all the words with given prefix, we need to perform two operations.
  // First, make sure prefix actually has words.
  // Second, find all the words with given prefix.
  find(prefix) {
    let node = this.root;
    let output = [];

    // for every character in the prefix
    for (let i = 0; i < prefix.length; i++) {
      // make sure prefix actually has words
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        // there's none. just return it.
        return output;
      }
    }

    // recursively find all words in the node
    this.findAllWords(node, output);

    return output;
  }

  // recursive function to find all words in the given node.
  findAllWords(node, arr) {
    // base case, if node is at a word, push to output
    if (node.end) {
      arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (let child in node.children) {
      this.findAllWords(node.children[child], arr);
    }
  }

  // To delete a key, we do not delete the node corresponding to the key
  // as it might have some children which still contain a key
  //  Instead, we simply have to search for it and set its value to null.
  // However, to improve efficiency, if the node corresponding to the key has no children or all its children have null values,
  // we might also delete the entire node.
  remove(word) {
    let root = this.root;

    if (!word) return;

    // recursively finds and removes a word
    const removeWord = (node, word) => {
      // check if current node contains the word
      if (node.end && node.getWord() === word) {
        // check and see if node has children
        let hasChildren = Object.keys(node.children).length > 0;

        // if has children we only want to un-flag the end node that marks end of a word.
        // this way we do not remove words that contain/include supplied word
        if (hasChildren) {
          node.end = false;
        } else {
          // remove word by getting parent and setting children to empty dictionary
          node.parent.children = {};
        }

        // recursively remove word from all children
        for (let key in node.children) {
          removeWord(node.children[key], word);
        }

        return true;
      }
    };

    // call remove word on root node
    removeWord(root, word);
  }
}

const trie = new Trie();

// insert few values
trie.insert("peter");
trie.insert("piper");
trie.insert("picked");
trie.insert("pickled");
trie.insert("pepper");

// check contains method
console.log(trie.contains("picked"));
console.log(trie.contains("pepper"));
trie.remove("pepper");
// check find method
console.log(trie.find("pi"));
console.log(trie.find("pe"));

// Output:
// true
// true
// ["pickled", "picked", "piper"]
// ["peter"]

// The time complexity of searching, inserting, and deleting from a trie depends on the
// length of the word that’s being searched for, inserted, or deleted,
// and the number of total words, n, making the runtime of these operations O(a * n).
// Insert - O(a * n)
// Search - O(a * n)
// Delete - O(a * n)
// Find - Object(p + n) - where p is the length of the prefix and n is the number of words.

// Space - Worst
// O(n * k)

// Applications of Trie data structure
// It is rarely used, however, if required it used in combination with other data structures,
// the most prominent example of its use is the autocomplete feature of search
// where we type alphabets, and all other words starting with given alphabets are suggested like in search engine.
