import { Html, Head, Main, NextScript } from "next/document";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Goal-GG" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
