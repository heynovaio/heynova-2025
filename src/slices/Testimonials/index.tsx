import { Container } from "@/components";
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
  const displayedTestimonial =
    allTestimonials[Math.floor(Math.random() * allTestimonials.length)];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" p-10"
    >
      <Container containerClassName="flex flex-col gap-12 items-center bg-midnight">
        <div
          className="rounded py-4 px-6 md:py-16 md:px-28  bg-no-repeat "
          style={{
            backgroundImage: "url('/testimonial-bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`flex flex-col md:flex-row gap-4 md:gap-12 md:items-center`}
          >
            <div className="w-full md:w-1/3 aspect-square flex-shrink-0 max-h-60 md:max-h-none">
              <PrismicNextImage
                field={displayedTestimonial.image}
                className="w-full h-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4">
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
              <div className="flex flex-col">
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
      </Container>
    </section>
  );
};

export default Testimonials;
