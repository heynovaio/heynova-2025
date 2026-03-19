"use client";
import {
  asText,
  Content,
  ContentRelationshipField,
  ImageField,
  isFilled,
} from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Container, Section } from "../Layout";
import { getCategoryResponsiveItems } from "./responsive";
import { ContentBox, ManualCarouselCard } from "..";
import { useInsightCategoryData } from "@/hooks/use-all-insights-category-data";
import { CarouselButton } from "../Buttons/CarouselButtons";
import { PrismicNextLink } from "@prismicio/next";

export type ManualCarouselProps = {
  slice: SliceComponentProps<Content.ContentCarouselSlice>["slice"];
};

export const ManualCarousel = ({ slice }: ManualCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    loop: false,
  });
  const { insightCategoryData } = useInsightCategoryData("en-ca");

  const itemsPerPage = getCategoryResponsiveItems();

  const totalSlides = Math.max(
    0,
    slice.primary.cards.length - itemsPerPage + 1,
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleArrowClick = (direction: "next" | "prev") => {
    if (!emblaApi) return;
    if (direction === "next" && currentSlide < totalSlides - 1) {
      emblaApi.scrollNext();
    } else if (direction === "prev" && currentSlide > 0) {
      emblaApi.scrollPrev();
    }
  };

  if (slice.variation !== "manualCarousel") return null;

  return (
    <>
      <div
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="overflow-x-hidden flex flex-col gap-8"
      >
        <Container containerClassName="flex flex-col">
          <div className="flex justify-between items-start">
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
              width="standard"
              containerClassName="gap-4"
            />
            {slice.primary.cards.length > itemsPerPage && (
              <CarouselButton
                currentSlide={currentSlide + 1}
                totalSlides={totalSlides}
                onSlideChange={handleArrowClick}
                styling="w-fit"
              />
            )}
          </div>
        </Container>
        <Container>
          <div
            className="embla tabbed-carousel m-0 focus:focus focus:outline-offset-8 !overflow-visible"
            ref={emblaRef}
          >
            <div className="embla__container">
              {slice.primary?.cards.map((item, index) => {
                const hasImage = (
                  item: unknown,
                ): item is { image: ImageField } =>
                  typeof item === "object" &&
                  item !== null &&
                  "image" in item &&
                  Boolean((item as { image?: unknown }).image);

                const tags = [];

                const getCategoryTitle = (tagId: string | null) => {
                  if (!tagId) return null;

                  const matchedCategory = insightCategoryData?.find(
                    (category) => category.id === tagId,
                  );
                  return matchedCategory?.data?.title
                    ? asText(matchedCategory.data.title)
                    : null;
                };

                if ("tag_1" in item) {
                  const tag1 = (
                    item as {
                      tag_1?: ContentRelationshipField<"insights_categories">;
                    }
                  ).tag_1;
                  const tag1_id = isFilled.contentRelationship(tag1)
                    ? tag1.id
                    : null;
                  const tag1Title = getCategoryTitle(tag1_id);

                  if (tag1Title) {
                    tags.push(tag1Title);
                  }
                }

                if ("tag_2" in item) {
                  const tag2 = (
                    item as {
                      tag_2?: ContentRelationshipField<"insights_categories">;
                    }
                  ).tag_2;
                  const tag2_id = isFilled.contentRelationship(tag2)
                    ? tag2.id
                    : null;
                  const tag2Title = getCategoryTitle(tag2_id);

                  if (tag2Title) {
                    tags.push(tag2Title);
                  }
                }

                if ("tag_3" in item) {
                  const tag3 = (
                    item as {
                      tag_3?: ContentRelationshipField<"insights_categories">;
                    }
                  ).tag_3;
                  const tag3_id = isFilled.contentRelationship(tag3)
                    ? tag3.id
                    : null;
                  const tag3Title = getCategoryTitle(tag3_id);

                  if (tag3Title) {
                    tags.push(tag3Title);
                  }
                }

                return (
                  <div key={index} className="embla__slide pr-3 md:pr-7 flex">
                    {hasImage(item) ? (
                      <ManualCarouselCard
                        image={item.image}
                        title={item?.title || "Untitled"}
                        tags={tags}
                        buttons={item?.buttons}
                      />
                    ) : (
                      <div className="text-center py-8 h-full flex items-center justify-center">
                        No content available
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
        <Container>
          {((Array.isArray(slice.primary.button) &&
            slice.primary.button[0]?.text) ||
            (!Array.isArray(slice.primary.button) &&
              slice.primary.button?.text)) && (
            <div className="w-fit">
              <PrismicNextLink
                field={
                  Array.isArray(slice.primary.button)
                    ? (slice.primary.button[0] ?? undefined)
                    : slice.primary.button
                }
                className={`btn btn-primary justify-self-start `}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
