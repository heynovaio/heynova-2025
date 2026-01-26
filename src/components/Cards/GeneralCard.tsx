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
  variant?: "default" | "category";
  category?: string;
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
  variant = "default",
  category,
}: GeneralCardProps) => {
  const TitleHeading = ({ children }: { children: ReactNode }) => {
    return titleLevel === 2 ? (
      <h2 className={titleClassName}>{children}</h2>
    ) : (
      <h3 className={titleClassName}>{children}</h3>
    );
  };

  const richTextComponents = href
    ? {
        hyperlink: ({ children }: { children: ReactNode }) => (
          <span>{children}</span>
        ),
      }
    : undefined;

  const titleRichTextComponents = titleComponents || richTextComponents;

  const bgColor = variant === "category" ? "bg-aqua" : "bg-teal-muted/20";
  const textColor = variant === "category" ? "text-midnight" : "text-white";
  const tagBgColor = variant === "category" ? "bg-aqua/10" : "bg-white/10";
  const tagBorderColor =
    variant === "category" ? "border-aqua" : "border-white";
  const tagTextColor = variant === "category" ? "text-aqua" : "text-white";

  const cardInner = (
    <div className="rounded-[20px] p-[0.5px] flex flex-col h-full glow-blur general-card">
      <div
        className={`${bgColor} border-aqua/20 border overflow-hidden rounded-[20px] flex flex-col h-full`}
      >
        {image && (
          <PrismicNextImage
            field={image}
            fallbackAlt=""
            className="object-cover general-card-image"
          />
        )}
        <div className="p-5 flex flex-col gap-4 h-full z-10">
          <div className={`flex flex-col gap-4 ${textColor}`}>
            {title && typeof title === "string" ? (
              <TitleHeading>{title}</TitleHeading>
            ) : Array.isArray(title) ? (
              <PrismicRichText
                field={title}
                components={titleRichTextComponents}
              />
            ) : null}
            <div className="flex gap-2.5 flex-wrap">
              {category && (
                <span
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${tagBgColor} ${tagBorderColor} ${tagTextColor}`}
                >
                  {category}
                </span>
              )}
              {tags?.length > 0 &&
                tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${tagBgColor} ${tagBorderColor} ${tagTextColor}`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          {description && typeof description === "string" ? (
            <p>{description}</p>
          ) : Array.isArray(description) ? (
            <PrismicRichText
              field={description}
              components={richTextComponents}
            />
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
