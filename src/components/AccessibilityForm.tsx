"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function AccessibilityForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (res.ok) {
        setFormState("success");
        formRef.current?.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div
        className="flex flex-col gap-3"
        style={{
          padding: "2rem",
          borderRadius: "var(--border-radius, 0.5rem)",
          background: "var(--color-background-secondary, #f9fafb)",
          border: "1px solid var(--color-border, #e5e7eb)",
          textAlign: "center",
        }}
      >
        <p style={{ fontWeight: "var(--font-weight-medium, 500)", color: "var(--color-text-primary)" }}>
          {`Thank you — we'll be in touch!`}
        </p>
        <p style={{ opacity: 0.7, fontSize: "0.9em", color: "var(--color-text-primary)" }}>
          {`Your message has been sent to info@heynova.io.`}
        </p>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: "var(--border-radius, 0.375rem)",
    border: "1px solid var(--color-border, #d1d5db)",
    background: "var(--color-background-primary, #fff)",
    color: "var(--color-text-primary, inherit)",
    fontSize: "1rem",
    lineHeight: "1.5",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "var(--font-weight-medium, 500)",
    color: "var(--color-text-primary)",
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      name="website-audit"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="flex flex-col gap-5 max-w-3xl"
    >
      <input type="hidden" name="form-name" value="website-audit" />
      <input type="hidden" name="_subject" value="New website audit request" />
      <p hidden>
        <label>
          {`Don't fill this out:`} <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="website_url" style={labelStyle}>
          {`Website URL`} <span aria-hidden="true" style={{ color: "var(--color-primary, currentColor)" }}>*</span>
        </label>
        <input
          id="website_url"
          type="url"
          name="website_url"
          placeholder="https://"
          required
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>
          {`Your email`} <span aria-hidden="true" style={{ color: "var(--color-primary, currentColor)" }}>*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="website_maintainer" style={labelStyle}>
          {`Who looks after your website?`}
        </label>
        <div style={{ position: "relative" }}>
          <select
            id="website_maintainer"
            name="website_maintainer"
            defaultValue=""
            style={{
              ...fieldStyle,
              appearance: "none",
              paddingRight: "2.5rem",
              cursor: "pointer",
            }}
          >
            <option value="" disabled>{`Select an option`}</option>
            <option value="internal">{`Our internal team`}</option>
            <option value="external">{`An external developer or agency`}</option>
            <option value="mix">{`A mix of both`}</option>
            <option value="no_one">{`No one right now`}</option>
            <option value="not_sure">{`Not sure`}</option>
          </select>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              opacity: 0.5,
              fontSize: "0.75rem",
            }}
          >
            {`▾`}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="notes" style={labelStyle}>
          {`Anything else you'd like us to know?`}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>

      {formState === "error" && (
        <p
          role="alert"
          style={{
            fontSize: "0.875rem",
            color: "var(--color-error, #dc2626)",
            margin: 0,
          }}
        >
          {`Something went wrong. Please try again or email us at info@heynova.io.`}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn btn-primary"
          style={{ opacity: formState === "submitting" ? 0.6 : 1, cursor: formState === "submitting" ? "not-allowed" : "pointer" }}
        >
          {formState === "submitting" ? `Sending…` : `Send`}
        </button>
      </div>
    </form>
  );
}