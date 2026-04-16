# Global Toast System

Globally triggerable toast system with auto-hide, custom duration, color, icon, manual close, and animated enter/exit. No third-party libraries.

<img src="./preview/01.png" width="300" />

---

## How it works

```
useToast().showToast(options)
        |
        v
ToastProvider  ──────────────────────────  adds item to toasts[] (max 5)
        |
        v
ToastContainer  ─────────────────────────  maps toasts[] → <AnimatedToast>
        |
        v
AnimatedToast  ──────────────────────────  plays enter/exit animation
        |
        v
Toast  ──────────────────────────────────  renders UI + starts auto-hide timer
        |
        v
onClose  ────────────────────────────────  AnimatedToast plays exit, then removes from state
```

---

## Component structure

```
ToastProvider  (Context + queue state)
  └── children
  └── ToastContainer  (absolute positioned, bottom-right)
        └── AnimatedToast  (opacity + translateY animation wrapper)
              └── Toast  (UI: icon | message | ✕ button)
```

---

## File structure

```
src/
  Toast/
    constants.ts       MAX_TOASTS, DEFAULT_DURATION, TOAST_COLORS
    styles.ts          toastStyles, animatedToastStyles, containerStyles
    Toast.tsx          UI + auto-hide timer
    AnimatedToast.tsx  enter/exit animation wrapper
    ToastContainer.tsx renders stacked toasts
    ToastContext.tsx   Context + Provider + queue logic
    useToast.ts        public hook
    index.ts           barrel export
  styles.ts            ToastDemo styles
  ToastDemo.tsx        demo screen
App.tsx
```

---

## Usage

Wrap your app in `ToastProvider`, then call `useToast()` from any component:

```tsx
// App.tsx
import { ToastProvider } from './src/Toast';

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// AnyComponent.tsx
import { useToast } from './src/Toast';

const { showToast } = useToast();

showToast({
  message: 'File saved!',
  color: '#2e7d32',
  icon: '✓',
  duration: 2000,
});
```

---

## Toast options

| Prop       | Type     | Default     | Description                       |
| ---------- | -------- | ----------- | --------------------------------- |
| `message`  | `string` | required    | Text displayed in the toast       |
| `duration` | `number` | `3000`      | Auto-hide delay in ms             |
| `color`    | `string` | `'#323232'` | Background color                  |
| `icon`     | `string` | —           | Emoji or short string on the left |

---

## Animation

| Phase | opacity | translateY | Duration |
| ----- | ------- | ---------- | -------- |
| Enter | `0 → 1` | `20 → 0`   | 200ms    |
| Exit  | `1 → 0` | `0 → -20`  | 150ms    |

`useNativeDriver: true` — both `opacity` and `transform` are GPU-composited, no JS bridge per frame.

---

## Key concepts

**No prop drilling** — `ToastProvider` stores the queue in Context. Any component anywhere in the tree calls `useToast()` to trigger a toast.

**Queue management** — `showToast` is wrapped in `useCallback` for stable identity. New toasts are blocked when `MAX_TOASTS` (5) is reached. Each toast removes itself from the array by id on close.

**Animated close** — `AnimatedToast` intercepts `onClose`, plays the exit animation, and only removes the toast from state after `.start()` completes — so the toast stays visible during its exit.

**Auto-hide timer** — started once on mount inside `Toast` with a `useRef`-guarded `setTimeout`. Calls `handleClose` (not `onClose` directly), so the exit animation always runs regardless of whether the close is manual or automatic.
