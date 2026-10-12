import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import "@fontsource-variable/noto-sans-arabic";
import "../globals.css";

export const metadata: Metadata = {
  title: "ERTKAZ GROUP",
  description: "Choose the English or Arabic ERTKAZ GROUP website.",
};

export default function RootGatewayLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
