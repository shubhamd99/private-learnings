// https://leetcode.com/problems/01-matrix/description/

// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two cells sharing a common edge is 1.

// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]

/**
 * Approach:
 * We need to find the distance to the nearest 0 for every cell in a binary matrix.
 *
 * Idea:
 * This is identical to the "Walls and Gates" Multi-source BFS problem. We will
 * start the BFS from all the `0`s simultaneously. To easily track which cells
 * haven't been visited yet, we will change all the `1`s to `Infinity` during our
 * initial scan. Then, as the BFS wave expands, whenever it finds a neighbor with
 * `Infinity`, it updates it with the shortest distance (`currentDistance + 1`)
 * and pushes it to the queue.
 *
 * Steps:
 * 1. Initialize variables: `ROWS`, `COLS`, a `queue`, and a `head` pointer.
 * 2. Initial Map Scan: Loop through the matrix.
 *    - If the cell is `0`: Push `[r, c]` to the queue.
 *    - If the cell is `1`: Change it to `Infinity` to mark it as unvisited.
 * 3. Setup Directions: `[[-1, 0], [1, 0], [0, -1], [0, 1]]` (Up, Down, Left, Right).
 * 4. Run Multi-source BFS: Loop while queue is not empty.
 *    - Grab the front cell: `const [r, c] = queue[head++]`.
 *    - Explore all 4 neighbors.
 *    - Guard Clause Check: If the neighbor is out of bounds, OR if the neighbor
 *      does NOT have `Infinity` (meaning it's already a 0 or already visited), skip it.
 *    - SINK IT: Update the neighbor's distance `mat[nextR][nextC] = mat[r][c] + 1`.
 *    - Push the newly updated neighbor to the queue.
 * 5. Return the modified `mat`.
 *
 * Time Complexity: O(M * N)
 * - We scan the grid once initially, and during the BFS, each cell is pushed to
 *   the queue and processed exactly once.
 *
 * Space Complexity: O(M * N)
 * - The queue can hold up to O(M * N) elements in the worst case (e.g., if the
 *   entire grid is filled with 0s).
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  if (!mat || mat.length === 0) return mat;

  const ROWS = mat.length;
  const COLS = mat[0].length;

  const queue = [];
  let head = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mat[r][c] === 0) {
        // We found a starting point!
        queue.push([r, c]);
      } else {
        // It's a 1 (an empty room). Mark it as Infinity so we know
        // it hasn't been visited by our BFS wave yet.
        mat[r][c] = Infinity;
      }
    }
  }

  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  // Multi-source BFS
  while (head < queue.length) {
    const [r, c] = queue[head];
    head++;

    for (let i = 0; i < directions.length; i++) {
      const nextR = r + directions[i][0];
      const nextC = c + directions[i][1];

      // Is it out of bounds? SKIP
      if (nextR < 0 || nextR >= ROWS || nextC < 0 || nextC >= COLS) {
        continue;
      }

      // Is it already visited (or a starting 0)? SKIP
      // We ONLY care about completely untouched rooms marked Infinity.
      if (mat[nextR][nextC] !== Infinity) {
        continue;
      }

      // SUCCESS! We reached a new room.
      // Write the shortest distance on the floor.
      mat[nextR][nextC] = mat[r][c] + 1;

      // Add it to the queue to spread the wave further
      queue.push([nextR, nextC]);
    }
  }

  return mat;
};
