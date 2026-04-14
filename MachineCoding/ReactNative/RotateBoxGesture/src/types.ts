// A single snapshot of the box's visual state.
// Every gesture commit saves one of these.
export interface BoxState {
  x: number;
  y: number;
  scale: number;
  rotation: number; // radians
}

// The full undo/redo stack held in useReducer.
// - current: what the box looks like right now
// - past:    stack of previous states (undo pops from here)
// - future:  stack of undone states  (redo pops from here)
export interface AppState {
  current: BoxState;
  past: BoxState[];
  future: BoxState[];
}

export type Action =
  | { type: 'PUSH_STATE'; payload: BoxState } // gesture ended → save current, clear future
  | { type: 'UNDO' } // pop past → current, push current → future
  | { type: 'REDO' }; // pop future → current, push current → past
