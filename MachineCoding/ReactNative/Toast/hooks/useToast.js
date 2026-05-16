import { useToastContext } from "../context/ToastContext";

export default function useToast() {
  const { showToast } = useToastContext();
  return { showToast };
}
