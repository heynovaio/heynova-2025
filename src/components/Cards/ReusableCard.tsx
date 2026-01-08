import { LinkField, RichTextField, ImageField } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { ResponsiveImage } from "../ResponsiveImage";
import clsx from "clsx";

interface ReusableCardProps {
  title?: RichTextField;
  body?: RichTextField;
  button?: LinkField;
  image?: ImageField;
  imageStyle?: boolean;
}

export const ReusableCard: React.FC<ReusableCardProps> = ({
  title,
  body,
  button,
  image,
  imageStyle = false,
}) => {
  const hasImage = image && "url" in image && image.url;
  const hasButton = button && "url" in button && button.url;

  return (
    <div
      className={clsx(
        "rounded-[1.25rem] border border-2 border-secondary overflow-hidden p-6 flex flex-col h-full transition-all",
        !hasImage && "justify-center items-center text-center"
      )}
    >
      {hasImage && (
        <div className="mb-4">
          <div className="relative w-full aspect-[16/9]">
            <ResponsiveImage
              image={image}
              containerClassName="w-full h-full"
              className={clsx(
                "w-full h-full",
                imageStyle ? "object-cover" : "object-contain object-left"
              )}
            />
          </div>
        </div>
      )}

      <div
        className={clsx(
          "flex-1 flex flex-col",
          !hasImage && "items-center justify-center"
        )}
      >
        {title && <PrismicRichText field={title} />}
        {body && <PrismicRichText field={body} />}
      </div>

      {hasButton && (
        <PrismicLink
          field={button}
          className={clsx(
            "btn btn-primary mt-4 inline-block",
            hasImage ? "self-start" : "self-center"
          )}
        >
          {button.text}
        </PrismicLink>
      )}
    </div>
  );
};
