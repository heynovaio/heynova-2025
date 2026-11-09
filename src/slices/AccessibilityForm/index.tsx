import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AccessibilityForm as AccessibilityFormComponent } from "../../components/AccessibilityForm";
import { Section } from "@/components/Layout/Section";
import { Container } from "@/components";
import { getBandPosition } from "@/utils/angledBand";

export type AccessibilityFormProps =
  SliceComponentProps<Content.AccessibilityFormSlice>;

const cardStyles: Record<string, string> = {
  White: "bg-white text-black surface-light rounded-[20px] p-8 md:p-12",
  Outline: "border border-white rounded-[20px] p-8 md:p-12",
};

const AccessibilityForm: FC<AccessibilityFormProps> = ({
  slice,
  slices,
  index: sliceIndex,
}) => {
  const cardStyle = slice.primary.card_style ?? "None";
  const cardClass = cardStyles[cardStyle] ?? "";
  const isWhite = cardStyle === "White";

  return (
    <Section
      band={getBandPosition(slices, sliceIndex)}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        {slice.primary.enabled && (
          <div className="mx-auto w-full max-w-3xl">
            {cardClass ? (
              <div className={cardClass}>
                <AccessibilityFormComponent invertText={isWhite} />
              </div>
            ) : (
              <AccessibilityFormComponent />
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default AccessibilityForm;
