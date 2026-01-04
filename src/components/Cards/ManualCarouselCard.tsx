import { ImageField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import React from "react";
import { ResponsiveImage } from "../ResponsiveImage";

interface ManualCarouselCard {
  image?: ImageField;
  title?: RichTextField | undefined;
  tags?: string[];
  description?: RichTextField;
  buttons?: LinkField[] | undefined;
}

export const ManualCarouselCard = ({
  image,
  title,
  tags = [],
  description,
  buttons,
}: ManualCarouselCard) => {
  return (
    <div className="rounded-[20px] p-[0.5px] flex flex-col glow-blur">
      <div className="bg-teal-muted/25 border-aqua/20 border overflow-hidden rounded-[20px] flex flex-col gap-5 h-full px-8 py-11">
        {image && (
          <div className="h-[12em]">
            <ResponsiveImage
              image={image}
              imageHeightClassName="object-cover"
              containerClassName="w-full h-full flex items-center justify-center"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4">
            {title && <PrismicRichText field={title} />}
            {tags?.length > 0 && (
              <div className="flex gap-2.5 flex-wrap">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block text-white px-3 py-1 rounded-full border-white border text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {description && <PrismicRichText field={description} />}
          <div className="flex-grow"></div>
          {buttons && (
            <div className="flex gap-2.5 flex-wrap">
              {buttons.map((button, index) => (
                <PrismicNextLink
                  key={index}
                  field={button}
                  className={`btn ${index === 1 ? "btn-secondary" : "btn-primary"} flex-shrink-0 bg-midnight`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
