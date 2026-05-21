import { FieldWrapper, buildDescribedBy, inputClass, inputStyle } from "./FieldWrapper";


export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  options: SelectOption[];
  error?: string;
}

export const SelectField = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  options,
  error,
}: SelectFieldProps) => {
  return (
    <FieldWrapper
      fieldName={name}
      label={label}
      helperText={helperText}
      required={required ?? false}
      error={error}
    >
      {({ helperId, errorId }) => (
        <select
          id={name}
          name={name}
          required={required ?? false}
          aria-required={required ?? false}
          aria-invalid={!!error}
          aria-describedby={buildDescribedBy(helperId, errorId)}
          defaultValue=""
          className={`${inputClass} appearance-none cursor-pointer`}
          style={inputStyle}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
};

