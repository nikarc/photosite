import "../styles/globals.css";
import type { AppProps } from "next/app";
import useTheme from "hooks/use-theme";
import theme from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  useTheme(theme);

  return <Component {...pageProps} />;
}
