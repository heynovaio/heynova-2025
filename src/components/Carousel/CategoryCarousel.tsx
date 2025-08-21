"use client";
import {
  asText,
  Content,
  ContentRelationshipField,
  FilledContentRelationshipField,
  ImageField,
  isFilled,
} from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React, { useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import { Container, Section } from "../Layout";
import { category_responsive } from "./responsive";
import { ContentBox, GeneralCard } from "..";
import { CarouselButton } from "../Buttons/CarouselButtons";
import { useItemsPerPage } from "@/hooks/use-items-per-page";
import { PrismicNextLink } from "@prismicio/next";
import GetAllInsights from "@/utils/getAllInsights";
import {
  ContentCarouselSliceDefaultPrimaryCardsItem,
  InsightDocument,
  Simplify,
} from "../../../prismicio-types";

export type CategoryCarouselProps = {
  slice: SliceComponentProps<Content.ContentCarouselSlice>["slice"];
};

export const CategoryCarousel = ({ slice }: CategoryCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<Carousel>(null);
  const insightPageData = GetAllInsights("en-ca").data;
  const itemsPerPage = useItemsPerPage(category_responsive);

  const totalSlides = Math.max(
    0,
    slice.primary.cards.length - itemsPerPage + 1
  );

  const handleArrowClick = (direction: "next" | "prev") => {
    if (direction === "next" && currentSlide < totalSlides - 1) {
      carouselRef.current?.next(1);
    } else if (direction === "prev" && currentSlide > 0) {
      carouselRef.current?.previous(1);
    }
  };

  const contentCardIds = slice.primary.cards
    .filter(
      (item): item is { item: ContentRelationshipField<"insight"> } =>
        item !== null &&
        isFilled.contentRelationship(
          (item as Simplify<ContentCarouselSliceDefaultPrimaryCardsItem>).item
        )
    )
    .map((item) => (item.item as FilledContentRelationshipField<"insight">).id);

  const filteredData: InsightDocument[] = (insightPageData ?? []).filter(
    (item) => contentCardIds.includes(item.id)
  );

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="overflow-x-hidden flex flex-col gap-8"
    >
      <Container containerClassName="flex flex-col">
        <Container containerClassName="flex justify-between items-start">
          <ContentBox
            title={slice.primary.title}
            titleClassName="text-aqua"
            content={
              <div className="text-bodyLarge">
                <PrismicRichText
                  field={slice.primary.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="!mx-0">{children}</p>
                    ),
                  }}
                />
              </div>
            }
            width="full"
            containerClassName="gap-4 text-start"
          />
          {filteredData.length > itemsPerPage && (
            <CarouselButton
              currentSlide={currentSlide + 1}
              totalSlides={totalSlides}
              onSlideChange={handleArrowClick}
              styling="w-fit"
            />
          )}
        </Container>
      </Container>
      <Container>
        <Container>
          <Carousel
            responsive={category_responsive}
            partialVisible
            keyBoardControl
            arrows={false}
            ref={carouselRef}
            beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}
            containerClass="tabbed-carousel m-0 focus:focus focus:outline-offset-8 !overflow-visible"
          >
            {filteredData?.map((item, index) => {
              const slice = item.data;
              const hasImage = (item: unknown): item is { image: ImageField } =>
                typeof item === "object" &&
                item !== null &&
                "image" in item &&
                Boolean((item as { image?: unknown }).image);

              return (
                <div key={index} className="pr-3 md:pr-7 flex">
                  {hasImage(slice) ? (
                    <PrismicNextLink document={item}>
                      <GeneralCard
                        image={slice.image}
                        title={asText(slice.title)}
                        description={slice.body}
                        tags={item.tags}
                      />
                    </PrismicNextLink>
                  ) : (
                    <div className="text-center py-8 h-full flex items-center justify-center">
                      No content available
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
        </Container>
        <Container containerClassName="px-10">
          {((Array.isArray(slice.primary.button) &&
            slice.primary.button[0]?.text) ||
            (!Array.isArray(slice.primary.button) &&
              slice.primary.button?.text)) && (
            <PrismicNextLink
              field={
                Array.isArray(slice.primary.button)
                  ? (slice.primary.button[0] ?? undefined)
                  : slice.primary.button
              }
              className={`btn btn-primary justify-self-start`}
            />
          )}
        </Container>
      </Container>
    </Section>
  );
};
