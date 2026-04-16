import React, { createContext, useCallback, useContext, useState } from 'react';
import { ToastContainer } from './ToastContainer';
import { MAX_TOASTS } from './constants';

export interface ToastOptions {
  message: string;
  duration?: number; // ms, default 3000
  color?: string; // background color
  icon?: string; // emoji / short string shown left of message
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    setToasts(prev => {
      if (prev.length >= MAX_TOASTS) return prev;
      return [...prev, { ...options, id: ++nextId }];
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
};
