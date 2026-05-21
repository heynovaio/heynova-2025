import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";

export interface UrlFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const UrlField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  error,
}: UrlFieldProps) => {
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
          type="url"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          autoComplete="url"
          inputMode="url"
          className={inputClass}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
};