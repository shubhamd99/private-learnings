// https://leetcode.com/problems/path-sum-ii/description/

// Given the root of a binary tree and an integer targetSum,
// return all root-to-leaf paths where the sum of the node values in the path equals targetSum.
// Each path should be returned as a list of the node values, not node references.

// A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: [[5,4,11,2],[5,8,4,5]]
// Explanation: There are two paths whose sum equals targetSum:
// 5 + 4 + 11 + 2 = 22
// 5 + 8 + 4 + 5 = 22

/**
 * Approach:
 * We will use Depth-First Search (DFS) combined with Backtracking.
 * As we traverse down the tree, we will keep track of the path we have taken so far
 * in an array (`currentPath`), and we will subtract the current node's value from
 * the `targetSum` to see how much sum we have left to find.
 * If we reach a leaf node and our remaining `targetSum` exactly equals the leaf's
 * value, we have found a valid path! We add a copy of our `currentPath` to our results.
 * When we return from a recursive call, we remove the current node from `currentPath`
 * (backtrack) so we can cleanly explore the next branch.
 *
 * Steps:
 * 1. Initialize variables: `result` array to store all winning paths.
 * 2. Create a Helper DFS Function: `dfs(node, currentSum, currentPath)`
 *    - Base Case: If the node is null, just return (do nothing).
 *    - Action: Add the current node's value to the `currentPath` array.
 *    - Check for Leaf: If the node has no left child AND no right child, it's a leaf!
 *      Check if `currentSum` equals the node's value. If yes, we found a winner!
 *      Push a **copy** of `currentPath` into `result`. (We must push a copy, otherwise
 *      JavaScript will keep modifying the exact same array in memory).
 *    - Explore: If it's not a leaf, recursively call DFS on the left child and right
 *      child, passing `currentSum - node.val` as the new target.
 *    - Backtrack: After exploring both children, we are done with this node.
 *      We `.pop()` the node's value off the `currentPath` array so the parent node
 *      can explore its other branches without this node getting in the way.
 * 3. Start DFS: Call the helper function starting at the `root` with the initial `targetSum`
 *    and an empty array `[]`.
 * 4. Return `result`.
 *
 * Time Complexity: O(N^2) in the worst case.
 * - N is the total number of nodes. We visit each node once, which takes O(N).
 * - However, whenever we find a valid path, we have to copy the `currentPath` array
 *   to store it in the results. In the worst-case scenario (a perfectly balanced tree
 *   where every single path to the bottom is a valid answer), copying those paths
 *   can take up to O(N log N) or O(N^2) time depending on the structure.
 *
 * Space Complexity: O(H) (or O(N) worst case)
 * - H is the height of the tree.
 * - The space is used by the recursion call stack and our `currentPath` array.
 *   In the worst case (an unbalanced tree), the height H is N, making it O(N) space.
 *   (Note: We usually don't count the output `result` array when calculating space complexity).
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = [];

  function dfs(node, remainingSum, currentPath) {
    if (node === null) {
      return;
    }

    // Add this node's value to our path
    currentPath.push(node.val);

    // Check if we hit a dead end (a leaf node)
    if (node.left === null && node.right === null) {
      // Did the coins add up exactly?
      if (remainingSum === node.val) {
        // We found a winning path!
        // We use [...currentPath] to make a clone/copy of the array.
        result.push([...currentPath]);
      }
    } else {
      dfs(node.left, remainingSum - node.val, currentPath);
      dfs(node.right, remainingSum - node.val, currentPath);
    }

    // (Backtrack): We are done exploring paths that go through this node.
    // Take this node out of our backpack so we can try different branches!
    currentPath.pop();
  }

  dfs(root, targetSum, []);

  return result;
};
