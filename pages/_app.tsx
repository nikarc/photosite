import "styles/reset.css";
import "styles/globals.css";
import { Playfair_Display } from "@next/font/google";
import type { AppProps } from "next/app";
import useTheme from "hooks/use-theme";
import theme from "styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const playfairDisplay = Playfair_Display();
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useTheme(theme, true);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={playfairDisplay.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
