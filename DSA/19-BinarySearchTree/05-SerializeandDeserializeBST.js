// https://leetcode.com/problems/serialize-and-deserialize-bst/description/

// Serialization is converting a data structure or object into a sequence of bits so that it can be stored
// in a file or memory buffer, or transmitted across a network connection link to be reconstructed later
// in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on
// how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be
// serialized to a string, and this string can be deserialized to the original tree structure.

// The encoded string should be as compact as possible.

/**
 * Approach:
 * We need to convert a BST into a string (serialize), and convert that string
 * back into the exact same BST (deserialize).
 *
 * Idea:
 * We will use Pre-Order Depth-First Search (DFS) for both processes.
 * For serialization, we traverse Pre-Order (Node -> Left -> Right), appending
 * values to an array, and using "N" to represent null nodes. We join it into a string.
 * For deserialization, we split the string back into an array. Because we used
 * Pre-Order, the first element in the array is ALWAYS the root of the current subtree.
 * We use `shift()` to remove the first element, create a node, and recursively
 * build its left and right children using the rest of the array.
 *
 * Steps for Serialize:
 * 1. Initialize an empty `result` array.
 * 2. Create a `dfs(node)` helper. If `node` is null, push "N". Otherwise, push
 *    `node.val`, then call `dfs(node.left)`, then `dfs(node.right)`.
 * 3. Call `dfs(root)` and return `result.join(',')`.
 *
 * Steps for Deserialize:
 * 1. Take the string `data` and split it by commas: `const values = data.split(',')`.
 * 2. Create a `buildTree()` helper.
 *    - Remove the first item: `const val = values.shift()`.
 *    - If `val` is "N", return `null` (dead end).
 *    - Otherwise, create a new `TreeNode` using `parseInt(val)`.
 *    - Recursively build the left side: `node.left = buildTree()`.
 *    - Recursively build the right side: `node.right = buildTree()`.
 *    - Return the `node`.
 * 3. Return the result of `buildTree()`.
 *
 * Time Complexity: O(N) for both Serialize and Deserialize.
 * - We visit every node exactly once to build the string, and we process every
 *   item in the string exactly once to rebuild the tree.
 *
 * Space Complexity: O(N) for both.
 * - Serialize uses an array to hold N elements before joining into a string.
 * - Deserialize splits the string into an array of N elements, and uses the
 *   recursion call stack which can take up to O(N) space.
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const result = [];

  function dfs(node) {
    if (node === null) {
      result.push("N");
      return;
    }

    // Pre-Order: Current -> Left -> Right
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(",");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const values = data.split(",");

  function buildTree() {
    // Draw the top card from the deck
    const currentVal = values.shift();

    // Base Case: If the card is an "N", it's a dead end
    if (currentVal === "N") {
      return null;
    }

    // Build the current node
    const node = new TreeNode(parseInt(currentVal));

    // Recursively build the left and right sides
    node.left = buildTree();
    node.right = buildTree();

    return node;
  }

  return buildTree();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
