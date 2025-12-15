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
  switch (slice.variation) {
    case "manualCarousel":
      return <ManualCarousel slice={slice} />;

    case "generalCarousel":
      return <GeneralCarousel slice={slice} />;

    case "pictureCarousel":
      return <PhotoCarousel slice={slice} />;

    default:
      return <CategoryCarousel slice={slice} />;
  }
};

export default ContentCarousel;
