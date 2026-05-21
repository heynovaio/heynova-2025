import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";


export interface EmailFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const EmailField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  error,
}: EmailFieldProps) => {
  return (
    <FieldWrapper
      fieldName={name}
      label={label}
      helperText={helperText}
      required={required ?? false}
      error={error}
    >
      {({ helperId, errorId }) => (
        <input
          type="email"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          autoComplete="email"
          inputMode="email"
          className={inputClass}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
};
