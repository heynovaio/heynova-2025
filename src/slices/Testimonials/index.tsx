// "use client";

import { Container, Section, AnimatedSection } from "@/components";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import { getBandPosition } from "@/utils/angledBand";

type SliceContext = {
  lang: string;
  isBlogPage?: boolean;
};

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<
  Content.TestimonialsSlice,
  SliceContext
>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({
  slice,
  context,
  slices,
  index: sliceIndex,
}: TestimonialsProps): JSX.Element => {
  const allTestimonials = slice.primary.testimonials;

  const displayedTestimonial = Array.isArray(allTestimonials)
    ? allTestimonials[0]
    : undefined;
  if (!displayedTestimonial) {
    return <></>;
  }

  const hasImage = Boolean(displayedTestimonial.image?.url);

  const isBlogPage = context?.isBlogPage ?? false;

  const background = slice.primary.background_color;
  const bgColor =
    background === "Light" ? "bg-teal-muted/20 py-8 md:py-13" : "";

  const band = getBandPosition(slices, sliceIndex);
  // When the band ends on this slice, the quote card sits on the band's
  // angled bottom edge (as in the design) rather than inside it.
  const sitsOnBandEdge = !isBlogPage && (band === "end" || band === "single");

  return (
    <Section
      band={band}
      styling={sitsOnBandEdge ? "angled-section--overhang" : ""}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      isBlogPage={isBlogPage}
    >
      <AnimatedSection className={bgColor}>
        <Container containerClassName="flex flex-col gap-8">
          {isFilled.richText(slice.primary.title) && (
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-aqua">{children}</h2>
                ),
                heading3: ({ children }) => (
                  <h3 className="text-aqua">{children}</h3>
                ),
              }}
            />
          )}
          {isFilled.richText(slice.primary.body) && (
            <div className="text-bodyLarge max-w-3xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
          )}
          <figure className="m-0 w-full max-w-[1070px] rounded-[2rem] bg-lavendar text-midnight surface-light p-8 md:p-14 flex flex-col md:flex-row gap-6 md:gap-8">
            {hasImage ? (
              <div className="w-28 h-28 md:w-40 md:h-40 shrink-0">
                <PrismicNextImage
                  field={displayedTestimonial.image}
                  sizes="160px"
                  className="w-full h-full object-cover rounded-[1.25rem]"
                  alt=""
                />
              </div>
            ) : (
              <span
                aria-hidden="true"
                className="font-title font-extraBold text-purple-drk text-[6rem] leading-[0.8] select-none"
              >
                &ldquo;
              </span>
            )}
            <div className="flex flex-col gap-5">
              <blockquote className="m-0">
                <PrismicRichText
                  field={displayedTestimonial.quote}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-midnight text-[1.375rem] md:text-h4 font-bold leading-snug">
                        {children}
                      </p>
                    ),
                  }}
                />
              </blockquote>
              <figcaption className="text-midnight text-lg">
                <span className="font-bold">{displayedTestimonial.author}</span>
                {displayedTestimonial.author_title && (
                  <span>, {displayedTestimonial.author_title}</span>
                )}
              </figcaption>
            </div>
          </figure>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default Testimonials;
