"use client";

import { Content } from "@prismicio/client";
import { Container, Section, AnimatedSection } from "@/components";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import { componentsTextSmall } from "@/utils";

/**
 * Props for `SimpleText`.
 */
export type SimpleTextProps = SliceComponentProps<Content.SimpleTextSlice>;

/**
 * Component for "SimpleText" Slices.
 */
const SimpleText = ({ slice }: SimpleTextProps): JSX.Element => {
  const leftAligned = slice.primary.text_alignment === false;
  const textAlignment = leftAligned
    ? "items-start text-left"
    : "items-center text-center";

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedSection>
        <Container>
          <div className={`text-content max-w-[900px] mx-auto ${textAlignment}`}>
            <PrismicRichText
              field={slice.primary.text}
              components={componentsTextSmall}
            />
          </div>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default SimpleText;
