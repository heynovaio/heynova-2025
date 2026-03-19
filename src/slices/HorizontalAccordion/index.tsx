"use client";

import React, { JSX } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { HorizontalAccordion } from "@/components/Accordions/HorizontalAccordion";
import { Container, ContentBox, AnimatedSection, Section } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

export type HorizontalAccordionSliceProps = SliceComponentProps<
  Content.HorizontalAccordionSlice,
  SliceContext
>;

const HorizontalAccordionSlice = ({
  slice,
  context,
}: HorizontalAccordionSliceProps): JSX.Element | null => {
  if (!slice.primary.accordion) {
    return null;
  }

  const isBlog = context?.isBlogPage ?? false;

  const titles = slice.primary.accordion.map((item) => item.title || "");
  const contents = slice.primary.accordion.map((item) => item.body || "");
  const images = slice.primary.accordion.map((item) => item.icon || null);
  const buttons = slice.primary.accordion.map((item) => item.buttons || null);

  const background = slice.primary.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-13 " : "";

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlog}
    >
      <AnimatedSection className={`${bgColor} `}>
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
    </Section>
  );
};

export default HorizontalAccordionSlice;
