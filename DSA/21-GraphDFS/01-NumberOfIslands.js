// https://leetcode.com/problems/number-of-islands/

// A Graph is like a Tree that completely threw away all the rules.
// In a Tree, you have a strict top-down hierarchy (a Root parent, children below it, no loops).
// In a Graph, there is no "top" or "bottom". It is simply a collection of Nodes (sometimes called Vertices)
// connected by Edges (lines).

// Google Maps: Every city is a node. The highways connecting them are the edges.
// You can drive in circles all day long.

// Graph DFS (Depth-First Search)
// DFS in a graph is exactly the same as DFS in a tree: You pick a path and go as deep as humanly possible
// until you hit a dead end. Once you hit a dead end, you take one step backward and try a different path.

// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.

/**
 * Approach:
 * We need to count the number of distinct islands (connected groups of '1's) in a 2D grid.
 *
 * Idea:
 * We treat the 2D grid as a graph. We will use a nested loop to iterate through every
 * single cell in the grid. Whenever we find a '1', it means we have discovered a
 * new island. We increment our island count, and immediately trigger a Depth-First
 * Search (DFS) starting from that cell. The DFS will explore all connected land (up,
 * down, left, right) and "sink" it by changing the '1's to '0's. This acts as our
 * `visited` notebook, ensuring we never count the same piece of land twice when our
 * main loop eventually reaches it.
 *
 * Steps:
 * 1. Base Case Check: If the grid is empty, return 0.
 * 2. Initialize Variables:
 *    - `islandCount` starting at 0.
 *    - `ROWS` and `COLS` to store the dimensions of the grid.
 * 3. Create the DFS Helper: `dfs(r, c)`
 *    - Boundary Check: If `r` or `c` go off the edge of the map, or if the current
 *      cell is water (`'0'`), just return and stop exploring this path.
 *    - Sink the Land: We are standing on a valid `'1'`. Change it to `'0'` so we
 *      never visit it again.
 *    - Explore Neighbors: Recursively call `dfs` on the 4 surrounding cells
 *      (Up: r-1, Down: r+1, Left: c-1, Right: c+1).
 * 4. Scan the Grid: Use a nested `for` loop to check every cell.
 *    - If `grid[r][c] === '1'`, we found a new island!
 *    - Increment `islandCount++`.
 *    - Call `dfs(r, c)` to sink the entire island before moving on.
 * 5. Return `islandCount`.
 *
 * Time Complexity: O(M * N)
 * - M is the number of rows, N is the number of columns. We visit every cell in
 *   the grid during our nested loops. Even though we trigger a DFS, the DFS only
 *   visits land cells and immediately turns them to water. Therefore, every cell
 *   is processed a constant number of times.
 *
 * Space Complexity: O(M * N)
 * - This is the space used by the recursion call stack during the DFS. In the
 *   worst-case scenario (the entire grid is one massive island), the DFS will go
 *   deep enough to put every single cell onto the call stack.
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  if (!grid || grid.length === 0) {
    return 0;
  }

  let islandCount = 0;
  const ROWS = grid.length;
  const COLS = grid[0].length;

  function dfs(r, c) {
    // Stop if we fall off the map OR if we hit water ('0')
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] === "0") {
      return;
    }

    // SINK THE LAND! (Mark it as visited)
    grid[r][c] = "0";

    // Explore all 4 directions looking for more connected land
    dfs(r - 1, c); // UP
    dfs(r + 1, c); // DOWN
    dfs(r, c + 1); // RIGHT
    dfs(r, c - 1); // LEFT
  }

  // Scan the entire map with the drone
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Did we spot land?
      if (grid[r][c] === "1") {
        islandCount++;
        dfs(r, c); // Send the DFS to sink the rest of it!
      }
    }
  }

  return islandCount;
};

// [
//   [ 🟥, 🟥, "0", "0", "0"],
//   [ 🟥, 🟥, "0", "0", "0"],
//   ["0", "0",  🟩, "0", "0"],
//   ["0", "0", "0",  🟦,  🟦]
// ]
// Output: 3

// [
//   [ 🟥, 🟥, 🟥, 🟥, "0"],
//   [ 🟥, 🟥, "0", 🟥, "0"],
//   [ 🟥, 🟥, "0", "0", "0"],
//   ["0", "0", "0", "0", "0"]
// ]
// Output: 1
