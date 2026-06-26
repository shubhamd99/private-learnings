// https://leetcode.com/problems/number-of-islands-ii/description/

/**
 * Approach:
 * We need to return the total number of islands after every single "add land"
 * operation on a dynamic grid.
 *
 * Idea:
 * We will use Union-Find. We flatten the 2D coordinates `(r, c)` into a 1D index
 * `(r * COLS + c)` so we can use standard Union-Find arrays. We initialize the
 * `parent` array with `-1` to represent water. When land is added, we set it to
 * point to itself (making it a new component) and increment our `islandCount`.
 * Then, we check its 4 adjacent neighbors. If a neighbor is also land, we `union`
 * them. If the union is successful, two separate islands just merged into one,
 * so we decrement our `islandCount`. We push the current count to our answer
 * array after processing each land drop.
 *
 * Steps:
 * 1. Initialize variables: `islandCount = 0`, `result = []`, `parent = []`, `rank = []`.
 * 2. Fill the `parent` array with `-1` (representing water). Size should be `m * n`.
 * 3. Define the standard `find` (with Path Compression) and `union` (with Rank) functions.
 * 4. Loop through every position in `positions`:
 *    - Calculate 1D ID: `const id = r * n + c`.
 *    - If `parent[id] !== -1`, it's already land! Just push `islandCount` and `continue`.
 *    - Mark it as land: `parent[id] = id`, `rank[id] = 1`.
 *    - Increment `islandCount++` (assume it's an isolated island for now).
 *    - Check 4 directions (Up, Down, Left, Right).
 *    - For each valid neighbor that is ALSO land (`parent[neighborId] !== -1`):
 *        - `mergeSuccess = union(id, neighborId)`.
 *        - `islandCount -= mergeSuccess` (If they merged, we lose an island).
 *    - Push the final `islandCount` to the `result` array.
 * 5. Return `result`.
 *
 * Time Complexity: O(K * α(M*N))
 * - Where K is the number of operations in `positions`, and M*N is the grid size.
 * - Initializing the parent array takes O(M*N).
 * - For each of the K positions, we do at most 4 Union-Find operations.
 *   Because of path compression, this takes near O(1) time per position.
 *
 * Space Complexity: O(M * N)
 * - The `parent` and `rank` arrays take space proportional to the total number
 *   of cells in the grid.
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
var numIslands2 = function (m, n, positions) {
  const result = [];
  let islandCount = 0;

  const parent = [];
  const rank = [];

  // The entire map starts as water (-1)
  const totalCels = m * n;

  for (let i = 0; i < totalCels; i++) {
    parent[i] = -1;
    rank[i] = 0;
  }

  // Standard Union-Find helpers
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

    if (root1 === root2) return 0; // They are already part of the same island!

    // Merge them
    if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
      rank[root1] += rank[root2];
    } else {
      parent[root1] = root2;
      rank[root2] += rank[root1];
    }

    return 1; // 1 successful merge!
  }

  // Up, Down, Left, Right
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  for (let i = 0; i < positions.length; i++) {
    const r = positions[i][0];
    const c = positions[i][1];

    // The math trick to turn a 2D coordinate into a 1D ID
    const id = r * n + c; // const id = (r * n) + c;

    // Is it already land? (LeetCode sometimes gives duplicate positions)
    if (parent[id] !== -1) {
      result.push(islandCount);
      continue;
    }

    // It rises from the ocean! It becomes its own boss
    parent[id] = id;
    rank[id] = 1;

    // We assume it's an isolated island to start
    islandCount++;

    // Let's look around at our 4 neighbors
    for (let d = 0; d < directions.length; d++) {
      const nextR = r + directions[d][0];
      const nextC = c + directions[d][1];

      // Is the neighbor inside the map?
      if (nextR >= 0 && nextR < m && nextC >= 0 && nextC < n) {
        const neighborId = nextR * n + nextC; // const neighborId = (nextR * n) + nextC;

        // Is the neighbor ALSO land?
        if (parent[neighborId] !== -1) {
          // Try to merge our new land with the neighbor's island
          const mergeSuccess = union(id, neighborId);

          // If we successfully bridged two islands, the total count drops by 1
          islandCount -= mergeSuccess;
        }
      }
    }

    // Record the total number of islands existing at this exact moment
    result.push(islandCount);
  }

  return result;
};
