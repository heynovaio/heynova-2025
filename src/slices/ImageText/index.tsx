"use client";

// import { Button } from "@/components";
import { Section, Container, ResponsiveImage, ContentBox, AnimatedSection } from "@/components";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
// import { components } from "@/utils";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `ImageText`.
 */
export type ImageTextProps = SliceComponentProps<Content.ImageTextSlice>;

/**
 * Component for "ImageText" Slices.
 */
const ImageText = ({ slice }: ImageTextProps): JSX.Element => {
  const imageSide =
    slice.primary.imageRight === false ? "md:flex-row" : "md:flex-row-reverse";

  // const isVideo = slice.variation === "video";
  const isStats = slice.variation === "stats";
  const isVideo = slice.variation === "video";
  
  // Get imageFit value with fallback to "contain"
  const imageFit = (slice.primary as Record<string, unknown>).imageFit === "cover" ? "cover" : "contain";

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedSection>
        <Container
          containerClassName={`flex flex-col ${imageSide} gap-4 md:gap-16 w-full items-center`}
        >
        <div className="w-full md:w-1/2">
          {isVideo ? (
            <div className="w-full h-[250px] md:h-[400px] overflow-hidden rounded-xl">
              <div
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 relative"
                dangerouslySetInnerHTML={{
                  __html: slice.primary.video?.html ?? "",
                }}
              />
            </div>
          ) : (
            <ResponsiveImage
              image={slice.primary.image}
              className={`w-full h-[250px] md:h-[400px] object-${imageFit} mb-4 md:mb-0`}
            />
          )}
        </div>

        <div className="w-full md:w-1/2">
          <ContentBox
            title={slice.primary.title}
            content={
              isStats ? (
                <div>
                  {slice.primary.subtitle && (
                    <PrismicRichText
                      field={slice.primary.subtitle}
                      components={{
                        heading4: ({ children }) => (
                          <h4 className="mb-4 gradient-light">{children}</h4>
                        ),
                      }}
                    />
                  )}
                  <div className="flex flex-col gap-4 md:mb-4">
                    <PrismicRichText
                      field={slice.primary.body}
                      // components={components} **TODO: setup components in utils
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-center md:text-left">
                      {slice.primary.stats.map((item, index) => (
                        <div key={index}>
                          <PrismicRichText
                            field={item.statistic}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-[2.5rem] text-aqua font-extraBold">
                                  {children}
                                  {item.percentage && " %"}
                                </p>
                              ),
                            }}
                          />
                          <PrismicRichText
                            field={item.description}
                            components={{
                              paragraph: ({ children }) => (
                                <p className="text-base">{children}</p>
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {slice.primary.subtitle && (
                    <PrismicRichText
                      field={slice.primary.subtitle}
                      components={{
                        heading4: ({ children }) => (
                          <h4 className="mb-4 gradient-light">{children}</h4>
                        ),
                      }}
                    />
                  )}
                  <PrismicRichText
                    field={slice.primary.body}
                    // components={components} **TODO: setup components in utils
                  />
                </div>
              )
            }
            buttons={slice.primary.button.map((link, index) => (
              // <Button
              //   key={index}
              //   buttonType="primary"
              //   buttonLink={link}
              //   label={link.text}
              // />
              <PrismicNextLink
                field={link}
                key={index}
                className="btn btn-primary"
              />
            ))}
          />
        </div>
      </Container>
      </AnimatedSection>
    </Section>
  );
};

export default ImageText;
