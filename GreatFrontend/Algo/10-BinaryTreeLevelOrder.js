// Binary Tree Level Order Traversal
// Return the level-by-level values of a binary tree as an array of arrays.
//
// Input:
//       3
//      / \
//     9   20
//        /  \
//       15    7
//
// Output: [[3], [9, 20], [15, 7]]

// ---- SIMPLE VERSION (for interviews) ----
// Idea: BFS using a queue.
// Process nodes level by level — at the start of each iteration,
// snapshot the current queue length (= number of nodes at this level).
// Dequeue exactly that many nodes, collect their values, enqueue their children.

function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root]; // start with root in queue

  while (queue.length > 0) {
    const levelSize = queue.length; // nodes at current level
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue front
      level.push(node.val);

      if (node.left) queue.push(node.left); // enqueue children for next level
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

// Example tree:
//       3
//      / \
//     9   20
//        /  \
//       15    7
// Output: [[3], [9, 20], [15, 7]]

// Time: O(n) — each node visited once
// Space: O(n) — queue holds at most one full level (up to n/2 nodes)
