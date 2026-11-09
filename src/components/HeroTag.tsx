import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";

const TAG_COLOURS: Record<string, string> = {
  Aqua: "bg-aqua",
  Periwinkle: "bg-periwinkle",
  Lavender: "bg-lavendar",
};

export const heroTagColour = (colour?: string | null) =>
  TAG_COLOURS[colour ?? "Aqua"] ?? TAG_COLOURS.Aqua;

interface HeroTagProps {
  text: string;
  icon?: ImageField;
  colour?: string | null;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "li";
}

/**
 * A filled tag with an optional space icon, used for the homepage hero tags
 * and the facts row. Filled, never outlined, so it never reads as a button.
 */
export const HeroTag = ({
  text,
  icon,
  colour,
  className = "",
  style,
  as: Tag = "div",
}: HeroTagProps) => {
  const hasIcon = icon && isFilled.image(icon);
  return (
    <Tag
      className={`${heroTagColour(colour)} text-midnight relative flex items-center w-fit max-w-full rounded-[10px] text-lg leading-[1.2] font-normal ${
        hasIcon ? "min-h-[71px] py-3 pr-4 pl-[100px]" : "py-3 px-4"
      } ${className}`}
      style={style}
    >
      {hasIcon && (
        <PrismicNextImage
          field={icon}
          alt=""
          width={68}
          height={56}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-[68px] h-auto max-h-14 object-contain"
        />
      )}
      <span>{text}</span>
    </Tag>
  );
};

interface FactRowProps {
  facts: { text?: string | null; icon?: ImageField; color?: string | null }[];
}

/** The "More than a digital agency" facts, styled like hero tags. */
export const FactRow = ({ facts }: FactRowProps) => {
  const items = facts.filter((fact) => fact.text && fact.text.trim());
  if (items.length === 0) return null;
  return (
    <ul className="fact-row list-none! p-0! my-6! flex! flex-wrap gap-3">
      {items.map((fact, index) => (
        <HeroTag
          key={index}
          as="li"
          text={fact.text as string}
          icon={fact.icon}
          colour={fact.color}
          className="mb-0!"
        />
      ))}
    </ul>
  );
};
