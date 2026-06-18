// https://leetcode.com/problems/pacific-atlantic-water-flow/description/

// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean.
// The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right
// and bottom edges.

// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where
// heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and
// west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell
// adjacent to an ocean into the ocean.

// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from
// cell (ri, ci) to both the Pacific and Atlantic oceans.

/**
 * Approach:
 * We need to find all coordinates where water can flow to both the Pacific
 * (Top/Left) and Atlantic (Bottom/Right) oceans. Water flows from higher/equal
 * elevation to lower/equal elevation.
 *
 * Idea:
 * Instead of simulating water flowing down from every cell, we reverse the
 * problem. We simulate water flooding UP from the oceans. We run a DFS from
 * all Pacific border cells, moving only to cells with HIGHER or EQUAL elevation,
 * and record reachable cells in a `pacificReachable` matrix. We do the same
 * for the Atlantic border into an `atlanticReachable` matrix. Finally, we find
 * the intersection: cells marked true in both matrices are our answer.
 *
 * Steps:
 * 1. Initialize Variables: `ROWS` and `COLS`. Create two 2D boolean arrays
 *    (`pacificReachable` and `atlanticReachable`) initialized to `false`.
 * 2. Create the DFS Helper: `dfs(r, c, reachableMatrix, previousHeight)`
 *    - Boundary Check: If `r` or `c` are out of bounds, return.
 *    - Visited Check: If `reachableMatrix[r][c]` is already `true`, return.
 *    - Elevation Check: Since we are flooding UP, if the current cell's height
 *      is strictly LESS than `previousHeight`, the water can't climb it. Return.
 *    - Mark Reachable: Set `reachableMatrix[r][c] = true`.
 *    - Explore: Recursively call `dfs` on the 4 neighbors, passing the current
 *      cell's height as the new `previousHeight`.
 * 3. Run the Floods:
 *    - Loop through every row. Start a Pacific flood from the left edge (col 0),
 *      and an Atlantic flood from the right edge (col COLS - 1).
 *    - Loop through every column. Start a Pacific flood from the top edge (row 0),
 *      and an Atlantic flood from the bottom edge (row ROWS - 1).
 * 4. Find Intersections: Loop through every cell in the grid. If a cell is true
 *    in both `pacificReachable` AND `atlanticReachable`, push `[r, c]` to results.
 * 5. Return results.
 *
 * Time Complexity: O(M * N)
 * - M is rows, N is columns. Although we start many DFS calls, our `reachableMatrix`
 *   acts as a `visited` set. Each cell is visited at most once by the Pacific flood
 *   and at most once by the Atlantic flood.
 *
 * Space Complexity: O(M * N)
 * - We use two M x N boolean matrices to track reachability.
 * - The DFS recursion call stack can also go as deep as O(M * N) in the worst case.
 */

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  if (!heights || heights.length === 0) {
    return [];
  }

  const ROWS = heights.length;
  const COLS = heights[0].length;

  // Array.from takes two arguments:
  // An object with a length: { length: ROWS } tells JavaScript to loop 3 times.
  // A mapping function: () => Array(COLS).fill(false)
  const pacificReachable = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(false),
  );
  const atlanticReachable = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(false),
  );

  function dfs(r, c, reachableMatrix, previousHeight) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return; // Stop if out of bounds

    // Stop if we've already flooded this cell
    if (reachableMatrix[r][c] === true) return;

    // Stop if the mountain is too steep to climb (current is lower than previous)
    if (heights[r][c] < previousHeight) return;

    // Mark this cell as successfully reached by the ocean!
    reachableMatrix[r][c] = true;

    // Try flooding the 4 neighbors. Pass our current height as the new previousHeight
    dfs(r - 1, c, reachableMatrix, heights[r][c]); // Up
    dfs(r + 1, c, reachableMatrix, heights[r][c]); // Down
    dfs(r, c - 1, reachableMatrix, heights[r][c]); // Left
    dfs(r, c + 1, reachableMatrix, heights[r][c]); // Right
  }

  // Run DFS from the Left (Pacific) and Right (Atlantic) vertical borders
  for (let r = 0; r < ROWS; r++) {
    dfs(r, 0, pacificReachable, heights[r][0]);
    dfs(r, COLS - 1, atlanticReachable, heights[r][COLS - 1]);
  }

  // Run DFS from the Top (Pacific) and Bottom (Atlantic) horizontal borders
  for (let c = 0; c < COLS; c++) {
    dfs(0, c, pacificReachable, heights[0][c]); // Top edge
    dfs(ROWS - 1, c, atlanticReachable, heights[ROWS - 1][c]); // Bottom edge
  }

  // Check all cells to find which ones got reached by BOTH oceans
  const result = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (pacificReachable[r][c] && atlanticReachable[r][c]) {
        result.push([r, c]);
      }
    }
  }

  return result;
};
