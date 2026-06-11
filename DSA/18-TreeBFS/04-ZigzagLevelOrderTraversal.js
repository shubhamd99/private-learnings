// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
// (i.e., from left to right, then right to left for the next level and alternate between).

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

/**
 * Approach:
 * We need to traverse the binary tree level by level, but we must alternate
 * the order we record the nodes (left-to-right, then right-to-left, etc.).
 *
 * Idea:
 * We use Breadth-First Search (BFS) with a Queue (FIFO) to process the tree horizontally.
 * We maintain a boolean flag `leftToRight` to track the current direction.
 * When processing a level, if `leftToRight` is true, we use `.push()` to add
 * values to the end of our current row array (standard order). If it is false,
 * we use `.unshift()` to shove values into the front of the array, which naturally
 * reverses the order of that row. After each row, we toggle the flag.
 *
 * Steps:
 * 1. Base Case Check: If the tree is empty (`root` is null), return an empty array `[]`.
 * 2. Initialize Variables:
 *    - `result`: An array to hold the final zigzag rows.
 *    - `queue`: Our line, starting with the `root` node.
 *    - `leftToRight`: A boolean flag starting as `true`.
 * 3. While Loop: Run as long as the `queue` is not empty.
 *    - Get the `levelSize` (how many nodes are in the current row).
 *    - Create an empty `currentLevel` array for this row.
 *    - For Loop: Run exactly `levelSize` times:
 *        a. Remove the first node from the queue (`queue.shift()`).
 *        b. **The Zigzag Check**: If `leftToRight` is true, `.push()` the value
 *           to the back. If false, `.unshift()` the value to the front.
 *        c. Push the left child to the back of the queue (if it exists).
 *        d. Push the right child to the back of the queue (if it exists).
 *    - After the For loop, push the completed `currentLevel` to `result`.
 *    - **Flip the Switch**: `leftToRight = !leftToRight` so the next row reverses.
 * 4. Return the final `result` array.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes. We visit every single node once.
 *   (Note: In JavaScript, `.unshift()` is technically O(K) where K is the array length.
 *   While this might strictly make the time slightly worse than O(N) depending on
 *   the engine, it is universally accepted for LeetCode in JS. To be perfectly O(N),
 *   you could push normally and then run a `.reverse()` on the row at the end,
 *   but `.unshift()` is conceptually cleaner to read).
 *
 * Space Complexity: O(W) (or O(N) worst case)
 * - W is the maximum width of the tree. The space is used by our `queue`.
 *   In the worst case (a perfectly balanced tree), the queue will hold up to
 *   N/2 nodes, which simplifies to O(N) space.
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];
  let leftToRight = true; // Our toggle switch

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();

      if (leftToRight) {
        currentLevel.push(currentNode.val);
      } else {
        currentLevel.unshift(currentNode.val);
      }

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
};
