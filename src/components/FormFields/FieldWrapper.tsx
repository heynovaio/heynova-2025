import { ReactNode } from "react";
import React from "react";
import { isFilled, KeyTextField } from "@prismicio/client";

interface FieldWrapperProps {
  fieldName: string;
  label?: KeyTextField;
  helperText?: KeyTextField;
  required?: boolean;
  error?: string;
  children: (ids: { helperId?: string; errorId?: string }) => ReactNode;
}

export const FieldWrapper = ({
  fieldName,
  label,
  helperText,
  required,
  error,
  children,
}: FieldWrapperProps) => {
  const helperId = isFilled.keyText(helperText) ? `${fieldName}-helper` : undefined;
  const errorId = error ? `${fieldName}-error` : undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {isFilled.keyText(label) && (
        <label
          htmlFor={fieldName}
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text-primary, currentColor)",
          }}
        >
          {label}
          {required && (
            <span
              className="ml-1"
              style={{ color: "var(--color-red, #d70449)" }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {children({ helperId, errorId })}

      {isFilled.keyText(helperText) && !error && (
        <p
          id={helperId}
          className="opacity-70"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-primary, currentColor)",
          }}
        >
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="font-medium"
          style={{ fontSize: "var(--text-sm)", color: "var(--color-red, #d70449)" }}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const buildDescribedBy = (
  helperId?: string,
  errorId?: string
): string | undefined => {
  const ids = [helperId, errorId].filter(Boolean).join(" ");
  return ids || undefined;
};

export const inputClass =
  "w-full rounded-lg px-4 py-3 border transition-colors focus:outline-none focus:ring-2";

export const inputStyle: React.CSSProperties = {
  color: "var(--color-text-primary, currentColor)",
  backgroundColor: "transparent",
  borderColor: "var(--color-primary, currentColor)",
};

export const inputFocusStyle: React.CSSProperties = {
  outlineColor: "var(--color-primary, currentColor)",
};
