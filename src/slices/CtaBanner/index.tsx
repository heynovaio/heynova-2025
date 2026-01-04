"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section, AnimatedSection } from "@/components";
import { PrismicNextLink } from "@prismicio/next";
import { CalendlyButton } from "@/components/Buttons/CalendlyButton";

/**
 * Props for `CtaBanner`.
 */
export type CtaBannerProps = SliceComponentProps<Content.CtaBannerSlice>;

/**
 * Component for "CtaBanner" Slices.
 */
const CtaBanner: FC<CtaBannerProps> = ({ slice }) => {
  const leftAligned = slice.primary.text_alignment === false;
  const textAlignment = leftAligned
    ? "items-start text-left"
    : "items-center text-center";
  const isForm = slice.variation === "ctaBannerWithForm";
  const isGradient = slice.primary.inner_background_color === "Gradient";
  const textColor = isGradient ? "text-white" : "text-midnight";
  const backgroundColor = isGradient
    ? "gradient-dark-bg"
    : "bg-teal-muted pink-link";
  const borderColor = isGradient ? "border-aqua" : "border-wine";

  const showPrismicButtons =
    slice.variation === "default" || slice.variation === "ctaBannerWithForm";

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedSection>
        <Container>
        <div
          className={`rounded-[1.5rem] ${backgroundColor} ${textColor} p-6 md:p-24 ${textAlignment} flex flex-col gap-6 border ${borderColor}`}
        >
          <ContentBox
            title={slice.primary.title}
            smallerTextWidth={true}
            content={
              <div>
                <PrismicRichText field={slice.primary.body} />
                {isForm && slice.primary.form?.html && (
                  <div
                    className="mt-6 w-full"
                    dangerouslySetInnerHTML={{
                      __html: slice.primary.form.html,
                    }}
                  />
                )}
              </div>
            }
            buttons={
              showPrismicButtons
                ? slice.primary.buttons?.map((button, index) => (
                    <PrismicNextLink
                      field={button}
                      key={index}
                      className={
                        isGradient ? "btn btn-primary" : "btn btn-secondary"
                      }
                    />
                  ))
                : [
                    <CalendlyButton
                      text={slice.primary.booking_button_text ?? "Book Now"}
                      buttonClass={
                        slice.primary.button_class == true
                          ? "btn-secondary"
                          : "btn-primary"
                      }
                      key={slice.primary.booking_button_text}
                    />,
                  ]
            }
            containerClassName={textAlignment}
          />
        </div>
      </Container>
      </AnimatedSection>
    </Section>
  );
};

export default CtaBanner;
