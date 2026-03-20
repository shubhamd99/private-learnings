// ARIA ATTRIBUTES USED IN THIS FILE
//
// aria-label     → Provides an accessible name for elements with no visible text (e.g. icon buttons).
//                  Used on each empty cell button so screen readers announce "Mark cell 4 as X" instead of just "button".
//
// aria-hidden    → Hides an element from the accessibility tree so screen readers skip it entirely.
//                  Used on the <span> showing X/O to avoid double-reading; the live region handles the announcement.
//
// aria-live      → Marks a region so screen readers auto-announce its content changes without a focus change.
//                  "polite" = announces after user action. Used on the status div so moves are read aloud automatically.


// Tic-tac-toe is a game for two players who take turns making space in a three-by-three grid
// with X or O. The player who succeeds in playing three of their marks in a horizontal,
// vertical, or diagonal row is the winner.

// Requirements
// Players can take turns to place an X or a O on the board.
// A player wins if three of their marks are in a horizontal, vertical, or diagonal row.
// Display the current game status at the top: whose turn it is, winner (if any), or draw.
// Add a "Reset" button to allow the game to be restarted at any time.

import { useState } from "react";

// This is the win condition map for a Tic Tac Toe board.
// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8

// List of cell indices that are 3-in-a-row.
const CELLS_IN_A_LINE = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Pick one line, say the top row [0, 1, 2]
// x = 0, y = 1, z = 2
// Check:
// board[0] = 'X'
// board[1] = 'O'
// board[2] = 'X'
// Are they all the same? No. Move to next line.

// Determine if there's a winner for the board.
function determineWinner(board) {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_A_LINE[i];
    // Determine if the cells in a line have the same mark.
    if (board[x] !== null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }

  // No winner yet.
  return null;
}

function Cell({ index, disabled, mark, turn, onClick }) {
  return (
    <button
      aria-label={mark == null ? `Mark cell ${index} as ${turn}` : undefined}
      className="cell"
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setIsXPlaying] = useState(true);

  const winner = determineWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  }

  function getStatusMessage() {
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // All cells have been filled up
    if (!board.includes(null)) {
      return `It's a draw!`;
    }

    return `Player ${xIsPlaying ? "X" : "O"} turn`;
  }

  const onHandle = (cellIndex, turn) => {
    const newBoard = board.slice();
    newBoard[cellIndex] = turn;
    setBoard(newBoard);
    setIsXPlaying(!xIsPlaying);
  };

  return (
    <div className="app">
      <div aria-live="polite">{getStatusMessage()}</div>
      <div className="board">
        {board.map((_, cellIndex) => {
          const turn = xIsPlaying ? "X" : "O";
          return (
            <Cell
              key={cellIndex}
              disabled={board[cellIndex] != null || winner != null}
              index={cellIndex}
              mark={board[cellIndex]}
              turn={turn}
              onClick={onHandle.bind(this, cellIndex, turn)}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          if (winner == null) {
            // Confirm whether to reset the game.
            const confirm = window.confirm(
              "Are you sure you want to reset the game?",
            );
            if (!confirm) {
              return;
            }
          }

          onReset();
        }}
      >
        Reset
      </button>
    </div>
  );
}
