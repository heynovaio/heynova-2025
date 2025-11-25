"use client";
import {
  ManualCarousel,
  CategoryCarousel,
  GeneralCarousel,
  PhotoCarousel,
} from "@/components";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import "react-multi-carousel/lib/styles.css";

export type ContentCarouselProps =
  SliceComponentProps<Content.ContentCarouselSlice>;

const ContentCarousel = ({ slice }: ContentCarouselProps) => {
  let carouselType;
  switch (slice.variation) {
    case "manualCarousel":
      carouselType = <ManualCarousel slice={slice} />;
      break;
    case "generalCarousel":
      carouselType = <GeneralCarousel slice={slice} />;
    case "photoCarousel":
      carouselType = <PhotoCarousel slice={slice} />;
    default:
      carouselType = <CategoryCarousel slice={slice} />;
      break;
  }

  return carouselType;
};

export default ContentCarousel;
