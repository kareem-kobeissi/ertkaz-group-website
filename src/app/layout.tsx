import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "ERTKAZ GROUP — Strategy Today. Impact Tomorrow.",
  description: "ERTKAZ GROUP is a business consulting and strategic advisory firm.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
