# Controlled vs. Uncontrolled Inputs (React)

A highly educational machine coding round question comparing **Controlled Components** and **Uncontrolled Components** side-by-side.

## Concept Summary

| Aspect              | Controlled Component                           | Uncontrolled Component                         |
| :------------------ | :--------------------------------------------- | :--------------------------------------------- |
| **Source of Truth** | React State (`useState`)                       | DOM (`useRef`)                                 |
| **Performance**     | Triggers re-render on every keystroke          | Avoids re-renders; DOM handles value           |
| **Validation**      | Real-time (immediate visual feedback)          | Checked on submission (or using DOM listeners) |
| **Code Verbosity**  | High (requires `value` binding and `onChange`) | Low (only requires a `ref` link)               |

## Implementation Details

1. **Re-render Counters:**
   Each form displays a live counter showing how many times it has been rendered. You'll notice the **Controlled Form** re-renders with every keypress, while the **Uncontrolled Form** does not.

2. **Validation:**
   - **Controlled:** Validated in the change handler so error messages update as the user types.
   - **Uncontrolled:** Validated in the submit handler when extracting data using `ref.current.value`.
