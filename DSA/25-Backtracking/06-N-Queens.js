// https://leetcode.com/problems/n-queens/description/ - HARD

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no
// two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

// Each solution contains a distinct board configuration of the n-queens' placement,
// where 'Q' and '.' both indicate a queen and an empty space, respectively.

// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
// Input: n = 1
// Output: [["Q"]]

/**
 * Approach:
 * We need to find all valid placements of N queens on an NxN chessboard such
 * that no two queens attack each other.
 *
 * Idea:
 * We use Backtracking. We process the board row by row (which inherently
 * prevents horizontal attacks). For each row, we iterate through the columns.
 * To determine if a column is safe in O(1) time, we maintain three Sets:
 * `cols`, `posDiag`, and `negDiag`. The diagonals are tracked using the math
 * properties (r + c) and (r - c). If a spot is safe, we CHOOSE it (update the
 * Sets and place a 'Q' on the board), EXPLORE the next row, and then UN-CHOOSE
 * it (remove from Sets, replace with '.') so we can try the next column. When
 * we successfully place a Queen in the final row, we record the board state.
 *
 * Steps:
 * 1. Initialize `cols`, `posDiag`, and `negDiag` Sets.
 * 2. Create the `board` as an array of N arrays, filled with '.'.
 * 3. Initialize `result = []`.
 * 4. Create `backtrack(row)`:
 *    - Base Case: If `row === n`, we placed all Queens! Format the board array
 *      into strings and push to `result`. Return.
 *    - Loop `c` (column) from 0 to `n - 1`:
 *        - Danger Check: If `cols` has `c`, OR `posDiag` has `row + c`, OR
 *          `negDiag` has `row - c`, this spot is attacked! `continue`.
 *        - CHOOSE: Add to all 3 Sets. Update `board[row][c] = 'Q'`.
 *        - EXPLORE: `backtrack(row + 1)`
 *        - UN-CHOOSE: Delete from all 3 Sets. Update `board[row][c] = '.'`.
 * 5. Call `backtrack(0)` to start at the first row.
 * 6. Return `result`.
 *
 * Time Complexity: O(N!)
 * - In the worst case, we check N possibilities for the first row, N-1 for the
 *   second, N-2 for the third, etc. This bounded by N factorial.
 *
 * Space Complexity: O(N^2)
 * - To store the board (N x N) and the Sets which hold at most O(N) elements.
 *   The recursion stack also goes O(N) deep.
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const cols = new Set();
  const posDiag = new Set(); // (r + c)
  const negDiag = new Set(); // (r - c)

  const result = [];

  // Create an NxN board filled with '.'
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill("."));
  }

  function backtrack(row) {
    // BASE CASE: Did we successfully place a Queen in every row?
    if (row === n) {
      // JavaScript quirk: We need to turn our array of arrays
      // [['.', 'Q', '.'], [...]] into an array of strings [".Q.", "..."]
      const formattedBoard = board.map((r) => r.join(""));
      result.push(formattedBoard);
      return;
    }

    // Try placing a Queen in every column of the current row
    for (let c = 0; c < n; c++) {
      // Is this spot in the Danger zone?
      if (cols.has(c) || posDiag.has(row + c) || negDiag.has(row - c)) {
        continue; // Attacked! Skip to the next column.
      }

      // 1. CHOOSE: Place the Queen and declare the new Danger Zones
      cols.add(c);
      posDiag.add(row + c);
      negDiag.add(row - c);
      board[row][c] = "Q";

      // 2. EXPLORE: Move down to the next row
      backtrack(row + 1);

      // 3. UN-CHOOSE: Take the Queen off the board and clear her Danger Zones
      // so we can try placing her in the next column instead!
      cols.delete(c);
      posDiag.delete(row + c);
      negDiag.delete(row - c);
      board[row][c] = ".";
    }
  }

  // Start at row 0
  backtrack(0);

  return result;
};

// --- EXAMPLE TRACE: 4-Queens ---

// Input: n = 4
// Board is 4x4.

// Initial Call: backtrack(row: 0)

// ---------------------------------------------------------
// 1. ROW 0: CHOOSE Col 0 -> [Q, ., ., .]
// ---------------------------------------------------------
// - Danger Zones Added: Col 0, PosDiag (0+0=0), NegDiag (0-0=0)
// - EXPLORE: Call backtrack(row: 1)

//     -----------------------------------------------------
//     2. ROW 1
//     -----------------------------------------------------
//     - Col 0: Attacked! (In Danger Col 0)
//     - Col 1: Attacked! (In Danger NegDiag 1-1=0)
//     - Col 2: SAFE! -> [., ., Q, .]

//     - CHOOSE: Place Queen at [1, 2].
//     - Danger Zones Added: Col 2, PosDiag (1+2=3), NegDiag (1-2=-1)
//     - EXPLORE: Call backtrack(row: 2)

//         -------------------------------------------------
//         3. ROW 2
//         -------------------------------------------------
//         - Col 0: Attacked! (Col 0)
//         - Col 1: Attacked! (PosDiag 2+1=3)
//         - Col 2: Attacked! (Col 2)
//         - Col 3: Attacked! (NegDiag 2-3=-1)

//         - OH NO! A DEAD END! Every single square is attacked.
//         - The loop finishes without finding a safe spot. Return!
//         -------------------------------------------------

//     - The computer just realized placing the Queen at [1, 2] was a mistake!
//     - UN-CHOOSE: Remove Queen from [1, 2] and clear her Danger Zones.

//     - Col 3: SAFE! -> [., ., ., Q]

//     - CHOOSE: Place Queen at [1, 3].
//     - EXPLORE: Call backtrack(row: 2)

//         -------------------------------------------------
//         4. ROW 2
//         -------------------------------------------------
//         - Col 0: Attacked!
//         - Col 1: SAFE! -> [., Q, ., .]

//         - CHOOSE: Place Queen at [2, 1].
//         - EXPLORE: Call backtrack(row: 3)

//             ---------------------------------------------
//             5. ROW 3 (The Final Row)
//             ---------------------------------------------
//             - Col 0: Attacked!
//             - Col 1: Attacked!
//             - Col 2: Attacked!
//             - Col 3: Attacked!

//             - ANOTHER DEAD END! Return!
//             ---------------------------------------------

//         - UN-CHOOSE: Remove Queen from [2, 1].
//         - Col 2: Attacked!
//         - Col 3: Attacked!
//         - Loop finishes. Return!
//         -------------------------------------------------

//     - UN-CHOOSE: Remove Queen from [1, 3].
//     - Loop finishes. Return!
//     -----------------------------------------------------

// - The computer just realized placing the very first Queen at [0, 0] makes the game impossible to win!
// - UN-CHOOSE: Remove Queen from [0, 0] and clear her Danger Zones.

// ---------------------------------------------------------
// 6. ROW 0: CHOOSE Col 1 -> [., Q, ., .]  <-- Outer loop moves forward!
// ---------------------------------------------------------
// - EXPLORE: Call backtrack(row: 1)

//     - Col 0: Attacked!
//     - Col 1: Attacked!
//     - Col 2: Attacked!
//     - Col 3: SAFE! -> [., ., ., Q]

//     - CHOOSE: Place Queen at [1, 3].
//     - EXPLORE: Call backtrack(row: 2)

//         - Col 0: SAFE! -> [Q, ., ., .]

//         - CHOOSE: Place Queen at [2, 0].
//         - EXPLORE: Call backtrack(row: 3)

//             - Col 0: Attacked!
//             - Col 1: Attacked!
//             - Col 2: SAFE! -> [., ., Q, .]

//             - CHOOSE: Place Queen at [3, 2].
//             - EXPLORE: Call backtrack(row: 4)

//                 - BASE CASE HIT! row === 4!
//                 - We placed all 4 Queens!
//                 - Save this board to RESULTS!
//                 - Return!

//             - UN-CHOOSE: Remove Queen from [3, 2].

//     - ... The algorithm continues exploring the rest of the board ...
