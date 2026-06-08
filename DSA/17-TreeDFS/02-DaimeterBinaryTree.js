// https://leetcode.com/problems/diameter-of-binary-tree/description/

// A binary tree is a fundamental, hierarchical data structure in computer science.
// Its defining feature is that each parent node can have at most two children,
// strictly distinguished as the left child and the right child

// The DFS Strategy: You pick a path and go as deep as you possibly can down that path until
// you hit a dead end (a leaf node). Once you can't go any further, you take one step backward,
// see if there is another unexplored branch, and go all the way down that one.
// You prioritize exploring "depth" (going downwards) before exploring "breadth" (looking at neighboring paths).

// Given the root of a binary tree, return the length of the diameter of the tree.
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
// This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.

/**
 * Approach:
 * We need to find the longest path between any two nodes in a binary tree.
 * The length of this path is the number of edges between them.
 *
 * Idea:
 * We can use a modified Depth-First Search (DFS). The longest path passing
 * through any given node is the sum of the maximum depth of its left subtree
 * and the maximum depth of its right subtree. We can compute the depths recursively
 * just like we did in the "Maximum Depth" problem, but as we calculate those
 * depths, we continuously update a global/shared variable to track the highest
 * (leftDepth + rightDepth) we have ever seen.
 *
 * Steps:
 * 1. Initialize Variables: Create a variable `maxDiameter` and set it to 0.
 *    This will be our "record book" to keep track of the longest path we find.
 * 2. Create a Helper DFS Function: This function will do the exact same job as
 *    the standard `maxDepth` function.
 *    - Base Case: If the node is null, return 0.
 *    - Recursive Step: Get `leftDepth` by calling DFS on the left child.
 *    - Recursive Step: Get `rightDepth` by calling DFS on the right child.
 * 3. Update the Record Book: Before the DFS function returns the depth, it calculates
 *    the path length going *through* the current node (`leftDepth + rightDepth`).
 *    If this length is larger than `maxDiameter`, we update `maxDiameter`.
 * 4. Return Depth for Recursion: The DFS function must still return the depth of
 *    the current node to its parent, which is `1 + Math.max(leftDepth, rightDepth)`.
 * 5. Start and Return: Call the DFS function starting at the `root`. Once it
 *    finishes, return our `maxDiameter` record!
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes in the tree. We visit every single node
 *   exactly once during our DFS traversal.
 *
 * Space Complexity: O(H) where H is the height of the tree.
 * - This space is used by the recursion call stack. In the worst case (a completely
 *   unbalanced tree), H could be N, making it O(N) space. In a balanced tree,
 *   it is O(log N).
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
var diameterOfBinaryTree = function (root) {
  // Initialize our record book
  let maxDiameter = 0;

  function dfs(node) {
    if (node === null) {
      return 0;
    }

    const leftDepth = dfs(node.left);
    const rightDepth = dfs(node.right);

    // Update the record book!
    // The diameter passing through THIS specific node is leftDepth + rightDepth.
    // Is it bigger than our current record?
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    return 1 + Math.max(leftDepth, rightDepth);
  }

  dfs(root);

  // By the time DFS finishes, maxDiameter holds our answer
  return maxDiameter;
};
