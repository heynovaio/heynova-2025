"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "heynova-consent-v1";

type Choice = "granted" | "denied";

type GtagConsentArgs = [
  "consent",
  "update",
  {
    ad_storage: "granted" | "denied";
    ad_user_data: "granted" | "denied";
    ad_personalization: "granted" | "denied";
    analytics_storage: "granted" | "denied";
  },
];

declare global {
  interface Window {
    resetCookieConsent?: () => void;
  }
}

function applyConsent(choice: Choice): void {
  if (typeof window === "undefined") return;
  const gtag = (
    window as unknown as { gtag?: (...args: GtagConsentArgs) => void }
  ).gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState("en-ca");

  useEffect(() => {
    const pathLocale = window.location.pathname.split("/")[1];
    if (pathLocale === "fr-ca") setLocale("fr-ca");

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode, etc.) — show the banner
    }

    if (stored === "granted" || stored === "denied") {
      applyConsent(stored);
    } else {
      setVisible(true);
    }

    window.resetCookieConsent = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setVisible(true);
    };

    return () => {
      delete window.resetCookieConsent;
    };
  }, []);

  const handleChoice = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 100,
        maxWidth: 640,
        margin: "0 auto",
        padding: "20px 24px",
        background: "var(--color-midnight, #0d0e2c)",
        color: "var(--color-white, #ffffff)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 16,
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 8,
          fontSize: "1.125rem",
          fontWeight: 700,
        }}
      >
        Cookies on this site
      </h2>
      <p style={{ margin: 0, marginBottom: 16, fontSize: "0.95rem" }}>
        We use Google Analytics to understand how visitors use this site. No
        analytics cookies are set until you choose Accept. You can change your
        choice at any time.{" "}
        <a
          href={`/${locale}/privacy-policy`}
          style={{
            color: "var(--color-aqua, #97e1e5)",
            textDecoration: "underline",
          }}
        >
          Read our privacy policy
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleChoice("granted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleChoice("denied")}
        >
          Decline
        </button>
      </div>
    </section>
  );
}
