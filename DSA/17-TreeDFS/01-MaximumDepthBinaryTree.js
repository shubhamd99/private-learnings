// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

// A binary tree is a fundamental, hierarchical data structure in computer science.
// Its defining feature is that each parent node can have at most two children,
// strictly distinguished as the left child and the right child

// The DFS Strategy: You pick a path and go as deep as you possibly can down that path until
// you hit a dead end (a leaf node). Once you can't go any further, you take one step backward,
// see if there is another unexplored branch, and go all the way down that one.
// You prioritize exploring "depth" (going downwards) before exploring "breadth" (looking at neighboring paths).

// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node
// down to the farthest leaf node.

/**
 * Approach:
 * We need to find the maximum depth of a binary tree, which is the longest
 * path from the root to the farthest leaf node.
 *
 * Idea:
 * We can use Recursion (Depth-First Search). A tree's maximum depth is simply
 * 1 (the current node) plus the maximum depth of its left and right subtrees.
 * We can break the big problem into smaller, identical problems until we reach
 * the bottom of the tree.
 *
 * Steps:
 * 1. Base Case: Check if the current node (`root`) is null. If the tree is empty
 *    or we have reached beyond a leaf node, the depth is 0.
 * 2. Recursive Step for Left Subtree: Find the maximum depth of the left side
 *    by calling our function on `root.left`.
 * 3. Recursive Step for Right Subtree: Find the maximum depth of the right side
 *    by calling our function on `root.right`.
 * 4. Combine Results: Compare the left depth and right depth. Take the larger
 *    (maximum) of the two, add 1 to count the current node, and return it.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes in the tree. We must visit every single node
 *   exactly once to determine the depth of the entire tree.
 *
 * Space Complexity: O(H) where H is the height of the tree.
 * - This space is used by the call stack during recursion.
 * - In the worst case (a completely unbalanced tree that looks like a linked list),
 *   the height H could be N, making it O(N) space.
 * - In the best case (a perfectly balanced tree), the height H is log(N),
 *   making it O(log N) space.
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
 * @return {number}
 */
var maxDepth = function (root) {
  // Step 1: Base Case
  // If the node doesn't exist, its depth is 0.
  if (root === null) {
    return 0;
  }

  // Step 2: Get the depth of the left subtree
  const leftDepth = maxDepth(root.left);

  // Step 3: Get the depth of the right subtree
  const rightDepth = maxDepth(root.right);

  // Step 4: Add 1 for the current node and return the max of left and right
  return 1 + Math.max(leftDepth, rightDepth);
};

/**
 * --- EXECUTION TRACE ---
 *
 * 1. START at Node(3)
 *    root = 3. Not null.
 *    Code pauses here to find leftDepth by calling maxDepth(9).
 *
 * 2. JUMP down left to Node(9)
 *    root = 9. Not null.
 *    Code pauses here to find leftDepth by calling maxDepth(null).
 *
 * 3. JUMP down left from Node(9)
 *    root = null. Hits base case! Returns 0.
 *    (Back at Node 9): leftDepth = 0.
 *    Now it pauses to find rightDepth by calling maxDepth(null).
 *
 * 4. JUMP down right from Node(9)
 *    root = null. Hits base case! Returns 0.
 *    (Back at Node 9): rightDepth = 0.
 *    Node(9) finishes: 1 + Math.max(0, 0) = 1.
 *    Node(9) returns 1 back up to Node(3).
 *
 * 5. BACK at Node(3)
 *    We finally have Node(3)'s leftDepth = 1.
 *    Now it pauses to find rightDepth by calling maxDepth(20).
 *
 * 6. JUMP down right to Node(20)
 *    root = 20. Not null.
 *    Code pauses here to find leftDepth by calling maxDepth(15).
 *
 * 7. JUMP down left to Node(15)
 *    root = 15. Not null.
 *    It asks for left/right (both are null), both return 0.
 *    Node(15) finishes: 1 + Math.max(0, 0) = 1.
 *    Node(15) returns 1 back up to Node(20).
 *    (Back at Node 20): leftDepth = 1.
 *
 * 8. STILL at Node(20)
 *    Now it pauses to find rightDepth by calling maxDepth(7).
 *
 * 9. JUMP down right to Node(7)
 *    root = 7. Not null.
 *    It asks for left/right (both are null), both return 0.
 *    Node(7) finishes: 1 + Math.max(0, 0) = 1.
 *    Node(7) returns 1 back up to Node(20).
 *    (Back at Node 20): rightDepth = 1.
 *
 * 10. FINISHING Node(20)
 *     Node(20) has leftDepth = 1 and rightDepth = 1.
 *     Node(20) finishes: 1 + Math.max(1, 1) = 2.
 *     Node(20) returns 2 back up to Node(3).
 *
 * 11. FINISHING Node(3)
 *     Node(3) finally has leftDepth = 1 and rightDepth = 2.
 *     Node(3) finishes: 1 + Math.max(1, 2) = 3.
 *     Final output is 3!
 */
