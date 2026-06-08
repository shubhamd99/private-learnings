// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/ - HARD

// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes
// in the sequence has an edge connecting them

// A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

// The path sum of a path is the sum of the node's values in the path.

// Given the root of a binary tree, return the maximum path sum of any non-empty path.

// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

/**
 * Approach:
 * We need to find the maximum path sum in a binary tree. The path can start
 * and end at any node.
 *
 * Idea:
 * We use a modified Depth-First Search (DFS). For every node, we calculate the
 * max path sum if that node was the "peak" or "highest point" of the path.
 * This is: `node.val + max(0, leftPath) + max(0, rightPath)`. We use max(0, ...)
 * because if a path sum is negative, we are better off just not taking that path at all.
 * We keep a running global variable `maxSum` to track the absolute highest score
 * we find across the whole tree.
 * To its parent, a node can only return a single straight path (it cannot fork).
 * So it returns `node.val + max(leftPath, rightPath)`.
 *
 * Steps:
 * 1. Initialize Record Book: Set a `maxSum` variable to `-Infinity`. We use
 *    -Infinity instead of 0 because it's possible that EVERY node in the tree
 *    is a negative number, so the answer might be negative!
 * 2. Create DFS Helper:
 *    - Base Case: If the node is null, return `0`.
 *    - Ask Left Child: Recursively call DFS on the left. If it returns a negative
 *      number, turn it into `0` using `Math.max(0, leftResult)`.
 *    - Ask Right Child: Recursively call DFS on the right. Turn negatives into `0`.
 * 3. Update Record Book: Calculate the path that arches *through* the current node:
 *    `node.val + leftResult + rightResult`. If this is bigger than `maxSum`,
 *    update `maxSum`.
 * 4. Return to Parent: Return the best single straight path going down from this node:
 *    `node.val + Math.max(leftResult, rightResult)`.
 * 5. Start and Return: Run the DFS starting at the root, then return `maxSum`.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes. We visit each node exactly once during
 *   our traversal.
 *
 * Space Complexity: O(H) (or O(N) worst case)
 * - H is the height of the tree. The space is used by the recursion call stack.
 *   In the worst case (unbalanced tree), it is O(N). In a balanced tree, O(log N).
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
var maxPathSum = function (root) {
  // We use -Infinity so it works even if all nodes are negative numbers.
  let maxSum = -Infinity;

  function dfs(node) {
    if (node === null) {
      return 0;
    }

    // The Math.max(0, ...) is the trick to ignore negative paths!
    const leftBest = Math.max(0, dfs(node.left));
    const rightBest = Math.max(0, dfs(node.right));

    // What if the path arches through THIS specific node?
    const currentArchSum = node.val + leftBest + rightBest;
    maxSum = Math.max(maxSum, currentArchSum);

    // Return the best SINGLE path to the parent.
    // The parent can't branch both ways, so we only give it the best one.
    // A path must be a single, continuous line without splitting, so a node can only offer its parent one direction (left or right) to continue that line.
    return node.val + Math.max(leftBest, rightBest);
  }

  dfs(root);

  return maxSum;
};
