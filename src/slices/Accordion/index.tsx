import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Layout/Section";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Layout/Container";
import { ContentBox, VerticalAccordion } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};
/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<
  Content.AccordionSlice,
  SliceContext
>;

/**
 * Component for "Accordion" Slices.
 */
const Accordion: FC<AccordionProps> = ({ slice, context }) => {
  const background = slice.primary.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-13" : "";
  const isBlog = context?.isBlogPage ?? false;

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlog}
    >
      <AnimatedSection className={`${bgColor}`}>
        <Container>
          <ContentBox
            title={slice.primary.title}
            content={<PrismicRichText field={slice.primary.description} />}
            buttons={slice.primary.button.map((item, index) => {
              return (
                <PrismicNextLink
                  field={item}
                  key={index}
                  className={`${index === 0 ? "btn-primary" : "btn-secondary"}`}
                />
              );
            })}
            containerClassName="mb-8 items-center text-center"
            titleClassName="text-aqua"
          />
          {slice.primary.accordion.map((item, index) => (
            <VerticalAccordion
              title={item.title}
              content={item.description}
              key={index}
              boldTitle={true}
              background={bgColor || "bg-midnight"}
            />
          ))}
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default Accordion;
