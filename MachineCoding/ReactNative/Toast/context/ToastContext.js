import React, { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { DEFAULT_DURATION, MAX_TOASTS } from "../constants/toast";

const ToastContext = createContext(null);

// Prefer an incrementing id over Date.now() because multiple toasts can be
// created within the same millisecond during rapid taps.
let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (options) => {
      const id = ++nextId;

      setToasts((prev) => {
        if (prev.length >= MAX_TOASTS) return prev;

        const duration = options.duration || DEFAULT_DURATION;
        const extraDelay = prev.length * 1000;
        const visibleFor = duration + extraDelay;

        setTimeout(() => {
          removeToast(id);
        }, visibleFor);

        return [...prev, { ...options, id, visibleFor }];
      });
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
