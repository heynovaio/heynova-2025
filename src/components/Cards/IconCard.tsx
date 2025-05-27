import React, { ReactNode } from "react";
import { ResponsiveImage } from "../ResponsiveImage";
import { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface IconCardProps {
  title: string | RichTextField | KeyTextField;
  image?: ImageField;
  content: ReactNode;
  button?: ReactNode;
}

export const IconCard: React.FC<IconCardProps> = ({
  title,
  content,
  image = undefined,
  button,
  ...props
}) => {
  return (
    <div
      className="w-full h-full font-body  bg-white text-black text-center p-8 flex flex-col justify-center items-center rounded-[1.25rem] overflow-hidden"
      {...props}
    >
      {image && (
        <div className="w-[125px] h-[125px] mb-6 ">
          <ResponsiveImage
            image={image}
            className="w-full h-full object-contain "
            imageHeightClassName=""
          />
        </div>
      )}

      <div className="pb-4 font-body">
        {typeof title === "string" ? (
          <h3 className="text-h3">{title}</h3>
        ) : (
          <PrismicRichText field={title} />
        )}
      </div>

      <div className="section-content ">{content}</div>

      {button && <div className="">{button}</div>}
    </div>
  );
};
