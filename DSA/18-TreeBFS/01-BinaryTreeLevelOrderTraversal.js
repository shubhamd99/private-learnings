// https://leetcode.com/problems/binary-tree-level-order-traversal/description/

// A binary tree is a fundamental, hierarchical data structure in computer science.
// Its defining feature is that each parent node can have at most two children,
// strictly distinguished as the left child and the right child

// Breadth First Search (BFS) is a traversal algorithm that explores all the vertices of a graph or a tree level by level.
// It starts at the root node or an arbitrary node and visits all the nodes at the same level before moving on to the next level.

// Given the root of a binary tree, return the level order traversal of its nodes' values.
// (i.e., from left to right, level by level).

/**
 * Approach:
 * We need to traverse a binary tree level by level (horizontally) and return
 * the values of the nodes in each level as separate arrays.
 *
 * Idea:
 * We will use Breadth-First Search (BFS) powered by a Queue data structure.
 * We push nodes into the queue. For every level, we determine how many nodes
 * are currently in the queue (this is the width of the current level). We then
 * loop exactly that many times to remove the nodes for the current level, record
 * their values, and push their children into the queue for the next level.
 *
 * Queue - First In, First Out (FIFO)
 *
 * Steps:
 * 1. Base Case Check: If the tree is empty (`root` is null), return an empty array `[]`.
 * 2. Initialize Variables:
 *    - `result`: An array to hold all our level arrays.
 *    - `queue`: An array we will use as a queue. We start by putting the `root` in it.
 * 3. While Loop: Run a loop as long as the `queue` is not empty.
 *    - Get the `levelSize` (how many nodes are in the queue right now).
 *    - Create an empty `currentLevel` array to hold the numbers for this specific row.
 *    - For Loop: Run a loop exactly `levelSize` times:
 *        a. Remove the first node from the front of the queue using `queue.shift()`.
 *        b. Push its value into `currentLevel`.
 *        c. If it has a left child, push the left child to the back of the queue.
 *        d. If it has a right child, push the right child to the back of the queue.
 *    - After the For Loop finishes, one entire horizontal row is complete. Push
 *      the `currentLevel` array into the main `result` array.
 * 4. Return the final `result` array.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes in the tree. We visit and process every single
 *   node exactly once. (Note: In JavaScript, `shift()` on an array is technically O(N),
 *   which would make the overall time O(N^2) strictly speaking, but for LeetCode's
 *   input sizes, an array shift is fast enough to pass as standard BFS. Using a
 *   proper Queue library/class would make it strictly O(N)).
 *
 * Space Complexity: O(W) (or O(N) worst case)
 * - W is the maximum width of the tree. The space is used by our `queue`.
 * - In the worst case (a perfectly balanced tree), the bottom level holds roughly N/2
 *   nodes, so the queue will store N/2 nodes at its maximum size. This simplifies to O(N) space.
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root]; // Start the line with the root node

  // Run until the line is empty
  while (queue.length > 0) {
    const levelSize = queue.length; // current row
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      // Serve the person at the front of the line
      const currentNode = queue.shift();
      currentLevel.push(currentNode.val);

      // Tell their children to go to the back of the line
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    // Row is finished, add it to our final results
    result.push(currentLevel);
  }

  return result;
};
