"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Section, Container, ResponsiveImage, ContentBox, AnimatedSection } from "@/components";
import { JSX } from "react";

/**
 * Props for `ContentColumn`.
 */
export type ContentColumnProps =
  SliceComponentProps<Content.ContentColumnSlice>;
/**
 * Component for "ContentColumn" Slices.
 */
const ContentColumn = ({ slice }: ContentColumnProps): JSX.Element => {
  const isSingleColumn = slice.primary.content.length === 1;

  let card_color = "";

  // Type guard to check if card_color exists on primary
  if ("card_color" in slice.primary && slice.primary.card_color) {
    switch (slice.primary.card_color) {
      case "Blue":
        card_color = "bg-aqua";
        break;
      case "Purple":
        card_color = "bg-purple";
        break;
      case "None":
      default:
        card_color = "";
        break;
    }
  }

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="overflow-x-hidden"
    >
      <AnimatedSection>
        <Container
          containerClassName={isSingleColumn ? "flex justify-center" : ""}
        >
          <ContentBox
            title={slice.primary.title}
            titleClassName="text-aqua"
            content={
              <div className="text-bodyLarge">
                <PrismicRichText
                  field={slice.primary.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="!mx-0">{children}</p>
                    ),
                  }}
                />
              </div>
            }
            width="standard"
            containerClassName="flex text-center justify-center"
          />
          <div
            className={`${card_color} ${slice.variation === "default" ? "" : "mt-16"} flex flex-col lg:flex-row justify-center items-center rounded gap-1 ${
              isSingleColumn ? "max-w-[860px] w-full" : "w-full"
            }`}
          >
            {slice.primary.content.map((item, index) => {
              let rotation = "";
              switch (index) {
                case 0:
                  rotation = "rotate-[-6.16deg]";
                  break;
                case 1:
                  rotation = "rotate-[13.469deg]";
                  break;
                case 2:
                  rotation = "rotate-[-7.311deg]";
                  break;
                case 3:
                  rotation = "rotate-[6.358deg]";
                  break;
                default:
                  rotation = "rotate-0";
                  break;
              }

              return slice.variation === "default" ? (
                <div
                  key={index}
                  className={`flex flex-col-reverse md:flex-row items-center justify-center md:gap-6 p-2 md:p-10 w-full `}
                >
                  {item.icon && (
                    <ResponsiveImage
                      image={item.icon}
                      containerClassName="h-[100px] w-auto aspect-square mt-4 md:mt-0 flex items-center justify-center"
                    />
                  )}
                  <div className="mt-4 md:mt-0 text-center flex flex-col gap-2">
                    <PrismicRichText
                      field={item.title}
                      components={{
                        heading2: ({ children }) => (
                          <h2 className="!text-[1.375rem] text-light-blue font-extraBold">
                            {children}
                          </h2>
                        ),
                        heading3: ({ children }) => (
                          <h3 className="!text-[1.375rem] text-light-blue font-extraBold">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    {item.body && <PrismicRichText field={item.body} />}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`${rotation} border-aqua/50 bg-teal-drk/75 hover:bg-teal-drk/80 border-[0.5px] flex flex-col glow-blur overflow-hidden items-center max-w-[400px] max-h-[400px] justify-center md:gap-6 p-5 md:w-full md:h-full aspect-square rounded-[20px] transition-all duration-300 ease-in-out`}
                >
                  {item.icon && (
                    <ResponsiveImage
                      image={item.icon}
                      containerClassName="h-[100px] w-auto aspect-square flex items-center justify-center"
                    />
                  )}
                  <div className="mt-4 md:mt-0 text-center flex flex-col gap-2">
                    <PrismicRichText
                      field={item.title}
                      components={{
                        heading2: ({ children }) => (
                          <h2 className="!text-[1.375rem] text-light-blue font-extraBold">
                            {children}
                          </h2>
                        ),
                        heading3: ({ children }) => (
                          <h3 className="!text-[1.375rem] text-light-blue font-extraBold">
                            {children}
                          </h3>
                        ),
                      }}
                    />
                    {item.body && <PrismicRichText field={item.body} />}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default ContentColumn;
