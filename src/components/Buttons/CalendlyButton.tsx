"use client";
import { KeyTextField } from "@prismicio/client";
import { trackEvent } from "@/utils/analytics";

interface CalendlyButtonProps {
  text: string | KeyTextField;
  buttonClass: "btn-primary" | "btn-secondary";
  location?: string;
}

const CALENDLY_URL = "https://calendly.com/hey-nova/free-consult";

export function CalendlyButton({
  text,
  buttonClass,
  location = "site",
}: CalendlyButtonProps) {
  const visibleText = typeof text === "string" ? text : (text ?? "");

  const href = (() => {
    const url = new URL(CALENDLY_URL);
    url.searchParams.set("utm_source", "heynova.io");
    url.searchParams.set("utm_medium", "cta");
    url.searchParams.set("utm_campaign", location);
    return url.toString();
  })();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${buttonClass}`}
      onClick={() => {
        trackEvent("book_call_click", {
          cta_text: visibleText,
          cta_location: location,
          destination: CALENDLY_URL,
        });
      }}
    >
      <span>{visibleText}</span>
      <svg
        aria-hidden="true"
        focusable="false"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          marginLeft: "0.4em",
          verticalAlign: "-0.1em",
          display: "inline-block",
        }}
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
