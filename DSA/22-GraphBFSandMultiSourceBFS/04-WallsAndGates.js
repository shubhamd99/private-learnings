// https://leetcode.com/problems/walls-and-gates/

/**
 * Approach:
 * We need to fill every empty room with the distance to its nearest gate.
 *
 * Idea:
 * This is a Multi-source Breadth-First Search (BFS) problem. Instead of searching
 * FROM the empty rooms TO the gates (which is slow), we search FROM the gates TO
 * the empty rooms! We put all gates into a queue at distance 0. As we process
 * the queue, we check the 4 neighbors. If a neighbor is an empty room (denoted
 * by the massive INF number), we overwrite it with `currentRoomValue + 1`. We
 * then push that room into the queue to continue spreading. Because it is BFS,
 * the first time we step into an empty room, it is guaranteed to be the shortest
 * path from a gate.
 *
 * Steps:
 * 1. Define `INF` as 2147483647. Initialize a `queue` and a `head` pointer.
 * 2. Initial Map Scan: Loop through the grid. If a cell is a Gate (`0`), push
 *    its coordinates `[r, c]` into the queue.
 * 3. Setup Directions: `[[-1, 0], [1, 0], [0, -1], [0, 1]]` (Up, Down, Left, Right).
 * 4. Run Multi-source BFS: Loop while queue is not empty.
 *    - Grab the front room: `const [r, c] = queue[head++]`.
 *    - Loop through the 4 directions to find neighbors.
 *    - If the neighbor is out of bounds, or is a wall (`-1`), or has already
 *      been assigned a number (anything other than `INF`), we skip it.
 *    - If the neighbor is `INF` (an untouched empty room):
 *        - Write the distance on the floor! `rooms[nextR][nextC] = rooms[r][c] + 1`.
 *        - Push this newly numbered room to the back of the queue.
 * 5. Return nothing (modify the `rooms` grid in-place).
 *
 * Time Complexity: O(M * N)
 * - M is rows, N is columns. We scan the grid once to find the gates. During
 *   the BFS, each empty room is processed and assigned a distance exactly once.
 *
 * Space Complexity: O(M * N)
 * - The queue can hold up to O(M * N) elements in the worst case (if the grid
 *   is completely filled with gates).
 */
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  if (!rooms || rooms.length === 0) {
    return;
  }

  const ROWS = rooms.length;
  const COLS = rooms[0].length;
  const INF = 2147483647; // LeetCode's definition of an empty room

  const queue = [];
  let head = 0;

  // Scout the map to find all the Gates
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (rooms[r][c] === 0) {
        // We found a gate! Add it to the starting queue.
        // Note: We don't need to track 'steps' in the queue,
        // because we can just read the value written on the floor!
        queue.push([r, c]);
      }
    }
  }

  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  // Multi-source BFS (The ripple effect begins!)
  while (head < queue.length) {
    const [r, c] = queue[head];
    head++;

    // Try to step into all 4 neighboring rooms
    for (let i = 0; i < directions.length; i++) {
      const nextR = r + directions[i][0];
      const nextC = c + directions[i][1];

      // Is it out of bounds? SKIP
      // Did we fall off the top? OR
      // Did we fall off the bottom? OR
      // Did we fall off the left? OR
      // Did we fall off the right?
      if (nextR < 0 || nextR >= ROWS || nextC < 0 || nextC >= COLS) {
        continue;
      }

      // Is it a wall, or a room that someone else already reached?
      // We ONLY care if the room still has the original INF written on it.
      if (rooms[nextR][nextC] !== INF) {
        continue;
      }

      // SUCCESS! We reached a brand new empty room!
      // Write the new distance on the floor (my distance + 1)
      rooms[nextR][nextC] = rooms[r][c] + 1;

      // Put this room in the queue so it can spread the wave further
      queue.push([nextR, nextC]);
    }
  }
};
