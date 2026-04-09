// Number of Islands
// Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
// An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.
//
// Input:
//   [["1","1","0","0"],
//    ["1","1","0","0"],
//    ["0","0","1","0"],
//    ["0","0","0","1"]]
// Output: 3

// ---- SIMPLE VERSION (for interviews) ----
// Idea: iterate every cell. When a '1' is found, increment count and
// flood-fill (DFS) the entire island by marking visited cells as '0'.
// This way each island is counted exactly once.

function numIslands(grid) {
  let count = 0;

  function dfs(r, c) {
    // out of bounds or water — stop
    if (
      r < 0 ||
      r >= grid.length ||
      c < 0 ||
      c >= grid[0].length ||
      grid[r][c] === "0"
    ) {
      return;
    }
    grid[r][c] = "0"; // mark visited (sink the land)
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c); // sink entire island
      }
    }
  }

  return count;
}

// Example
const grid = [
  ["1", "1", "0", "0"],
  ["1", "1", "0", "0"],
  ["0", "0", "1", "0"],
  ["0", "0", "0", "1"],
];
console.log(numIslands(grid)); // 3

// Time: O(m * n) — each cell visited at most once
// Space: O(m * n) — recursion stack in worst case (all land)
