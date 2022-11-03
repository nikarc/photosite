import { useLayoutEffect, useEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export enum ThemeMode {
  Dark = "dark",
  Light = "light",
}

export type Theme = {
  [key in ThemeMode]: Record<string, string>;
};

export default function useTheme(theme: Theme, darkMode = false) {
  useIsomorphicLayoutEffect(() => {
    const mode = darkMode ? ThemeMode.Dark : ThemeMode.Light;
    const _theme = theme[mode];

    if (!_theme) return;

    for (const key in _theme) {
      if (!_theme?.[key]) continue;

      document.documentElement.style.setProperty(`--${key}`, _theme[key]);
    }
  }, [theme]);
}
