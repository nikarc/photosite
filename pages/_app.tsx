import "styles/reset.css";
import "styles/fonts.css";
import "primeicons/primeicons.css";
import "styles/globals.scss";
import type { AppProps } from "next/app";
import useTheme from "hooks/use-theme";
import theme from "styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import ModalContext from "src/contexts/modal";
import Modal from "components/modal";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useTheme(theme, true);

  const [modalActive, setModalActive] = useState(false);
  const [modalChildren, setModalChildren] = useState<ReactNode | null>(null);

  useEffect(() => {
    if (window.location.pathname === "/") {
      document.documentElement.style.setProperty("--scroll-margin", "0");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider
        value={{
          modalActive,
          setModalActive,
          children: modalChildren,
          setModalChildren,
        }}
      >
        <Component {...pageProps} />
        <Modal />
      </ModalContext.Provider>
    </QueryClientProvider>
  );
}
