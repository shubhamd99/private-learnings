// https://leetcode.com/problems/minimum-height-trees/description/

// A tree is an undirected graph in which any two vertices are connected by exactly one path.
// In other words, any connected graph without simple cycles is a tree.
// The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

// Input: n = 4, edges = [[1,0],[1,2],[1,3]]
// Output: [1]
// Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
// Output: [3,4]

/**
 * Approach:
 * We need to find the root nodes that yield the Minimum Height Trees. These
 * root nodes are always the "center" nodes of the graph.
 *
 * Idea:
 * We will use a Topological Sort-like BFS approach known as "Leaf Peeling".
 * We build an adjacency list and keep track of the `degree` (number of connections)
 * for every node. Any node with a degree of 1 is a leaf (on the outer edge).
 * We put all leaves in a queue and process them layer by layer. For each leaf,
 * we remove it from the graph and decrease the degree of its neighbor. If the
 * neighbor's degree drops to 1, it becomes a leaf in the new outer layer and is
 * added to the queue. We continue peeling away layers of leaves until we are
 * left with 2 or fewer nodes. These final nodes are the centers of the graph!
 *
 * Steps:
 * 1. Base Cases: If `n === 1`, return `[0]`. If `n === 2`, return `[0, 1]`.
 * 2. Setup Graph: Initialize `adjList` (Array of Sets for easy removal) and `degree` array.
 * 3. Build Graph: Loop through `edges`. Add connections to both nodes in `adjList`
 *    and increment their `degree`.
 * 4. Find Initial Leaves: Loop 0 to `n-1`. If `degree[i] === 1`, push to `queue`.
 * 5. Peel the Onion (BFS):
 *    - Loop while `n > 2` (because a graph can have at most 2 centers).
 *    - Record the size of the current leaf layer: `let leafCount = queue.length`.
 *    - Subtract `leafCount` from `n` (we are ripping off this many nodes).
 *    - Loop exactly `leafCount` times to process the current layer:
 *        - Shift `leaf` from the queue.
 *        - Find its neighbor (since degree is 1, it only has 1 neighbor in its Set).
 *        - Remove the leaf from the neighbor's Set.
 *        - Decrement the neighbor's `degree`.
 *        - If `degree[neighbor] === 1`, push it to the queue for the next layer!
 * 6. Return the `queue`. Whatever is left inside are our center nodes!
 *
 * Time Complexity: O(V + E)
 * - V is `n` (nodes), E is `n-1` (edges). We build the graph in O(V + E) and
 *   visit each node/edge exactly once during the BFS peeling process.
 *
 * Space Complexity: O(V + E)
 * - To store the `adjList`, `degree` array, and the `queue`.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0];
  if (n === 2) return [0, 1]; // Either node works!

  // Build the graph
  // We use Sets for the adjacency list so we can easily get the single neighbor
  const adjList = [];
  const degree = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    adjList.push(new Set());
  }

  // Build the graph by looping through every connection (edge) LeetCode gives us
  for (let i = 0; i < edges.length; i++) {
    // two ends of an edge
    const u = edges[i][0];
    const v = edges[i][1];

    // Draw the map (Adjacency List)
    // Because the string goes both ways, we must write the connection down in BOTH of their notebooks!
    adjList[u].add(v); // Bead U writes: "I am connected to Bead V"
    adjList[v].add(u); // Bead V writes: "I am connected to Bead U"

    degree[u]++;
    degree[v]++;
  }

  // Find the outermost layer of leaves
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      queue.push(i);
    }
  }

  // Peel the onion!
  // We stop when there are 2 or fewer nodes left in the entire graph
  let remainingNodes = n;

  // NOTE: We cannot use a simple 'head' pointer here because we need
  // to process the queue perfectly layer by layer.
  while (remainingNodes > 2) {
    const leavesInCurrentLayer = queue.length;

    // We are about to rip off this entire layer of leaves
    remainingNodes -= leavesInCurrentLayer;

    // Process exactly the leaves in this current outer layer
    for (let i = 0; i < leavesInCurrentLayer; i++) {
      const leaf = queue.shift(); // Using shift() is fine for layer-by-layer BFS

      // Because it's a leaf, it only has exactly 1 neighbor left in its Set.
      // Using .values().next().value gets that single item out of the Set.
      const neighbor = adjList[leaf].values().next().value;

      // Rip the leaf off the neighbor!
      adjList[neighbor].delete(leaf);
      degree[neighbor]--;

      // If the neighbor just got exposed and is now a leaf itself...
      if (degree[neighbor] === 1) {
        queue.push(neighbor); // Add it to the queue for the next layer
      }
    }
  }

  // The queue now holds the 1 or 2 absolute center nodes!
  return queue;
};
