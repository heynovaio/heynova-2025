import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AccessibilityForm as AccessibilityFormComponent} from "../../components/AccessibilityForm";

export type AccessibilityFormProps = SliceComponentProps<Content.AccessibilityFormSlice>;

const AccessibilityForm: FC<AccessibilityFormProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.enabled && <AccessibilityFormComponent />}
    </section>
  );
};

export default AccessibilityForm;