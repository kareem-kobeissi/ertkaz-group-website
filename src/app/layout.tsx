import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "ERTKAZ GROUP — Strategy Today. Impact Tomorrow.",
  description: "ERTKAZ GROUP is a business consulting and strategic advisory firm.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
