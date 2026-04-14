import { AppState, Action } from './types';

export const initialState: AppState = {
  current: { x: 0, y: 0, scale: 1, rotation: 0 },
  past: [],
  future: [],
};

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // Gesture committed: save old current to past, set new current, wipe future.
    // Wiping future is critical — any new action after an undo must discard the redo branch.
    case 'PUSH_STATE':
      return {
        past: [...state.past, state.current],
        current: action.payload,
        future: [],
      };

    // Undo: move current → top of future, pop last item from past → current.
    case 'UNDO': {
      if (state.past.length === 0) return state; // nothing to undo
      const prev = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        current: prev,
        future: [state.current, ...state.future],
      };
    }

    // Redo: move current → bottom of past, pop first item from future → current.
    case 'REDO': {
      if (state.future.length === 0) return state; // nothing to redo
      const next = state.future[0];
      return {
        past: [...state.past, state.current],
        current: next,
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}
