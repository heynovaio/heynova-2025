import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";


export interface ShortTextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const ShortTextField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  error,
}: ShortTextFieldProps) => {
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
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          autoComplete="on"
          className={inputClass}
          style={inputStyle}
        />
      )}
    </FieldWrapper>
  );
};

