import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

interface PrismicImageProps {
  image?: ImageField;
  containerClassName?: string;
  className?: string;
  imageHeightClassName?: string;
  /**
   * How wide the image renders, e.g. "48px" or "(min-width: 1024px) 400px,
   * 90vw". Without it the browser is offered 1x/2x versions of the image's
   * full original width, so small icons can download 3840px files.
   */
  sizes?: string;
}

export const ResponsiveImage: React.FC<PrismicImageProps> = ({
  image,
  containerClassName,
  imageHeightClassName = "",
  ...props
}) => {
  if (!isFilled.image(image)) {
    return null;
  }
  return (
    <div className={clsx("relative", containerClassName)}>
      <PrismicNextImage
        field={image}
        fallbackAlt=""
        className={`object-cover rounded ${imageHeightClassName}`}
        {...props}
      />
    </div>
  );
};
