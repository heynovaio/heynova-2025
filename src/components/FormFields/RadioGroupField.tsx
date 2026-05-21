

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  columns?: "1" | "2";
  options: RadioOption[];
  error?: string;
}

export const RadioGroupField = ({
  name,
  label,
  required,
  helperText,
  columns,
  options,
  error,
}: RadioGroupFieldProps) => {
  const errorId = error ? `${name}-error` : undefined;
  const helperId = helperText ? `${name}-helper` : undefined;
  const gridClass = columns === "2" ? "grid-cols-2" : "grid-cols-1";

  return (
    <fieldset
      className="flex flex-col gap-1 w-full border-0 p-0 m-0"
      aria-required={required ?? false}
      aria-invalid={!!error}
      aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
    >
      <legend
        style={{
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-primary, currentColor)",
          marginBottom: "0.25rem",
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
      </legend>

      <div className={`grid ${gridClass} gap-2`}>
        {options.map((opt, index) => {
          const optionId = `${name}-option-${index}`;
          return (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                id={optionId}
                name={name}
                value={opt.value}
                required={required ?? false}
                className="w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2"
                style={{ accentColor: "var(--color-primary, currentColor)" }}
              />
              <label
                htmlFor={optionId}
                className="cursor-pointer transition-colors"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary, currentColor)",
                }}
              >
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>

      {helperText && !error && (
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
    </fieldset>
  );
};

