// https://leetcode.com/problems/average-of-levels-in-binary-tree/description/

// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.
// Answers within 10-5 of the actual answer will be accepted.

// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].

/**
 * Approach:
 * We need to find the average value of the nodes at every horizontal level
 * of a binary tree.
 *
 * Idea:
 * We will use Breadth-First Search (BFS) with a Queue to traverse the tree
 * level by level. For each level, we will keep a running sum of the node values.
 * After processing all the nodes in that specific level, we divide the total sum
 * by the number of nodes in that level to get the average. We store this average
 * in our results array.
 *
 * Steps:
 * 1. Base Case Check: If the tree is empty (`root` is null), return an empty array `[]`.
 * 2. Initialize Variables:
 *    - `result`: An array to hold the calculated averages.
 *    - `queue`: Our line, starting with the `root` node.
 * 3. While Loop: Run as long as the `queue` is not empty.
 *    - Get the `levelSize` (how many nodes are in the current row).
 *    - Create a variable `levelSum` and set it to 0.
 *    - For Loop: Run a loop exactly `levelSize` times to process this row:
 *        a. Remove the first node from the queue (`queue.shift()`).
 *        b. Add the node's value to our `levelSum`.
 *        c. Push the left child to the back of the queue (if it exists).
 *        d. Push the right child to the back of the queue (if it exists).
 *    - After the For loop finishes, calculate the average: `levelSum / levelSize`.
 *    - Push the average into the `result` array.
 * 4. Return the final `result` array.
 *
 * Time Complexity: O(N)
 * - N is the total number of nodes. We visit and process every single node
 *   exactly once.
 *
 * Space Complexity: O(W) (or O(N) worst case)
 * - W is the maximum width of the tree. The space is used by our `queue`.
 *   In the worst case (a perfectly balanced tree), the queue will hold up to
 *   N/2 nodes, which simplifies to O(N) space.
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift();

      // Add the current node's value to our bucket
      levelSize += currentNode.val;

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    const averageSum = levelSum / levelSize;
    result.push(averageSum);
  }

  return result;
};
