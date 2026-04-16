import { ToastOptions, useToastContext } from './ToastContext';

export const useToast = () => {
  const { showToast } = useToastContext();
  return { showToast } as { showToast: (opts: ToastOptions) => void };
};
