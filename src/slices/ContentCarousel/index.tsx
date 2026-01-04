"use client";
import {
  ManualCarousel,
  CategoryCarousel,
  GeneralCarousel,
  PhotoCarousel,
  AnimatedSection,
} from "@/components";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ContentCarouselProps =
  SliceComponentProps<Content.ContentCarouselSlice>;

const ContentCarousel = ({ slice }: ContentCarouselProps) => {
  const carousel = (() => {
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
  })();

  return <AnimatedSection>{carousel}</AnimatedSection>;
};

export default ContentCarousel;
