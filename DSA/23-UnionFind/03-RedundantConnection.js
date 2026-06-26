// https://leetcode.com/problems/redundant-connection/description/

// In this problem, a tree is an undirected graph that is connected and has no cycles.

// You are given a graph that started as a tree with n nodes labeled from 1 to n,
// with one additional edge added. The added edge has two different vertices chosen from 1 to n,
// and was not an edge that already existed. The graph is represented as an array edges of length n
// where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

// Input: edges = [[1,2],[1,3],[2,3]]
// Output: [2,3]
// Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
// Output: [1,4]

/**
 * Approach:
 * We are given a graph that was originally a tree, but one extra edge was added,
 * creating a cycle. We need to find and return that redundant edge.
 *
 * Idea:
 * This is the ultimate Union-Find cycle detection problem. We iterate through the
 * given edges and attempt to `union` the two nodes. If we ever try to union two
 * nodes that ALREADY share the same root (Top Boss), it means a path already
 * exists between them. Therefore, this specific edge is the one creating the cycle!
 * We simply return that edge the moment we detect the cycle.
 *
 * Steps:
 * 1. Find `n`. Since the graph originally had `n-1` edges and 1 was added, the
 *    length of the `edges` array is exactly `n`.
 * 2. Create `parent` and `rank` arrays. Because nodes are 1-indexed (1 to n),
 *    we loop up to `n` (size `n + 1`) to setup the initial corporate structure.
 * 3. Create the `find` helper with Path Compression.
 * 4. Create the `union` helper:
 *    - Find the Top Boss for both nodes.
 *    - If they have the SAME boss, return 0 (Cycle detected!).
 *    - If different bosses, merge them using Union by Rank. Return 1.
 * 5. Loop through all `edges`.
 *    - For each edge, attempt a merge: `const success = union(edge[0], edge[1])`.
 *    - If `success === 0`, we found the redundant edge! Return `edge` immediately.
 * 6. (Fallback return if no cycle found, though the problem guarantees one exists).
 *
 * Time Complexity: O(N * α(N))
 * - We process N edges. The Union-Find operations take amortized O(α(N)) time,
 *   so the total time is effectively O(N) constant time.
 *
 * Space Complexity: O(N)
 * - To store the `parent` and `rank` arrays of size N + 1.
 */

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const n = edges.length; // The number of nodes is equal to the number of edges
  const parent = [];
  const rank = [];

  // Setup the initial corporate structure
  // Note: We go up to <= n because the nodes are labeled 1 to n (1-indexed)
  for (let i = 0; i <= n; i++) {
    parent[i] = i;
    rank[i] = 1;
  }

  // The FIND function with Path Compression
  function find(node) {
    let current = node;
    while (current !== parent[current]) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }

    return current;
  }

  function union(n1, n2) {
    const root1 = find(n1);
    const root2 = find(n2);

    // CYCLE DETECTED! They are already in the same group!
    if (root1 === root2) return 0; // Return 0 to indicate a cycle was found

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
    const edge = edges[i];

    // Attempt to merge the two nodes connected by this edge
    const mergeSuccess = union(edge[0], edge[1]);

    // If they were already in the same group, this edge ruined the tree!
    if (mergeSuccess === 0) {
      return edge; // Return the guilty edge immediately
    }
  }

  return [];
};
