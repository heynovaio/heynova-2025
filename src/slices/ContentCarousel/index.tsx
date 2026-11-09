"use client";
import {
  ManualCarousel,
  CategoryCarousel,
  GeneralCarousel,
  PhotoCarousel,
  AnimatedSection,
  Section,
  WorkExamplesCarousel,
  FeaturedWorkGrid,
} from "@/components";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getBandPosition } from "@/utils/angledBand";

export type ContentCarouselProps =
  SliceComponentProps<Content.ContentCarouselSlice>;

const ContentCarousel = ({
  slice,
  slices,
  index: sliceIndex,
}: ContentCarouselProps) => {
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
      case "workExamples":
        return <WorkExamplesCarousel slice={slice} />;
      case "featuredWorkGrid":
        return <FeaturedWorkGrid slice={slice} />;

      default:
        return <CategoryCarousel slice={slice} />;
    }
  })();

  return (
    <Section band={getBandPosition(slices, sliceIndex)}>
      <AnimatedSection className={bgColor}>{carousel}</AnimatedSection>
    </Section>
  );
};

export default ContentCarousel;
