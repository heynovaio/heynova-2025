import React from "react";
import { Container } from "../Layout";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField, RichTextField } from "@prismicio/client";

interface TagsIntroProps {
  data: {
    title: RichTextField;
    image: ImageField;
    paragraph?: RichTextField;
  };
  content?: React.ReactNode;
  tags: string[];
}

export const TagsIntro: React.FC<TagsIntroProps> = ({
  data,
  content,
  tags,
}) => {
  const imageExists = data.image?.url;

  return (
    <section
      className={`${
        imageExists ? "min-h-[600px] py-16" : "py-16  md:h-auto"
      }  flex items-center hero-content print:py-6 `}
    >
      <Container>
        <div
          className={`text-white flex flex-col sm:flex-row justify-between ${
            imageExists ? "sm:items-center" : "items-center"
          } padded-div py-0 pb-12 gap-8 mt-0 gradient-bottom-border`}
        >
          <div
            className={`${
              imageExists ? "basis-1/2" : "text-center grow mx-auto"
            } hero-container flex flex-col gap-8  order-1 max-w-[750px] sm:order-0 print-text`}
          >
            <PrismicRichText
              field={data.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="gradient-text">{children}</h1>
                ),
              }}
            />

            {content}
            {data.paragraph && <PrismicRichText field={data.paragraph} />}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-white px-3 py-1 rounded-full border border-white text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {imageExists && (
            <div className="basis-1/2 order-0 sm:order-1 print:mt-6 print:mb-0">
              <PrismicNextImage
                field={data.image}
                className="w-auto object-cover object-center rounded"
                fallbackAlt=""
                priority={true}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
