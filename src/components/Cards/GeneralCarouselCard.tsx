import { ImageField, LinkField, RichTextField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import React, { ReactNode } from "react";

interface GeneralCarouselCardProps {
  image?: ImageField;
  title: string | RichTextField;
  tags?: string[];
  description?: RichTextField;
  buttons?: LinkField[] | undefined;
  titleClassName?: string;
  titleComponents?: {
    [key: string]: React.FC<{ children: ReactNode }>;
  };
  titleLevel?: 2 | 3;
}

export const GeneralCarouselCard = ({
  image,
  title,
  titleClassName,
  titleLevel,
  tags = [],
  description,
  titleComponents,
  buttons,
}: GeneralCarouselCardProps) => {
  const TitleHeading = ({ children }: { children: ReactNode }) => {
    return titleLevel === 2 ? (
      <h2 className={titleClassName}>{children}</h2>
    ) : (
      <h3 className={titleClassName}>{children}</h3>
    );
  };

  return (
    <div className="rounded-[20px] p-[0.5px] gradient-border flex flex-col">
      <div className="bg-midnight glow-blur overflow-hidden rounded-[20px] flex flex-col h-full gap-5">
        {image && (
          <PrismicNextImage
            field={image}
            fallbackAlt=""
            className="object-cover"
          />
        )}
        <div className="p-5 flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4">
            {title && typeof title === "string" ? (
              <TitleHeading>{title}</TitleHeading>
            ) : Array.isArray(title) ? (
              <PrismicRichText field={title} components={titleComponents} />
            ) : null}
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
                  className={`btn ${index === 1 ? "btn-secondary" : "btn-primary"} flex-shrink-0`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
