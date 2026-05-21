import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";

export interface LongTextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  rows?: number;
  error?: string;
}

export const LongTextField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  rows,
  error,
}: LongTextFieldProps) => {
  return (
    <FieldWrapper
      fieldName={name}
      label={label}
      helperText={helperText}
      required={required ?? false}
      error={error}
    >
      {({ helperId, errorId }) => (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          rows={rows ?? 4}
          className={`${inputClass} resize-y`}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
};

