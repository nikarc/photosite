import { Theme } from "hooks/use-theme";

const WINDOW_SIZES = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  largeDesktop: 1440,
};

const baseTheme = {
  "speed-normal": "0.3s",
  "container-max-width": `${WINDOW_SIZES.largeDesktop}px`,
  "breakpoint-mobile": `${WINDOW_SIZES.mobile}px`,
  "breakpoint-tablet": `${WINDOW_SIZES.tablet}px`,
  "breakpoint-desktop": `${WINDOW_SIZES.desktop}px`,
  "breakpoint-large-desktop": `${WINDOW_SIZES.largeDesktop}px`,
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
