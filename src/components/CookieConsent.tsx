"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "heynova-consent-v1";
const HEADING_ID = "cookie-consent-title";

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

  const params = {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };

  const w = window as typeof window & {
    gtag?: (...args: GtagConsentArgs) => void;
    dataLayer?: unknown[];
  };

  // Common path: the ga-bootstrap script (beforeInteractive) defined gtag
  // before any React effect ran.
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", params);
    return;
  }

  // Fallback: queue directly into dataLayer. gtag.js replays queued
  // commands when it loads, so this works even if the bootstrap script
  // hasn't executed yet for some reason.
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(["consent", "update", params]);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState("en-ca");
  const sectionRef = useRef<HTMLElement>(null);
  const shouldFocusOnShowRef = useRef(false);

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
      shouldFocusOnShowRef.current = true;
      setVisible(true);
    };

    return () => {
      delete window.resetCookieConsent;
    };
  }, []);

  // Move focus to the banner when the user re-opens it via resetCookieConsent.
  // We deliberately do NOT focus on initial appearance — yanking focus on page
  // load would disrupt screen reader users mid-scan.
  useEffect(() => {
    if (visible && shouldFocusOnShowRef.current) {
      sectionRef.current?.focus();
      shouldFocusOnShowRef.current = false;
    }
  }, [visible]);

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
      ref={sectionRef}
      role="region"
      aria-labelledby={HEADING_ID}
      tabIndex={-1}
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
        id={HEADING_ID}
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
