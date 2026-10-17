"use client";

import { useEffect } from "react";

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

    window.location.replace(`/${preferred}/`);
  }, []);

  return null;
}
