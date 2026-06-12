// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/

// Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q
// as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Approach:
 * We need to find the lowest common ancestor (LCA) of two nodes, `p` and `q`,
 * inside a perfectly organized Binary Search Tree (BST).
 *
 * Idea:
 * We can use the properties of a BST. If both `p` and `q` are less than the
 * current node, the LCA must be in the left subtree. If both are greater,
 * the LCA must be in the right subtree. If `p` and `q` are on opposite sides
 * (one is less, one is greater), or if one of them matches the current node,
 * then the current node is the exact splitting point (the LCA). We can do this
 * with a simple while loop.
 *
 * Steps:
 * 1. Initialize Loop: Start a `while` loop that runs as long as `root` is not null
 *    (though in a valid test case, we are guaranteed to find the answer before
 *    it becomes null).
 * 2. Check Left: If both `p.val` and `q.val` are strictly LESS than `root.val`,
 *    it means both targets are down the left path. We move our `root` pointer
 *    to `root.left`.
 * 3. Check Right: If both `p.val` and `q.val` are strictly GREATER than `root.val`,
 *    it means both targets are down the right path. We move our `root` pointer
 *    to `root.right`.
 * 4. The Fork in the Road: If they are NOT both smaller, and NOT both larger,
 *    it means they are splitting up at this node (or one of them is exactly this node).
 *    We found the LCA! We `return root` and stop the loop.
 *
 * Time Complexity: O(H)
 * - H is the height of the tree. We only ever travel down a single path from
 *   the top of the tree to the LCA. We never branch off into multiple searches.
 *   In a balanced tree, this is lightning fast: O(log N). In a totally unbalanced
 *   line-shaped tree, it is O(N).
 *
 * Space Complexity: O(1)
 * - Because we are using a simple `while` loop instead of Recursion (DFS),
 *   we don't create a massive call stack in the computer's memory. We only
 *   use a single pointer variable (`root`), which takes constant O(1) space.
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // Start walking down the tree
  while (root !== null) {
    // Are both p and q smaller? Go Left.
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
      // Are both p and q larger? Go Right.
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
      // We found the fork in the road!
    } else {
      return root;
    }
  }
};
