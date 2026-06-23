// https://leetcode.com/problems/rotting-oranges/description/

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

// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

/**
 * Approach:
 * We need to find the minimum time required to rot all oranges in a grid.
 *
 * Idea:
 * This is a textbook Multi-source Breadth-First Search (BFS) problem.
 * We first scan the grid to count all fresh oranges and find the starting positions
 * of all rotten oranges, pushing them all into our initial BFS queue. Then, we
 * process the queue level by level (minute by minute). When a rotten orange infects
 * an adjacent fresh orange, we change the fresh orange to rotten, decrease our
 * fresh orange count, and push the newly rotted orange to the queue for the next
 * minute. Once the BFS completes, if any fresh oranges remain, it's impossible to
 * rot them all (return -1). Otherwise, return the maximum minutes reached.
 *
 * Steps:
 * 1. Initialize Variables: `queue` for BFS, `freshCount` = 0, `timeElapsed` = 0.
 * 2. Initial Map Scan: Loop through the grid.
 *    - If `1` (Fresh): `freshCount++`.
 *    - If `2` (Rotten): push `[r, c, 0]` into the queue (row, col, minute 0).
 * 3. Base Case Check: If `freshCount === 0` initially, return 0 (nobody to infect).
 * 4. Setup Directions: `[[-1, 0], [1, 0], [0, -1], [0, 1]]` (Up, Down, Left, Right).
 * 5. Run Multi-source BFS: Loop while queue is not empty (using `head` pointer).
 *    - Grab the front item: `const [r, c, mins] = queue[head++]`.
 *    - Update `timeElapsed = mins`. (This keeps track of the maximum time reached).
 *    - Explore Neighbors: Loop through the 4 directions.
 *    - If a neighbor is within bounds AND is a fresh orange (`1`):
 *        - SINK IT! Turn it rotten `grid[nextR][nextC] = 2`.
 *        - Decrement the tally: `freshCount--`.
 *        - Push to queue: `queue.push([nextR, nextC, mins + 1])`.
 * 6. Final Check: After BFS, if `freshCount > 0`, return -1. Else, return `timeElapsed`.
 *
 * Time Complexity: O(M * N)
 * - M is rows, N is columns. We scan the grid once initially, and during the BFS,
 *   each cell is processed and pushed to the queue at most once.
 *
 * Space Complexity: O(M * N)
 * - The queue can hold up to O(M * N) elements in the worst case (e.g., if the
 *   grid is entirely filled with rotten oranges at the start).
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const queue = [];
  let head = 0; // O(1) queue shift pointer
  let freshCount = 0;
  let timeElapsed = 0;

  // Scout the map to find all humans and initial zombies
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        freshCount++;
      } else if (grid[r][c] === 2) {
        // Add all initial zombies to the queue at minute 0
        queue.push([r, c, 0]);
      }
    }
  }

  // If there are no fresh oranges to begin with, it takes 0 minutes
  if (freshCount === 0) {
    return 0;
  }

  // Up, Down, Left, Right
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  // Multi-source BFS (The Outbreak begins!)
  while (head < queue.length) {
    const [r, c, mins] = queue[head];
    head++; // Move the line forward

    // Keep updating our stopwatch to whatever minute this zombie was created
    timeElapsed = mins;

    // Zombie tries to infect all 4 neighbors
    for (let i = 0; i < directions.length; i++) {
      const nextR = r + directions[i][0];
      const nextC = c + directions[i][1];

      // Is the neighbor inside the map AND is it a fresh orange (1)?
      // Are we inside the top boundary? AND
      // Are we inside the bottom boundary? AND
      // Are we inside the left boundary? AND
      // Are we inside the right boundary?
      if (
        nextR >= 0 &&
        nextR < ROWS &&
        nextC >= 0 &&
        nextC < COLS &&
        grid[nextR][nextC] === 1
      ) {
        // Infect them! (Mark as visited so they don't get infected again)
        grid[nextR][nextC] = 2;

        freshCount--; // One less human in the world

        // This brand new zombie goes to the back of the line for the NEXT minute
        queue.push([nextR, nextC, mins + 1]);
      }
    }
  }

  // Did any humans survive because they were blocked by walls (0)?
  if (freshCount > 0) {
    return -1; // Failure, we couldn't rot them all
  }

  // Total victory! Return the stopwatch time.
  return timeElapsed;
};
