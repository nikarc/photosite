import { MutableRefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const clickCallback = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", clickCallback);

    return () => document.removeEventListener("click", clickCallback);
  }, [ref, callback]);
}
