"use client";

import { useState, useRef } from "react";
import { EmailField } from "@/components/FormFields/EmailField";
import { UrlField } from "@/components/FormFields/UrlField";
import { SelectField } from "@/components/FormFields/SelectField";
import { LongTextField } from "@/components/FormFields/LongTextField";

type FormState = "idle" | "submitting" | "success" | "error";

interface AccessibilityFormProps {
  invertText?: boolean;
}

export function AccessibilityForm({ invertText = false }: AccessibilityFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textColor = invertText ? "var(--color-black)" : "var(--color-white)";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/_form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString()
      });

      if (res.ok) {
        setFormState("success");
        formRef.current?.reset();
        setTimeout(() => {
          wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          wrapperRef.current?.focus();
        }, 50);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div ref={wrapperRef} tabIndex={-1} style={{ outline: "none" }}>
      {formState === "success" ? (
        <div
          className="flex flex-col gap-3 p-8 rounded text-center"
          role="status"
          aria-live="polite"
        >
          <p style={{ fontWeight: "var(--font-weight-medium)", color: textColor }}>
            {`Thank you — we'll be in touch!`}
          </p>
          <p style={{ opacity: 0.7, fontSize: "0.9em", color: textColor }}>
            {`Your message has been sent to info@heynova.io.`}
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          name="accessibility-form"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="flex flex-col gap-5"
          style={{ color: textColor }}
        >
          <input type="hidden" name="form-name" value="accessibility-form" />
          <input type="hidden" name="_subject" value="New website audit request" />
          <p hidden>
            <label>{`Don't fill this out:`} <input name="bot-field" /></label>
          </p>

          <h2>{`Claim your free review`}</h2>

          <UrlField
            name="website_url"
            label="Website URL"
            placeholder="https://"
            required
          />

          <EmailField
            name="email"
            label="Your email"
            placeholder="you@example.com"
            required
          />

          <SelectField
            name="website_maintainer"
            label="Who looks after your website?"
            placeholder="Select an option"
            options={[
              { label: "Our internal team", value: "internal" },
              { label: "An external developer or agency", value: "external" },
              { label: "A mix of both", value: "mix" },
              { label: "No one right now", value: "no_one" },
              { label: "Not sure", value: "not_sure" },
            ]}
          />

          <LongTextField
            name="notes"
            label="Anything else you'd like us to know?"
            rows={4}
          />

          {formState === "error" && (
            <p
              role="alert"
              aria-live="polite"
              style={{ fontSize: "0.875rem", color: "var(--color-red, #d70449)", margin: 0 }}
            >
              {`Something went wrong. Please try again or email us at info@heynova.io.`}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="btn btn-primary"
              style={{
                opacity: formState === "submitting" ? 0.6 : 1,
                cursor: formState === "submitting" ? "not-allowed" : "pointer",
              }}
            >
              {formState === "submitting" ? `Sending…` : `Send`}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}