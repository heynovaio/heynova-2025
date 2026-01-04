"use client";

import React, { JSX } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { HorizontalAccordion } from "@/components/Accordions/HorizontalAccordion";
import { Container, ContentBox, AnimatedSection } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

export type HorizontalAccordionSliceProps =
  SliceComponentProps<Content.HorizontalAccordionSlice>;

const HorizontalAccordionSlice = ({
  slice,
}: HorizontalAccordionSliceProps): JSX.Element | null => {
  if (!slice.primary.accordion) {
    return null;
  }

  const titles = slice.primary.accordion.map((item) => item.title || "");
  const contents = slice.primary.accordion.map((item) => item.body || "");
  const images = slice.primary.accordion.map((item) => item.icon || null);
  const buttons = slice.primary.accordion.map((item) => item.buttons || null);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-10 md:py-26"
    >
      <AnimatedSection>
        <Container>
        <ContentBox
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
          buttons={slice.primary.buttons.map((button, index) => {
            return (
              <PrismicNextLink
                field={button}
                key={index}
                className="btn btn-primary"
              />
            );
          })}
          containerClassName="mb-8"
          titleClassName="text-aqua"
        />
        <HorizontalAccordion
          titles={titles}
          contents={contents}
          images={images}
          buttons={buttons}
        />
      </Container>
      </AnimatedSection>
    </section>
  );
};

export default HorizontalAccordionSlice;
