// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/

// Given an integer array nums where the elements are sorted in ascending order,
// convert it to a height-balanced binary search tree.

// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted

/**
 * Approach:
 * We need to convert a sorted array into a height-balanced Binary Search Tree (BST).
 *
 * Idea:
 * To keep the tree perfectly balanced, we must always choose the middle element
 * of the array (or sub-array) to be the root. Because the array is sorted,
 * choosing the middle guarantees that half the elements will be smaller (left subtree)
 * and half will be larger (right subtree). We can use a recursive helper function
 * that takes a `left` pointer and a `right` pointer to define which chunk of the
 * array we are currently turning into a tree.
 *
 * Steps:
 * 1. Create a Recursive Helper Function: `buildTree(left, right)`
 *    - `left` and `right` represent the start and end indexes of our array chunk.
 *    - Base Case: If `left` is greater than `right`, it means our chunk is empty.
 *      We return `null` (no node to build).
 *    - Find the Middle: Calculate the middle index `mid = Math.floor((left + right) / 2)`.
 *    - Create the Node: Create a new `TreeNode` using the number at `nums[mid]`.
 *    - Build Left Subtree: Set the node's `.left` by calling `buildTree` on the left
 *      half of the chunk: `buildTree(left, mid - 1)`.
 *    - Build Right Subtree: Set the node's `.right` by calling `buildTree` on the right
 *      half of the chunk: `buildTree(mid + 1, right)`.
 *    - Return the fully constructed `node` back up to its parent.
 * 2. Start the Process: Call `buildTree` passing `0` as the left pointer and
 *    `nums.length - 1` as the right pointer to process the entire array.
 * 3. Return the result of `buildTree`.
 *
 * Time Complexity: O(N)
 * - N is the number of elements in the array. We process every single element
 *   exactly once to create a node for it.
 *
 * Space Complexity: O(log N)
 * - This is the space used by the recursion call stack. Because we always split
 *   the array perfectly in half, the tree is perfectly balanced, making its height
 *   exactly `log N`.
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function buildTree(left, right) {
    if (left > right) {
      // Base Case: Our array chunk is completely empty
      return null;
    }

    // Find the exact middle index
    const mid = Math.floor((left + right) / 2);

    // Make the middle number the root of this sub-tree
    const node = new TreeNode(nums[mid]);

    // Build the left side using only the numbers before the middle
    node.left = buildTree(left, mid - 1);

    // Build the right side using only the numbers after the middle
    node.right = buildTree(mid + 1, right);

    return node; // Return the constructed node
  }

  // recursion using the full length of the array
  return buildTree(0, nums.length - 1);
};
