// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
// Note: A leaf is a node with no children.

// Input: root = [3,9,20,null,null,15,7]
// Output: 2

/**
 * Approach:
 * We need to find the minimum depth of a binary tree, which is the shortest
 * path from the root to any leaf node.
 *
 * Idea:
 * We use Breadth-First Search (BFS) with a Queue. BFS is highly optimized for
 * finding the "shortest path" because it explores the tree level by level.
 * We keep track of our current `depth` level. The very first time we pull a node
 * out of the queue that is a leaf (it has no left child and no right child),
 * we know we have hit the shallowest bottom of the tree. We can instantly
 * return the current `depth` without needing to explore the rest of the tree!
 *
 * Steps:
 * 1. Base Case Check: If the tree is empty (`root` is null), the depth is 0.
 * 2. Initialize Variables:
 *    - `queue`: Our line, starting with the `root` node.
 *    - `depth`: A counter starting at 1 (since the root itself counts as 1 level).
 * 3. While Loop: Run as long as the `queue` is not empty.
 *    - Get the `levelSize` (how many nodes are in the current row).
 *    - For Loop: Run exactly `levelSize` times to process this row:
 *        a. Remove the first node from the queue (`queue.shift()`).
 *        b. **The Winner Check**: Is this node a leaf? (i.e., `left` is null
 *           AND `right` is null). If yes, we found the shortest path! Instantly
 *           return `depth`.
 *        c. Push the left child to the back of the queue (if it exists).
 *        d. Push the right child to the back of the queue (if it exists).
 *    - After the For loop finishes processing the row, we are moving down one
 *      horizontal layer, so we do `depth++`.
 * 4. (Fallback): If the while loop somehow finishes, return `depth`.
 *
 * Time Complexity: O(N) in the worst case.
 * - N is the total number of nodes. In the absolute worst case (like a tree
 *   that is a straight line, or a perfectly balanced tree where all leaves
 *   are at the exact same depth), we might have to visit every single node.
 * - However, in best/average cases, BFS is much faster than O(N) because it
 *   stops early the moment it finds a leaf.
 *
 * Space Complexity: O(W) (or O(N) worst case)
 * - W is the maximum width of the tree. The space is used by our `queue`.
 *   In a perfectly balanced tree, the queue will hold up to N/2 nodes, which
 *   simplifies to O(N) space.
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) {
    return 0;
  }

  const queue = [root];
  let depth = 1;

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();

      // Is this a leaf node?
      if (currentNode.left === null && currentNode.right === null) {
        return depth;
      }

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    // We finished scanning this row, so we go one level deeper
    depth++;
  }

  return depth;
};
