

export interface HiddenFieldProps {
  name: string;
  value?: string;
}

export const HiddenField = ({ name, value }: HiddenFieldProps) => (
  <input type="hidden" name={name} value={value ?? ""} />
);


