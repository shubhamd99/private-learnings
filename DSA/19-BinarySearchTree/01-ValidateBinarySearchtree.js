// https://leetcode.com/problems/validate-binary-search-tree/

// A Binary Search Tree (often called a BST) is a special, strictly organized version of a regular Binary Tree.
// You can think of a normal Binary Tree like a messy room where numbers are just thrown everywhere.
// A Binary Search Tree is like a perfectly organized filing cabinet.
// To be a Binary Search Tree, it must follow Two Golden Rules for every single node:
// The Left Rule: Every number in the left branch must be smaller than the node.
// The Right Rule: Every number in the right branch must be larger than the node.

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys strictly less than the node's key.
// The right subtree of a node contains only nodes with keys strictly greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

/**
 * Approach:
 * We need to determine if a binary tree strictly follows the rules of a Binary
 * Search Tree (BST). Every node on a left branch must be smaller than its ancestor,
 * and every node on a right branch must be larger than its ancestor.
 *
 * Idea:
 * We will use a recursive Depth-First Search (DFS) helper function. Instead of
 * just passing the node, we will also pass down an allowed `min` and `max` boundary
 * for that specific node.
 * If a node breaks its boundaries, we instantly return `false`.
 * When we travel to a left child, the max boundary tightens to the current node's value.
 * When we travel to a right child, the min boundary tightens to the current node's value.
 *
 * Steps:
 * 1. Create a DFS Helper Function: `validate(node, min, max)`
 *    - Base Case: If the `node` is null, it means we reached an empty spot without
 *      breaking any rules. Return `true`.
 *    - The Boundary Check: If `node.val` is less than or equal to `min`, OR if
 *      `node.val` is greater than or equal to `max`, it broke the rules! Return `false`.
 *    - Recursive Call Left: Call `validate` on the left child. The min stays the same,
 *      but the new `max` becomes the current `node.val`.
 *    - Recursive Call Right: Call `validate` on the right child. The max stays the same,
 *      but the new `min` becomes the current `node.val`.
 *    - Both sides must be true, so we return `leftIsValid && rightIsValid`.
 * 2. Start the Recursion: Call the helper function starting at the `root`.
 *    Pass `-Infinity` as the starting min, and `Infinity` as the starting max.
 * 3. Return the result.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes in the tree. In the worst case (if the tree IS
 *   a valid BST), we must visit and verify every single node once.
 *
 * Space Complexity: O(H) (or O(N) worst case)
 * - H is the height of the tree. The space is used by the recursion call stack.
 *   In a completely unbalanced tree, this takes O(N) space. In a perfectly balanced
 *   tree, it takes O(log N) space.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  function validate(node, min, max) {
    // Base Case: Empty nodes don't break rules
    if (node === null) {
      return true;
    }

    // Boundary check
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Because a left child must be strictly smaller than its parent (so the parent acts as its maximum limit/ceiling),
    // and a right child must be strictly larger than its parent (so the parent acts as its minimum limit/floor).

    // When going LEFT, the current node becomes the MAXIMUM ceiling.
    const leftIsValid = validate(node.left, min, node.val);

    // When going RIGHT, the current node becomes the MINIMUM floor.
    const rightIsValid = validate(node.right, node.val, max);

    // Both the left side and right side must be perfect
    return leftIsValid && rightIsValid;
  }

  return validate(root, -Infinity, Infinity);
};
