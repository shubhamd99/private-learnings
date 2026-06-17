// https://leetcode.com/problems/max-area-of-island/description/

// You are given an m x n binary matrix grid. An island is a group of 1's (representing land)
// connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// The area of an island is the number of cells with a value 1 in the island.
// Return the maximum area of an island in grid. If there is no island, return 0.

/**
 * Approach:
 * We need to find the largest island (connected group of 1s) in a grid and
 * return its area.
 *
 * Idea:
 * We will use Depth-First Search (DFS) exactly like we did in "Number of Islands".
 * We iterate through the grid. When we find a 1, we start a DFS to explore the
 * entire island. The DFS will mark the land as visited (by changing it to 0)
 * and return the total area of the connected land. It calculates the area by
 * returning 1 (for the current cell) plus the area of all valid land in the
 * 4 surrounding directions. We keep a running maximum of the areas we find.
 *
 * Steps:
 * 1. Initialize Variables: `maxArea` starting at 0, and the grid dimensions.
 * 2. Create the DFS Helper: `dfs(r, c)`
 *    - Base Case: If `r` or `c` are out of bounds, or the cell is water (`0`),
 *      return an area of `0`.
 *    - Mark Visited: Sink the land by setting `grid[r][c] = 0`.
 *    - Calculate Area: Recursively call `dfs` on the 4 neighbors. Add their
 *      results together, add `1` for the current cell, and return the total.
 * 3. Scan the Grid: Loop through every cell.
 *    - If the cell is `1`, call `dfs(r, c)` to get the area of that island.
 *    - Update `maxArea` if the newly found area is larger.
 * 4. Return `maxArea`.
 *
 * Time Complexity: O(M * N)
 * - M is the number of rows, N is the number of columns. We visit every cell.
 *   The DFS only processes land cells once before turning them to water, so
 *   overall we still only do a constant amount of work per cell.
 *
 * Space Complexity: O(M * N)
 * - This is the space used by the recursion call stack during DFS. In the worst
 *   case (the entire grid is one massive island), the DFS will go deep enough
 *   to put every single cell onto the call stack.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let maxArea = 0;
  const ROWS = grid.length;
  const COLS = grid[0].length;

  function dfs(r, c) {
    // Stop if we fall off the map OR hit water (0)
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] === 0) {
      return 0; // Water has an area of 0
    }

    // SINK THE LAND!
    grid[r][c] = 0;

    // Ask the 4 neighbors how much land they have
    const up = dfs(r - 1, c);
    const down = dfs(r + 1, c);
    const left = dfs(r, c - 1);
    const right = dfs(r, c + 1);

    // Return my land (1) + whatever my neighbors found
    return 1 + up + down + left + right;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Did we spot land?
      if (grid[r][c] === 1) {
        // Find out how big it is!
        const currentArea = dfs(r, c);

        maxArea = Math.max(currentArea, maxArea); // Is it the biggest one we've seen so far?
      }
    }
  }

  return maxArea;
};

// [
//   [ 0,  0, 🟨,  0,  0,  0,  0, 🟧,  0,  0,  0,  0,  0],
//   [ 0,  0,  0,  0,  0,  0,  0, 🟧, 🟧, 🟧,  0,  0,  0],
//   [ 0, 🟩, 🟩,  0, 🟪,  0,  0,  0,  0,  0,  0,  0,  0],
//   [ 0, 🟩,  0,  0, 🟪, 🟪,  0,  0, 🟦,  0, 🟦,  0,  0],
//   [ 0, 🟩,  0,  0, 🟪, 🟪,  0,  0, 🟦, 🟦, 🟦,  0,  0],
//   [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 🟦,  0,  0],
//   [ 0,  0,  0,  0,  0,  0,  0, 🟥, 🟥, 🟥,  0,  0,  0],
//   [ 0,  0,  0,  0,  0,  0,  0, 🟥, 🟥,  0,  0,  0,  0]
// ]

// The Island Sizes:
// 🟨 Yellow Island: Area = 1
// 🟧 Orange Island: Area = 4
// 🟩 Green Island: Area = 4
// 🟪 Purple Island: Area = 5
// 🟥 Red Island: Area = 5
// 🟦 Blue Island: Area = 6 🏆 (The Winner!)

// Explanation: The answer is not 11, because the island must be connected 4-directionally.
