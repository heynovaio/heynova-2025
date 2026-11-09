"use client";

import { useRef, useState } from "react";
import { ShortTextField } from "@/components/FormFields/ShortTextField";
import { EmailField } from "@/components/FormFields/EmailField";
import { LongTextField } from "@/components/FormFields/LongTextField";
import { trackEvent } from "@/utils/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

/** General contact form, submitted to Netlify Forms like the audit form. */
export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/_form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          data as unknown as Record<string, string>,
        ).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setFormState("success");
      trackEvent("generate_lead", {
        form_name: "contact",
        form_destination: "/_form.html",
      });
      formRef.current?.reset();
      setTimeout(() => statusRef.current?.focus(), 50);
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-[1.5rem] bg-midnight/55 border border-aqua/30 p-8 text-white"
      >
        <p className="font-bold text-xl">Thanks, your message is on its way.</p>
        <p className="text-purple-lt">
          We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      aria-labelledby="contact-form-heading"
      className="flex flex-col gap-5 rounded-[1.5rem] bg-midnight/55 border border-aqua/30 p-6 md:p-10 text-white"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="_subject" value="New message from heynova.io" />
      <p hidden>
        <label>
          {`Don't fill this out:`} <input name="bot-field" />
        </label>
      </p>
      <h2 id="contact-form-heading" className="text-aqua">
        Send us a message
      </h2>
      <ShortTextField name="name" label="Your name" required />
      <EmailField
        name="email"
        label="Your email"
        placeholder="you@example.com"
        required
      />
      <ShortTextField name="organization" label="Organization (optional)" />
      <LongTextField
        name="message"
        label="What's getting in the way?"
        rows={5}
        required
      />
      {formState === "error" && (
        <p role="alert" className="text-white m-0">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:info@heynova.io" className="text-aqua underline">
            info@heynova.io
          </a>
          .
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn btn-primary disabled:opacity-60"
        >
          {formState === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
