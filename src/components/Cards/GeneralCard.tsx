import {
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import React, { ReactNode } from "react";
import { Button } from "@headlessui/react";
import Link from "next/link";

interface GeneralCardProps {
  image?: ImageField;
  title: string | RichTextField;
  tags?: string[];
  description?: RichTextField | KeyTextField;
  buttons?: LinkField[] | undefined;
  titleClassName?: string;
  titleComponents?: {
    [key: string]: React.FC<{ children: ReactNode }>;
  };
  titleLevel?: 2 | 3;
  href?: string;
}

export const GeneralCard = ({
  image,
  title,
  titleClassName,
  titleLevel,
  tags = [],
  description,
  titleComponents,
  buttons,
  href,
}: GeneralCardProps) => {
  const TitleHeading = ({ children }: { children: ReactNode }) => {
    return titleLevel === 2 ? (
      <h2 className={titleClassName}>{children}</h2>
    ) : (
      <h3 className={titleClassName}>{children}</h3>
    );
  };

  // When the card itself is a link, avoid rendering inner <a> elements from PrismicRichText
  const richTextComponents = href
    ? {
        hyperlink: ({ children }: { children: ReactNode }) => <span>{children}</span>,
      }
    : undefined;

  const titleRichTextComponents = titleComponents || richTextComponents;

  const cardInner = (
    <div className="rounded-[20px] p-[0.5px] gradient-border flex flex-col h-full">
      <div className="bg-midnight glow-blur overflow-hidden rounded-[20px] flex flex-col h-full">
        {image && (
          <PrismicNextImage
            field={image}
            fallbackAlt=""
            className="object-cover general-card-image"
          />
        )}
        <div className="p-5 flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4">
            {title && typeof title === "string" ? (
              <TitleHeading>{title}</TitleHeading>
            ) : Array.isArray(title) ? (
              <PrismicRichText field={title} components={titleRichTextComponents} />
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
          {description && typeof description === "string" ? (
            <p>{description}</p>
          ) : Array.isArray(description) ? (
            <PrismicRichText field={description} components={richTextComponents} />
          ) : null}
          <div className="flex-grow"></div>
          {buttons && (
            <div className="flex gap-2.5 flex-wrap">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  className={`btn ${index === 1 ? "btn-secondary" : "btn-primary"} flex-shrink-0`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {cardInner}
    </Link>
  ) : (
    cardInner
  );
};
