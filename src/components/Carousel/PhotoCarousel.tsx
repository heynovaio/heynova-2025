"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Container, Section } from "../Layout";
import { getResponsiveItems } from "./responsive";
import { CarouselButton } from "../Buttons/CarouselButtons";
import { PrismicNextImage } from "@prismicio/next";
import { ContentBox } from "../ContentBox";

export type PhotoCarouselProps = {
  slice: SliceComponentProps<Content.ContentCarouselSlice>["slice"];
};

export const PhotoCarousel = ({ slice }: PhotoCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    loop: false,
  });

  const itemsPerPage = getResponsiveItems();

  const totalSlides = Math.max(
    0,
    slice.primary.cards.length - itemsPerPage + 1
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

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling="overflow-x-hidden flex flex-col gap-8"
    >
      <Container containerClassName="flex justify-end">
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
      </Container>

      <Container>
        <div
          className="embla image-carousel m-0 focus:focus focus:outline-offset-8 !overflow-visible"
          ref={emblaRef}
        >
          <div className="embla__container">
            {slice.primary.cards.map((item, index) => {
              const hasImage =
                typeof item === "object" &&
                item !== null &&
                "image" in item &&
                item.image;

              return (
                <div key={index} className="embla__slide pr-3 md:pr-7 flex">
                  {hasImage ? (
                    <PrismicNextImage
                      field={item.image}
                      fallbackAlt=""
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center py-8 h-full flex items-center justify-center">
                      No image available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
