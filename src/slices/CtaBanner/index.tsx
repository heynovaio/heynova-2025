"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Container, ContentBox, Section, AnimatedSection } from "@/components";
import { PrismicNextLink } from "@prismicio/next";
import { CalendlyButton } from "@/components/Buttons/CalendlyButton";
import { getBandPosition } from "@/utils/angledBand";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

/**
 * Props for `CtaBanner`.
 */
export type CtaBannerProps = SliceComponentProps<
  Content.CtaBannerSlice,
  SliceContext
>;

/**
 * Component for "CtaBanner" Slices.
 */
const CtaBanner: FC<CtaBannerProps> = ({
  slice,
  context,
  slices,
  index: sliceIndex,
}) => {
  const isBlog = context?.isBlogPage ?? false;
  const leftAligned = slice.primary.text_alignment === false;
  const textAlignment = leftAligned
    ? "items-start text-left"
    : "items-center text-center";
  const isForm = slice.variation === "ctaBannerWithForm";
  // "Default" is the wine banner from the 2027 refresh; "Teal" keeps the
  // previous light teal banner available.
  const innerColor = slice.primary.inner_background_color ?? "Default";
  const isGradient = innerColor === "Gradient";
  const isTeal = innerColor === "Teal";
  const textColor = isTeal ? "text-midnight" : "text-white";
  const backgroundColor = isGradient
    ? "gradient-dark-bg border border-aqua"
    : isTeal
      ? "bg-teal-muted cta-link border border-wine surface-light"
      : "bg-wine cta-wine";
  const primaryButtonClass =
    isGradient || isTeal ? "btn btn-primary" : "btn btn-light";

  const showPrismicButtons =
    slice.variation === "default" || slice.variation === "ctaBannerWithForm";

  const background = slice.primary.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-13" : "";

  return (
    <Section
      band={getBandPosition(slices, sliceIndex)}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlog}
    >
      <AnimatedSection className={`${bgColor} `}>
        <Container>
          <div
            className={`rounded-[2.5rem] ${backgroundColor} ${textColor} p-6 md:p-16 ${textAlignment} flex flex-col gap-6`}
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
                  ? [
                      <div
                        key="buttons"
                        className={`flex flex-row items-center gap-4 flex-wrap ${
                          leftAligned
                            ? "justify-start md:justify-end"
                            : "w-full justify-center"
                        }`}
                      >
                        {slice.primary.buttons?.map((button, index) => (
                          <PrismicNextLink
                            field={button}
                            key={index}
                            className={
                              index === 0
                                ? primaryButtonClass
                                : "btn btn-secondary"
                            }
                          />
                        ))}
                      </div>,
                    ]
                  : [
                      <CalendlyButton
                        text={slice.primary.booking_button_text ?? "Book Now"}
                        buttonClass={
                          isGradient || isTeal ? "btn-primary" : "btn-light"
                        }
                        location="cta_banner"
                        key={slice.primary.booking_button_text}
                      />,
                    ]
              }
              textAlign={leftAligned ? "left" : "normal"}
              containerClassName={
                leftAligned
                  ? // Text on the left, button on the right (stacked on phones).
                    "items-start text-left md:flex-row md:items-center md:justify-between md:gap-12 md:[&>*:last-child]:shrink-0"
                  : `${textAlignment} items-center`
              }
            />
          </div>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default CtaBanner;
