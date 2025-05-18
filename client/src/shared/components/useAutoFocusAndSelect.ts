import { useEffect, RefObject } from "react";

export const useAutoFocusAndSelect = (
  ref: RefObject<HTMLInputElement | null>,
  open: boolean
) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const input = ref.current;
        if (input) {
          const length = input.value.length;
          input.focus();
          input.setSelectionRange(length, length);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, ref]);
};
