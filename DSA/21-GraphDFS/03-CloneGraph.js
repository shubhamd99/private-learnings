// https://leetcode.com/problems/clone-graph/description/

// Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.
// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// For simplicity, each node's value is the same as the node's index (1-indexed). For example,
// the first node with val == 1, the second node with val == 2, and so on.
// The graph is represented in the test case using an adjacency list.

// An adjacency list is a collection of unordered lists used to represent a finite graph.
// Each list describes the set of neighbors of a node in the graph.
// The given node will always be the first node with val = 1.
// You must return the copy of the given node as a reference to the cloned graph.

/**
 * Approach:
 * We need to create a deep copy of a connected undirected graph.
 *
 * Idea:
 * We will use Depth-First Search (DFS) to traverse the graph. To avoid getting
 * stuck in infinite loops (cycles), we use a HashMap (our "notebook") to keep
 * track of nodes we have already cloned. The Map will link the `Original Node`
 * to its corresponding `Cloned Node`. When we visit a node, if it's already in
 * our Map, we just return the clone. If not, we create a clone, save it to the
 * Map immediately, and then recursively clone all of its neighbors.
 *
 * Steps:
 * 1. Base Case Check: If the given `node` is null, return null.
 * 2. Initialize Notebook: Create a `visited` Map.
 * 3. Create the DFS Helper: `dfs(oldNode)`
 *    - Base Case (Notebook Check): If `visited.has(oldNode)`, it means we already
 *      created a clone for this node! Just return `visited.get(oldNode)`.
 *    - Create Clone: Build a new node: `const cloneNode = new Node(oldNode.val)`.
 *    - Save to Notebook: IMMEDIATELY save it to the map: `visited.set(oldNode, cloneNode)`.
 *      We must do this before exploring neighbors so that if a neighbor loops back
 *      to this node, the base case will catch it!
 *    - Clone the Neighbors: Loop through `oldNode.neighbors`. For every `neighbor`,
 *      recursively call `dfs(neighbor)`. Push the returned cloned neighbor into
 *      `cloneNode.neighbors`.
 *    - Return the fully built `cloneNode`.
 * 4. Start DFS: Call `dfs(node)` starting with the original given node.
 * 5. Return the result.
 *
 * Time Complexity: O(V + E)
 * - V is the number of Vertices (nodes), and E is the number of Edges (connections).
 * - We visit every single node exactly once, and we look at every single edge
 *   exactly once while looping through the neighbors.
 *
 * Space Complexity: O(V)
 * - We use O(V) space for our `visited` Map to store all the cloned nodes.
 * - The recursion call stack also takes up to O(V) space if the graph is a long
 *   straight line.
 */

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  if (node === null) {
    return null;
  }

  const visited = new Map();

  function dfs(oldNode) {
    // Did we already build a clone for this specific old node?
    if (visited.has(oldNode)) {
      return visited.get(oldNode);
    }

    const cloneNode = new _Node(oldNode.val);

    visited.set(oldNode, cloneNode); // save it in the notebook before checking neighbors

    // look at all the old node's neighbors
    for (let i = 0; i < oldNode.neighbors.length; i++) {
      const neighbor = oldNode.neighbors[i];

      // Recursively clone the neighbor, and attach it to our new clone
      cloneNode.neighbors.push(dfs(neighbor));
    }

    return cloneNode;
  }

  return dfs(node);
};

// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
