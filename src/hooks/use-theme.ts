import { useLayoutEffect, useEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type Theme = Record<string, string>;

export default function useTheme(theme: Theme) {
  useIsomorphicLayoutEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }, [theme]);
}
