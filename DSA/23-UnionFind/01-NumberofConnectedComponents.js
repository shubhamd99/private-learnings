// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/

// Union-Find (also called Disjoint-Set) is a specialized data structure used to solve exactly one type of problem:
// Grouping things together and checking if two things are in the same group.
// When to apply: Dynamic connectivity, undirected cycle detection, grouping components.

/**
 * Approach:
 * We need to find the number of disconnected groups in a graph given a list of edges.
 *
 * Idea:
 * We will use the Union-Find (Disjoint Set) data structure. We start by assuming
 * every single node is disconnected, meaning there are `n` components. For every
 * edge we are given, we try to `union` the two nodes. If the two nodes belong to
 * different components, we merge them together and decrease our total component
 * count by 1. If they already share the same root (Top Boss), we do nothing.
 * After processing all edges, the remaining count is our answer.
 * We will implement "Path Compression" in our `find` function to keep it blazing fast.
 *
 * Steps:
 * 1. Initialize `components = n`.
 * 2. Create the `parent` array: Every node is its own boss initially (`parent[i] = i`).
 * 3. Create the `rank` array: Every group starts with a size/rank of 1.
 * 4. Create `find(node)` helper:
 *    - Follow the `parent` pointers until a node points to itself (The Top Boss).
 *    - Path Compression: As we return from the recursion, update all nodes on the
 *      path to point directly to the Top Boss.
 * 5. Create `union(node1, node2)` helper:
 *    - Find the Top Boss of node1 (`root1`) and node2 (`root2`).
 *    - If `root1 === root2`, they are already connected. Return 0 (no merge happened).
 *    - If they are different, attach the smaller group (lower rank) to the larger
 *      group (higher rank). This keeps the tree flat.
 *    - Return 1 (a successful merge happened).
 * 6. Loop through all `edges`. For each edge `[u, v]`, subtract the result of
 *    `union(u, v)` from `components`.
 * 7. Return `components`.
 *
 * Time Complexity: O(V + E * α(V))
 * - V is the number of vertices (n), E is the number of edges.
 * - Building the initial arrays takes O(V) time.
 * - We process each edge once. The Union-Find operations take amortized O(α(V)) time,
 *   where α is the Inverse Ackermann function. This is effectively O(1) constant time
 *   in the real world. So total time is basically O(V + E).
 *
 * Space Complexity: O(V)
 * - The `parent` and `rank` arrays both take O(V) space.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  let components = n; // Start by assuming everyone is totally isolated

  const parent = [];
  const rank = [];

  // Setup the initial corporate structure
  for (let i = 0; i < n; i++) {
    parent[i] = i; // Everyone is their own boss
    rank[i] = 1; // Everyone's gang size is exactly 1
  }

  // The FIND function (Who is your ultimate boss?)
  // Climbing the corporate ladder to find the CEO (The Top Boss).
  function find(node) {
    let current = node;

    // Keep climbing the corporate ladder until someone is their own boss
    while (current !== parent[current]) {
      // PATH COMPRESSION: Make this person point to their boss's boss.
      // This shrinks the ladder so we don't have to climb as high next time!
      parent[current] = parent[parent[current]];
      current = parent[current];
    }
    return current; // Return the absolute Top Boss
  }

  // The UNION function (Merge two gangs together)
  function union(n1, n2) {
    const root1 = find(n1); // Boss of gang 1
    const root2 = find(n2); // Boss of gang 2

    // If they have the same boss, they are already in the same gang!
    if (root1 === root2) {
      return 0;
    }

    // They have different bosses. Let's merge them!
    // The smaller gang must report to the bigger gang (Union by Rank)
    if (rank[root1] > rank[root2]) {
      parent[root2] = root1; // root2 now works for root1
      rank[root1] += rank[root2]; // root1's gang gets bigger
    } else {
      parent[root1] = root2; // root1 now works for root2
      rank[root2] += rank[root1]; // root2's gang gets bigger
    }

    return 1;
  }

  // Process every friendship
  for (let i = 0; i < edges.length; i++) {
    const nodeA = edges[i][0];
    const nodeB = edges[i][1];

    // If two separate groups merge, they become 1 giant group.
    // This means the total number of separate groups in the world drops by 1!
    components -= union(nodeA, nodeB);
  }

  return components;
};

// In this problem, LeetCode gives us the connections (the "edges" of the graph) as an array of pairs.

// For example, the input might look like this: edges = [ [0, 1], [1, 2], [3, 4] ]

// Think of this as a list of friendships.

// [0, 1] means Person 0 is friends with Person 1.
// [1, 2] means Person 1 is friends with Person 2.
// [3, 4] means Person 3 is friends with Person 4.
