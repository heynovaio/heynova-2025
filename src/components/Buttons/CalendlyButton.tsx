"use client";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

interface CalendlyButtonProps {
  text: string;
  buttonClass: "btn-primary" | "btn-secondary";
}
export function CalendlyButton({ text, buttonClass }: CalendlyButtonProps) {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootEl(document.body);
  }, []);

  if (!rootEl) return null;

  return (
    <PopupButton
      url="https://calendly.com/hey-nova/free-consult"
      rootElement={rootEl}
      text={text}
      className={`btn ${buttonClass}`}
    />
  );
}
