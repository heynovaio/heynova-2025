

export interface SingleCheckboxFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const SingleCheckboxField = ({
  name,
  label,
  required,
  helperText,
  error,
}: SingleCheckboxFieldProps) => {
  const errorId = error ? `${name}-error` : undefined;
  const helperId = helperText ? `${name}-helper` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={name}
          name={name}
          value="true"
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className="mt-0.5 w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2"
          style={{ accentColor: "var(--color-primary, currentColor)" }}
        />
        <label
          htmlFor={name}
          className="cursor-pointer transition-colors"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-primary, currentColor)",
          }}
        >
          {label ?? ""}
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
      </div>

      {helperText && !error && (
        <p
          id={helperId}
          className="opacity-70 pl-8"
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
          className="font-medium pl-8"
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
