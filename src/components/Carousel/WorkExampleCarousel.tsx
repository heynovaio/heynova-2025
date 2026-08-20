"use client";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Container } from "../Layout";
import { getCategoryResponsiveItems } from "./responsive";
import { ContentBox, ManualCarouselCard } from "..";
import { CarouselButton } from "../Buttons/CarouselButtons";
import getAllWorkExamples from "@/utils/getAllWorkExamples";
import { WorkExampleDocument } from "../../../prismicio-types";

export type WorkExamplesCarouselProps = {
  slice: SliceComponentProps<Content.ContentCarouselSlice>["slice"];
};

export const WorkExamplesCarousel = ({ slice }: WorkExamplesCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    loop: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const itemsPerPage = getCategoryResponsiveItems();

  const workExampleData = getAllWorkExamples("en-ca").data;

  if (slice.variation !== "workExamples") return null;

  const cardIds = slice.primary.cards
    .filter((item) => item !== null && isFilled.contentRelationship(item.item))
    .map((item) => (item.item as { id: string }).id);

  const filteredData: WorkExampleDocument[] = (workExampleData ?? []).filter(
    (item) => cardIds.includes(item.id),
  );

  const totalSlides = Math.max(0, filteredData.length - itemsPerPage + 1);

  const handleArrowClick = (direction: "next" | "prev") => {
    if (!emblaApi) return;
    if (direction === "next" && currentSlide < totalSlides - 1)
      emblaApi.scrollNext();
    else if (direction === "prev" && currentSlide > 0) emblaApi.scrollPrev();
  };

  return (
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
          {filteredData.length > itemsPerPage && (
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
            {filteredData.map((item, index) => {
              return (
                <div key={index} className="embla__slide pr-3 md:pr-7 flex">
                  {item.data.image?.url ? (
                    <ManualCarouselCard
                      image={item.data.image}
                      title={item.data.title}
                      buttons={item.data.link ? [item.data.link] : undefined}
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

      {/* <Container>
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
              className="btn btn-primary justify-self-start"
            />
          </div>
        )}
      </Container> */}
    </div>
  );
};
