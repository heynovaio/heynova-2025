"use client";
import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef } from "react";

interface CalendlyButtonProps {
  text: string | KeyTextField;
  buttonClass: "btn-primary" | "btn-secondary";
}

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: Record<string, unknown>) => void;
    };
  }
}

export function CalendlyButton({ text, buttonClass }: CalendlyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      // Create link element for Calendly with data-calendly-inline-widget
      const link = document.createElement("a");
      link.href = "https://calendly.com/hey-nova/free-consult?hide_event_type_details=1&hide_gdpr_block=1";
      link.className = `btn ${buttonClass}`;
      link.setAttribute("data-calendly-url", "https://calendly.com/hey-nova/free-consult?hide_event_type_details=1&hide_gdpr_block=1");
      link.textContent = text ?? "";
      link.style.opacity = "0";
      link.style.transition = "opacity 0.5s ease-out";

      // Clear container and add link
      containerRef.current!.innerHTML = "";
      containerRef.current!.appendChild(link);

      // Fade in
      setTimeout(() => {
        link.style.opacity = "1";
      }, 50);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [text, buttonClass]);

  return (
    <div 
      ref={containerRef} 
      suppressHydrationWarning
      style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
    />
  );
}
