"use client";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

export function CalendlyButton() {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootEl(document.body);
  }, []);

  if (!rootEl) return null;

  return (
    <PopupButton
      url="https://calendly.com/hey-nova/free-consult"
      rootElement={rootEl}
      text="Book a Chat"
      className="btn btn-primary"
    />
  );
}
