"use client";
import {
  ManualCarousel,
  CategoryCarousel,
  GeneralCarousel,
  PhotoCarousel,
  AnimatedSection,
  Section,
} from "@/components";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type ContentCarouselProps =
  SliceComponentProps<Content.ContentCarouselSlice>;

const ContentCarousel = ({ slice }: ContentCarouselProps) => {
  const background = slice.primary.background_color;
  const bgColor = background === "Light" ? "bg-teal-muted/20 py-4 md:py-8" : "";

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

  return (
    <Section>
      <AnimatedSection className={bgColor}>{carousel}</AnimatedSection>
    </Section>
  );
};

export default ContentCarousel;
