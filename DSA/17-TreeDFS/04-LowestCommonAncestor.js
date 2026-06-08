// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between
// two nodes p and q as the lowest node in T that has both p and q as descendants
// (where we allow a node to be a descendant of itself).”

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.

/**
 * Approach:
 * We need to find the lowest common ancestor (LCA) of two nodes, `p` and `q`,
 * in a binary tree. The LCA is the deepest node that has both `p` and `q` as descendants.
 *
 * Idea:
 * We use a recursive Depth-First Search (DFS) to traverse the tree.
 * At any given node, we search its left and right subtrees. If the left subtree
 * returns a node and the right subtree returns a node, the current node MUST be
 * the LCA, because `p` and `q` are split on either side of it.
 * If only one subtree returns a node, we pass that node upwards.
 *
 * Steps:
 * 1. Base Case 1 (Empty tree): If the `root` is null, return `null`.
 * 2. Base Case 2 (Found target): If the `root` is exactly `p` or `q`, we return
 *    the `root` itself. We don't need to search deeper down this path because
 *    even if the other target is below this one, this current node would still be the LCA.
 * 3. Search Left: Recursively call the function on the left child to see if `p`
 *    or `q` is hiding down there. Store the result in `leftResult`.
 * 4. Search Right: Recursively call the function on the right child to see if `p`
 *    or `q` is hiding down there. Store the result in `rightResult`.
 * 5. Analyze Results:
 *    - If `leftResult` is NOT null AND `rightResult` is NOT null: This means we found
 *      one target on the left and one target on the right. The current `root` is the LCA!
 *      Return `root`.
 *    - If only `leftResult` is not null: Both targets must be down the left side
 *      (or we only found one so far). Return `leftResult`.
 *    - If only `rightResult` is not null: Both targets must be down the right side.
 *      Return `rightResult`.
 *    - If both are null: We return `null`. (We can combine these last three checks easily).
 *
 * Time Complexity: O(N)
 * - N is the number of nodes in the tree. In the worst-case scenario, `p` and `q`
 *   are at the very bottom of the tree, and we must visit every single node once.
 *
 * Space Complexity: O(H) (or O(N) worst case)
 * - H is the height of the tree. This is the space used by the recursion call stack.
 * - In a perfectly balanced tree, it takes O(log N) space. In a completely unbalanced
 *   tree (like a straight line), it takes O(N) space.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) {
    return null;
  }

  // Base Case - We found p or q!
  if (root === p || root === q) {
    return root;
  }

  const leftResult = lowestCommonAncestor(root.left, p, q);
  const rightResult = lowestCommonAncestor(root.right, p, q);

  // If BOTH sides returned something, this current node is the LCA!
  if (leftResult !== null && rightResult !== null) {
    return root;
  }

  // If we only found something on one side, pass that finding upwards.
  // If leftResult is not null, return it. Otherwise, return rightResult
  // (which might be the node, or might be null if neither found anything).
  return leftResult !== null ? leftResult : rightResult;
};
