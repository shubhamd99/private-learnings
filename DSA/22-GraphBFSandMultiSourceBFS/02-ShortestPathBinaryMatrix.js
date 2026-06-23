// https://leetcode.com/problems/shortest-path-in-binary-matrix/

// Graph BFS (Breadth-First Search)
// Breadth-First Search is a traversal algorithm for a graph data structure that starts at a single,
// specific source node and explores all of its immediate neighboring nodes (depth level 1) before moving on
// to explore the neighbors of those nodes (depth level 2), and so on.

// We do this using a Queue (a First-In-First-Out waiting line). You put your starting node in the queue,
// process it, and push all its neighbors to the back of the line.

// You use Multi-source BFS whenever you need to find the shortest distance,
// but there are multiple valid starting points.
// Multi-source BFS is a variation of the standard Breadth-First Search algorithm that initializes the search
// from multiple starting nodes simultaneously. By placing all source nodes into the queue at the very beginning
// (all at depth level 0), the algorithm expands outward from all sources at the same time.

// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix.
// If there is no clear path, return -1.
// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
// The length of a clear path is the number of visited cells of this path.

/**
 * Approach:
 * We need to find the shortest path from the top-left to the bottom-right of a grid.
 * We can move in 8 directions, and we can only step on 0s.
 *
 * Idea:
 * Since we want the "shortest path" in an unweighted grid, Breadth-First Search (BFS)
 * is the perfect tool. We will use a queue to explore the grid level by level. We
 * start at (0, 0) with a path length of 1. We explore all 8 valid neighbors, mark
 * them as visited by mutating the grid (changing 0 to 1), and push them into the
 * queue. The first time we pull the destination coordinate out of the queue, we are
 * guaranteed it is the shortest path, so we return the path length.
 *
 * Steps:
 * 1. Base Case: Check if the start `grid[0][0]` or the end `grid[n-1][n-1]` are 1.
 *    If they are, the path is blocked, return -1.
 * 2. Setup Directions: Create an array of the 8 possible directional moves (row/col offsets).
 * 3. Initialize Queue: Push the starting node `[0, 0, 1]` (row, col, steps). Mark
 *    `grid[0][0] = 1` as visited.
 * 4. Run BFS: Loop while the queue is not empty (using a `head` pointer for O(1) shifts).
 *    - Grab the front item: `const [r, c, steps] = queue[head++]`.
 *    - Target Check: If `r` and `c` are the bottom-right corner, return `steps`.
 *    - Explore Neighbors: Loop through all 8 directions.
 *    - If the neighbor is within the grid bounds AND is a `0`:
 *        - Mark the neighbor as visited: `grid[neighborR][neighborC] = 1`.
 *        - Push the neighbor to the queue with `steps + 1`.
 * 5. If the queue empties and we never reached the target, return -1.
 *
 * Time Complexity: O(N)
 * - Where N is the total number of cells in the grid (which is rows * cols). In the
 *   worst case, we visit every single cell exactly once.
 *
 * Space Complexity: O(N)
 * - The queue can hold up to O(N) cells at the same time in the worst case (e.g.,
 *   when the BFS wave expands across a massive open room).
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const N = grid.length;

  // Base Cases (Start or end is blocked!)
  if (grid[0][0] === 1 || grid[N - 1][N - 1] === 1) {
    return -1;
  }

  // All 8 possible moves [row_offset, col_offset]
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Up Left
    [-1, 1], // Up Right
    [1, -1], // Down Left
    [1, 1], // Down Right
  ];

  // Initialize Queue with [row, col, steps]
  const queue = [[0, 0, 1]];
  let head = 0; // Using a head pointer instead of slow .shift()

  // Mark the starting cell as visited by turning it into a wall
  grid[0][0] = 1;

  // Run the BFS wave
  while (head < queue.length) {
    const [r, c, steps] = queue[head]; // Grab the person at the front of the line
    head++;

    // Did we reach the finish line?
    if (r === N - 1 && c === N - 1) {
      return steps;
    }

    // Look in all 8 directions
    for (let i = 0; i < directions.length; i++) {
      const nextR = r + directions[i][0];
      const nextC = c + directions[i][1];

      // Is the neighbor inside the map AND is it an unvisited 0?
      if (
        nextR >= 0 &&
        nextR < N &&
        nextC >= 0 &&
        nextC < N &&
        grid[nextR][nextC] === 0
      ) {
        // SINK IT! Mark as visited immediately so nobody else adds it to the queue
        grid[nextR][nextC] = 1;

        // Put the neighbor at the back of the line, taking 1 more step
        queue.push([nextR, nextC, steps + 1]);
      }
    }
  }

  // The queue emptied, meaning we explored everything and found no path
  return -1;
};
