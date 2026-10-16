"use client";

import { useEffect } from "react";

import { ErtkazLogo } from "@/components/brand/ertkaz-logo";

export function RootLocaleGateway() {
  useEffect(() => {
    let stored: string | null = null;

    try {
      stored = window.localStorage.getItem("ertkaz-locale");
    } catch {
      // Continue with the browser language when storage is unavailable.
    }

    const preferred = stored === "ar" || stored === "en"
      ? stored
      : navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";

    const redirectTimer = window.setTimeout(() => {
      window.location.replace(`/${preferred}/`);
    }, 4000);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  return (
    <main className="locale-gateway" aria-busy="true">
      <div className="locale-gateway__brand">
        <ErtkazLogo priority />
      </div>
      <p role="status">Loading ERTKAZ GROUP</p>
      <div className="locale-gateway__progress" aria-hidden="true">
        <span />
      </div>
    </main>
  );
}
