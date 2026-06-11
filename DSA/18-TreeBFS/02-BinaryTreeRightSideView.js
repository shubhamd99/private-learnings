// https://leetcode.com/problems/binary-tree-right-side-view/description/

// Given the root of a binary tree, imagine yourself standing on the right side of it,
// return the values of the nodes you can see ordered from top to bottom.

// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4] // print only right side

/**
 * Approach:
 * We need to find the rightmost node at every level of the binary tree.
 *
 * Idea:
 * We will use Breadth-First Search (BFS) with a Queue (FIFO), processing the tree
 * level by level from left to right. While iterating through the nodes of a
 * specific level, we check if the current node is the very last node in that
 * level's iteration. If it is, that means it's the rightmost node, so we add
 * its value to our results.
 *
 * Steps:
 * 1. Base Case Check: If the tree is empty (`root` is null), return an empty array `[]`.
 * 2. Initialize Variables:
 *    - `result`: An array to hold the visible right-side nodes.
 *    - `queue`: Our line, starting with the `root` node.
 * 3. While Loop: Run as long as the `queue` is not empty.
 *    - Get the `levelSize` (how many nodes are in the current row).
 *    - For Loop: Run a loop exactly `levelSize` times to process this row:
 *        a. Remove the first node from the queue (`queue.shift()`).
 *        b. **The Magic Check**: If our loop variable `i` is exactly equal to
 *           `levelSize - 1`, we know we are looking at the very last node in this row!
 *           Push its value into `result`.
 *        c. Push the left child to the back of the queue (if it exists).
 *        d. Push the right child to the back of the queue (if it exists).
 * 4. Return the final `result` array.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes. We still have to visit every single node
 *   in the tree to make sure we don't miss a deep rightmost node.
 *
 * Space Complexity: O(W) (or O(N) worst case)
 * - W is the maximum width of the tree. The space is used by our `queue`.
 *   In the worst case (a perfectly balanced tree), the queue will hold up to
 *   N/2 nodes, which simplifies to O(N) space.
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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    // Process all nodes in this specific row
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();

      // Is this the very last node in the row?
      if (i === levelSize - 1) {
        result.push(currentNode.val);
      }

      // Tell children to go to the back of the line for the next row
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  return result;
};
