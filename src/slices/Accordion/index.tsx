import { FC } from "react";
import { Content, asHTML, asText } from "@prismicio/client";
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

  const faqSchema = slice.primary.is_faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: slice.primary.accordion
          .map((item) => {
            const question = asText(item.title).trim();
            const answer = asHTML(item.description).trim();
            if (!question || !answer) return null;
            return {
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answer,
              },
            };
          })
          .filter(Boolean),
      }
    : null;

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlog}
    >
      {faqSchema && faqSchema.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <AnimatedSection className={`${bgColor} `}>
        <Container containerClassName="flex items-center flex-col">
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
            containerClassName="mb-8 flex text-center items-center"
            titleClassName="text-aqua"
          />
          {slice.primary.accordion.map((item, index) => (
            <VerticalAccordion
              title={item.title}
              content={item.description}
              key={index}
              boldTitle={true}
            />
          ))}
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default Accordion;
