import React, { ReactNode } from "react";
import { ResponsiveImage } from "../ResponsiveImage";
import {
  ImageField,
  isFilled,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
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
    <div className="p-[1px] rounded-[1.25rem] gradient-border ">
      <div className="w-full h-full rounded-[1.25rem] bg-midnight  overflow-hidden">
        <div
          className="w-full h-full font-body card-bg-gradient glow-blur text-black text-center px-6 py-12 md:px-8 md:py-16 flex flex-col justify-center items-center"
          {...props}
        >
          {isFilled.image(image) && (
            <div className="w-[125px] h-[125px] mb-6">
              <ResponsiveImage
                image={image}
                className="w-full h-full object-contain"
                imageHeightClassName=""
              />
            </div>
          )}

          <div className="pb-4 font-body">
            {typeof title === "string" ? (
              <h3 className="text-h3 text-lavendar">{title}</h3>
            ) : (
              <PrismicRichText field={title} />
            )}
          </div>

          <div className="text-white font-normal">{content}</div>

          {button && <div className="btn btn-primary">{button}</div>}
        </div>
      </div>
    </div>
  );
};
