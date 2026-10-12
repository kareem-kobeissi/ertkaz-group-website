"use client";

import { useEffect } from "react";

export function RootLocaleGateway() {
  useEffect(() => {
    const stored = window.localStorage.getItem("ertkaz-locale");
    const preferred = stored === "ar" || stored === "en"
      ? stored
      : navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";

    window.location.replace(`/${preferred}/`);
  }, []);

  return (
    <main className="locale-gateway">
      <div className="locale-gateway__brand" aria-label="ERTKAZ GROUP">
        <span>ERTKAZ</span><span>GROUP</span><i aria-hidden="true" />
      </div>
      <p>Choose your language · اختر لغتك</p>
      <div className="locale-gateway__links">
        <a href="/en/">English</a>
        <a href="/ar/" lang="ar" dir="rtl">العربية</a>
      </div>
    </main>
  );
}
