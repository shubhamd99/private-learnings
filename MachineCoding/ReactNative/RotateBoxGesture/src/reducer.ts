import { AppState, Action } from './types';

// Both `past` and `future` are stacks with the top at the END of the array.
// past  = [oldest … most-recent]   → pop/push at index -1
// future = [oldest-redo … next-redo] → pop/push at index -1
//
// Visualisation:
//   A → B → C (current) → D → E
//   past   = [A, B]   (C is current)
//   future = [E, D]   (D is next redo, at top = end)

export const initialState: AppState = {
  current: {
    x: 0, // horizontal position (px from center)
    y: 0, // vertical position (px from center)
    scale: 1, // 1 = original size, 2 = double, 0.5 = half
    rotation: 0, // radians (0 = upright, Math.PI = 180°)
  },
  past: [], // undo stack — grows as gestures are committed
  future: [], // redo stack — grows as undos are performed, wiped on new gesture
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // Gesture committed: push old current onto past, set new current, wipe future.
    // Wiping future is critical — any new action after an undo discards the redo branch.
    case 'ADD':
      return {
        past: [...state.past, state.current], // push to end
        current: action.payload,
        future: [],
      };

    // Undo: pop top of past → current, push old current onto top of future.
    // Both operations are at the END of their array.
    case 'UNDO': {
      if (state.past.length === 0) return state; // nothing to undo
      const prev = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1), // pop from end
        current: prev,
        future: [...state.future, state.current], // push to end
      };
    }

    // Redo: pop top of future → current, push old current onto top of past.
    // Both operations are at the END of their array — consistent with UNDO.
    case 'REDO': {
      if (state.future.length === 0) return state; // nothing to redo
      const next = state.future[state.future.length - 1];
      return {
        past: [...state.past, state.current], // push to end
        current: next,
        future: state.future.slice(0, -1), // pop from end
      };
    }

    default:
      return state;
  }
}
