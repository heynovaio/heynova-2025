import { Container, Section } from "@/components";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  const allTestimonials = slice.primary.testimonials;

  if (!Array.isArray(allTestimonials) || allTestimonials.length === 0) {
    return <></>;
  }

  const displayedTestimonial =
    allTestimonials[Math.floor(Math.random() * allTestimonials.length)];

  const hasImage = Boolean(displayedTestimonial.image?.url);

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container containerClassName="flex flex-col gap-12 items-center">
        <div className="rounded-[1.25rem] overflow-hidden bg-midnight w-full">
          <div
            className="relative rounded-[1.25rem] py-4 px-6 md:py-16 md:px-28 overflow-hidden"
            style={{
              background:
                "linear-gradient(66deg, rgba(53, 252, 255, 0.36) 4.86%, rgba(81, 58, 145, 0.36) 84.35%)",
            }}
          >
            <img
              src="/testimonial-bg.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              aria-hidden="true"
            />

            <div
              className={`relative z-10 flex flex-col gap-4 md:gap-12 ${
                hasImage
                  ? "md:flex-row md:items-center"
                  : "items-center text-center"
              }`}
            >
              {hasImage && (
                <div className="w-full md:w-1/3 aspect-square flex-shrink-0 max-h-60 md:max-h-none">
                  <PrismicNextImage
                    field={displayedTestimonial.image}
                    className="w-full h-full object-cover rounded-[1.25rem]"
                    alt=""
                  />
                </div>
              )}

              <div
                className={`flex flex-col gap-4 ${
                  hasImage ? "" : "items-center max-w-2xl"
                }`}
              >
                <PrismicRichText
                  field={slice.primary.title}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-aqua">{children}</h2>
                    ),
                  }}
                />

                <PrismicRichText
                  field={displayedTestimonial.quote}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-md font-normal">{children}</p>
                    ),
                  }}
                />

                <div
                  className={`flex flex-col ${hasImage ? "" : "items-center"}`}
                >
                  <p className="text-[1.875rem] font-extraBold">
                    {displayedTestimonial.author}
                  </p>
                  <p className="text-[1.375rem]">
                    {displayedTestimonial.author_title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
