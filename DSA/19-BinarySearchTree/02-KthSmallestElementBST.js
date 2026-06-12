// https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed)
// of all the values of the nodes in the tree.

// Input: root = [3,1,4,null,2], k = 1
// Output: 1
// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3

/**
 * Approach:
 * We need to find the `k`th smallest element in a Binary Search Tree (BST).
 *
 * Idea:
 * We will use an In-Order Depth-First Search (DFS). In-Order traversal means we
 * process the Left child, then the Current node, then the Right child. In a BST,
 * this guarantees we will visit the nodes in strictly ascending (smallest to largest)
 * order. We simply keep a counter. Every time we process the Current node, we
 * increment the counter. When the counter reaches `k`, we have found our target!
 *
 * Steps:
 * 1. Initialize Variables: Create a `count` variable set to 0, and a `result`
 *    variable to store our final answer.
 * 2. Create the DFS Helper: `inOrder(node)`
 *    - Base Case: If the node is null, or if we have already found our `result`
 *      (result is not null), we return immediately to stop wasting time.
 *    - Search Left: Recursively call `inOrder(node.left)`. This forces us to
 *      find the smallest numbers first.
 *    - Process Current Node: After returning from the left, we are officially
 *      visiting the current node. Increment `count`.
 *    - The Check: If `count === k`, this current node is the one we are looking for!
 *      Save `node.val` into `result` and return.
 *    - Search Right: Recursively call `inOrder(node.right)` to find the next
 *      smallest numbers.
 * 3. Start Search: Call `inOrder(root)`.
 * 4. Return the `result`.
 *
 * Time Complexity: O(H + k)
 * - H is the height of the tree. We first have to dive all the way down the left
 *   side to find the absolute smallest element, which takes O(H) time.
 * - Then, we process exactly `k` nodes.
 * - In the worst case (if we have to search the whole tree), it takes O(N) time.
 *
 * Space Complexity: O(H) (or O(N) worst case)
 * - H is the height of the tree. This is the space used by the recursion call stack.
 *   In a balanced tree, it takes O(log N) space. In a completely unbalanced line,
 *   it takes O(N) space.
 */

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let count = 0;
  let result = null;

  function inOrder(node) {
    // Base Case: Stop if we hit a dead end, or if we already found the answer
    if (node === null || result !== null) {
      return;
    }

    // Go as far left as possible (find the smallest numbers)
    inOrder(node.left);

    // Process the current node
    count++; // Click the counter

    // Is this the k-th node we've processed?
    if (count === k) {
      result = node.val;
      return; // Stop processing this branch
    }

    // Go right to find the next smallest numbers
    inOrder(node.right);
  }

  inOrder(root);

  return result;
};
