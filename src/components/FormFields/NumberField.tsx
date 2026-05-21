import { FieldWrapper,  inputClass, inputStyle } from "./FieldWrapper";


export interface NumberFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}

export const NumberField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  min,
  max,
  step,
  error,
}: NumberFieldProps) => {
  const constraintHint =
    min != null && max != null
      ? `Enter a value between ${min} and ${max}`
      : min != null
        ? `Minimum value: ${min}`
        : max != null
          ? `Maximum value: ${max}`
          : undefined;

  const constraintId = constraintHint ? `${name}-constraint` : undefined;

  return (
    <FieldWrapper
      fieldName={name}
      label={label}
      helperText={helperText}
      required={required ?? false}
      error={error}
    >
      {({ helperId, errorId }) => {
        const describedBy =
          [helperId, constraintId, errorId].filter(Boolean).join(" ") || undefined;
        return (
          <>
            {constraintHint && (
              <span id={constraintId} className="sr-only">
                {constraintHint}
              </span>
            )}
            <input
              type="number"
              id={name}
              name={name}
              placeholder={placeholder}
              required={required ?? false}
              aria-required={required ?? false}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              min={min}
              max={max}
              step={step}
              inputMode="numeric"
              className={inputClass}
              style={inputStyle}
            />
          </>
        );
      }}
    </FieldWrapper>
  );
};
