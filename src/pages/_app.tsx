import { AppProps } from "next/app";
import { AppProvider } from "@/providers/AppProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>;
}
