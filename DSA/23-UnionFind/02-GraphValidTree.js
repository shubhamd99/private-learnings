// https://leetcode.com/problems/graph-valid-tree/description/

// Union-Find (also called Disjoint-Set) is a specialized data structure used to solve exactly one type of problem:
// Grouping things together and checking if two things are in the same group.
// When to apply: Dynamic connectivity, undirected cycle detection, grouping components.

/**
 * Approach:
 * We need to verify if a given undirected graph is a valid tree. A valid tree
 * must be fully connected (1 component) and have absolutely no cycles.
 *
 * Idea:
 * We will use the Union-Find (Disjoint Set) algorithm. We start with `n` isolated
 * components. As we iterate through the given edges, we attempt to `union` the two
 * nodes. If the two nodes already share the same root (Top Boss), it means a path
 * already exists between them. Adding this current edge creates a cycle, so we
 * instantly return false. If they don't share the same root, we merge them and
 * decrement our component count. At the end, if the component count is exactly 1,
 * the graph is fully connected and is therefore a valid tree!
 *
 * Steps:
 * 1. Initialize `components = n`.
 * 2. Create `parent` and `rank` arrays. Set `parent[i] = i` and `rank[i] = 1`.
 * 3. Create the `find` helper with Path Compression.
 * 4. Create the `union` helper:
 *    - Find the Top Boss for both nodes.
 *    - If they have the SAME boss, return 0 (This means we found a cycle!).
 *    - If different bosses, merge them using Union by Rank. Return 1.
 * 5. Loop through all `edges`.
 *    - For each edge `[u, v]`, attempt a merge: `const success = union(u, v)`.
 *    - If `success === 0`, we found a cycle! Return `false` immediately.
 *    - If `success === 1`, decrement `components`.
 * 6. After the loop, return true ONLY if `components === 1`.
 *
 * Time Complexity: O(V + E * α(V))
 * - Basically O(V + E) for the exact same reasons as the standard Union-Find.
 *
 * Space Complexity: O(V)
 * - To store the `parent` and `rank` arrays.
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  let components = n;

  // We can do a quick mathematical optimization!
  // A valid tree with 'n' nodes MUST have exactly 'n - 1' edges.
  // If it has fewer, it's disconnected. If it has more, it has cycles!
  if (edges.length !== n - 1) {
    return false;
  }

  const parent = [];
  const rank = [];

  // Setup the initial corporate structure
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    rank[i] = 1;
  }

  // The FIND function with Path Compression
  // Climbing the corporate ladder to find the CEO (The Top Boss).
  function find(node) {
    let current = node;

    while (current !== parent[current]) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }

    return current;
  }

  // The UNION function
  function union(n1, n2) {
    const root1 = find(n1);
    const root2 = find(n2);

    // CYCLE DETECTED! They are already in the same group!
    if (root1 === root2) {
      return 0; // Return 0 to indicate a cycle was found
    }

    // Merge them based on rank
    if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
      rank[root1] += rank[root2];
    } else {
      parent[root1] = root2;
      rank[root2] += rank[root1];
    }

    return 1; // Return 1 to indicate a successful merge
  }

  // Process every edge
  for (let i = 0; i < edges.length; i++) {
    const nodeA = edges[i][0];
    const nodeB = edges[i][1];

    const mergeSuccess = union(nodeA, nodeB);

    // CHECK: Did we just find a loop?
    if (mergeSuccess === 0) {
      return false; // Not a valid tree!
    }

    // Otherwise, it was a successful merge, so we lose an isolated group
    components -= 1;
  }

  // CHECK: Is everyone in exactly 1 giant group?
  return components === 1;
};

// A valid tree with 'n' nodes MUST have exactly 'n - 1' edges.
// Let's build a tree from scratch:
// Scenario 1: You have 1 City (n = 1) You don't need any highways! Everyone is already connected.

// Cities: 1
// Highways needed: 0 (1 - 1 = 0)
// Scenario 2: You have 2 Cities (n = 2) To connect City A and City B, you need exactly 1 highway.

// Cities: 2
// Highways needed: 1 (2 - 1 = 1)
// Scenario 3: You have 3 Cities (n = 3) To connect City A, City B, and City C, you draw a line from A to B, and B to C. That takes 2 highways.

// Cities: 3
// Highways needed: 2 (3 - 1 = 2)
