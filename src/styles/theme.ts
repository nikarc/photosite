import { Theme } from "hooks/use-theme";

const baseTheme = {
  "speed-normal": "0.3s",
};

const theme: Theme = {
  dark: {
    ...baseTheme,
    "color-primary": "white",
    "color-background": "black",
  },
  light: {
    ...baseTheme,
  },
};

export default theme;
