import "../styles/globals.css";
import type { AppProps } from "next/app";
import useTheme from "hooks/use-theme";
import theme from "styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useTheme(theme, true);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
