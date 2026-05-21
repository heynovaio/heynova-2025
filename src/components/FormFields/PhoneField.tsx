import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";


export interface PhoneFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const PhoneField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  error,
}: PhoneFieldProps) => {
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
          type="tel"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
};

